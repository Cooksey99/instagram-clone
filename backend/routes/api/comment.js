const express = require('express');
const asyncHandler = require('express-async-handler');
const { Comment } = require('../../db/models');

const router = express.Router();

router.post('/newComment', asyncHandler(async (req, res) => {
    const comment = await Comment.create({ ...req.body });

    res.json(comment);
}));



module.exports = router;
