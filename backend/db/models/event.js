'use strict';
const {
  Model, Validator
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Event.belongsTo(models.Group, { foreignKey: 'groupId', onDelete: 'cascade', hooks: true });
      Event.belongsTo(models.Venue, {
        foreignKey: 'venueId'
      });
      Event.hasMany(models.Attendant, { foreignKey: 'eventId' });
      Event.hasMany(models.EventImage, { foreignKey: 'eventId', onDelete: 'cascade', hooks: true });
    }
  }
  Event.init({
    groupId: {
      type: DataTypes.INTEGER
    },
    venueId: {
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING
    },
    capacity: {
      type: DataTypes.INTEGER
    },
    price: {
      type: DataTypes.FLOAT
    },
    startDate: {
      type: DataTypes.DATE
    },
    endDate: {
      type: DataTypes.DATE
    },
    previewImage: {
      type: DataTypes.STRING
    },
    deletedAt: {
      type: DataTypes.JSON
    },
  }, {
    sequelize,
    modelName: 'Event',
    paranoid: true,
    timestamps: true,
    defaultScope: {
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'deletedAt']
      }
    },
  });
  return Event;
};
