const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth.js');
const { Event, Venue, Attendant, sequelize, Group, EventImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require("sequelize");

const router = express.Router();

router.get(
    '/:id',
    async (req, res) => {
        const where = {};
        const id = req.params.id;
        const event = await Event.findByPk(id, {
            include: [
                {
                    model: Attendant, attributes: []
                },
                {
                    model: Venue, attributes: ['id', 'address', 'city', 'state', 'lat', 'lng']
                },
                {
                    model: Group, attributes: ['id', 'private', 'name', 'city', 'state']
                }
            ],
            attributes: [
                [sequelize.fn('COUNT', sequelize.col('Attendants.id')), 'numAttending'],
                'id', 'groupId', 'venueId', 'name', 'type', 'description', 'capacity', 'price', 'startDate', 'endDate'
            ]
        });
        if (event.id === null) {

            res.status(404).json(
                'event with that id not found'
            )
        }
        const group = await event.getGroup();
        const venue = await event.getVenue();
        const eventImages = await event.getEventImages({
            attributes: ['id', 'url', 'preview']
        });
        const attendants = await event.getAttendants({
            attributes: [
                [sequelize.fn('COUNT', sequelize.col('id')), 'numAttending'],

            ]
        })
        console.log(attendants)
        res.status(200).json({
            'event': event,
            'eventImages': eventImages,
            'numAttending': attendants.numAttending,
        });


    }
)

router.get(
    '/',
    async (req, res) => {
        const where = {}
        let { page, size, name, type, startDate } = req.query;
        page = parseInt(page);
        size = parseInt(size);

        if (!page) page = 1;

        if (Number.isNaN(page)) {
            res.status(400);
            return res.json({
                errors: [
                    { message: 'page number must be a valid integer' }
                ]
            });
        }


        if (page < 0) {
            page = 1;
        }


        if (!size) size = 4;
        if (Number.isNaN(size)) {
            res.status(400);
            return res.json({
                errors: [
                    { message: 'size number must be a valid integer' }
                ]
            });
        }
        if (size < 0) {
            size = 10;
        }
        if (type && typeof (type) !== 'string') {
            res.status(400);
            return res.json({
                errors: [
                    { message: 'type must be a string' }
                ]
            });
        }
        if (name && typeof (name) !== 'string') {
            res.status(400);
            return res.json({
                errors: [
                    { message: 'name must be a string' }
                ]
            });
        }
        if (startDate) {
            startDate = JSON.parse(startDate);
        }
        console.log(typeof (startDate));
        if (startDate && typeof (startDate) !== 'string') {
            res.status(400);
            return res.json({
                errors: [
                    { message: 'startDate must be a string' }
                ]
            });
        }
        if (name) {
            where.name = name;
        }

        if (type) {
            where.type = type;
        }
        if (startDate) {
            where.startDate = startDate;
            console.log(`startDate: ${startDate}`)
        }

        const events = await Event.findAll({
            subQuery: false,
            include: [{ model: Venue, attributes: ['id', 'city', 'state'] }, { model: Attendant, attributes: [] }, { model: Group, attributes: ['id', 'name', 'city', 'state'] }],
            attributes: [
                [sequelize.fn('COUNT', sequelize.col('Attendants.id')), 'numAttending'],
                'id', 'groupId', 'venueId', 'name', 'type', 'startDate', 'previewImage'
            ],
            group: ['Attendants.id'],
            where,
            // not returning all events when no page or size are set as queries
            limit: size,
            offset: size * (page - 1),

        });

        res.status(200).json({
            'Events': events,
            'page': page,
            'size': size
        });

    }
);


module.exports = router;
