const express = require("express");
const asyncHandler = require("express-async-handler");

const router = express.Router();

router.post('/newPost', asyncHandler(async (req, res) => {

}))


module.exports = router;
