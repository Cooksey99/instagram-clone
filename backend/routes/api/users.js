const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");

const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");

const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('first_name')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a valid name.'),
  check('last_name')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a valid name.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors,
];

// Sign up
router.post(
  '',
  validateSignup,
  asyncHandler(async (req, res) => {
    const { email, first_name, last_name, password, username } = req.body;
    const user = await User.signup({ email, first_name, last_name, username, password });

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  }),
);


module.exports = router;
