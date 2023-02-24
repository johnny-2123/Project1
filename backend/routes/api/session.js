const express = require('express');

const { setTokenCookie, restoreUser } = require('../../utils/auth.js');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateLogin = [
    check('credential')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Please provide a valid email or username.'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a password.'),
    handleValidationErrors
];

const router = express.Router();

router.post(
    '/',
    validateLogin,
    async (req, res, next) => {
        const { credential, password } = req.body;
        console.log(`login router credential: `, credential);
        console.log(`login router password: `, password);

        const user = await User.login({ credential, password })

        console.log(`login router line 31`);

        if (!user) {
            const err = new Error('Login failed');
            err.status = 401;
            err.title = 'Login failed';
            err.errors = ['The provided credentials were invalid.'];
            return res.status(401).json({
                "message": "Invalid credentials",
                "statusCode": 401
            });
        }

        await setTokenCookie(res, user);

        return res.json(user);
    }
);

router.get(
    '/',
    restoreUser,
    (req, res) => {
        const { user } = req;

        if (user) {
            return res.json({
                user: user.toSafeObject()
            });
        } else return res.json({});
    }
)
router.delete(
    '/',
    (req, res) => {
        res.clearCookie('token');
        return res.json({ message: 'success' });
    }
);


module.exports = router;
