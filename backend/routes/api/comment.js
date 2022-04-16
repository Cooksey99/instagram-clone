const express = require('express');
const asyncHandler = require('express-async-handler');
const { Comment } = require('../../db/models');

const router = express.Router();

router.post('/newComment', asyncHandler(async (req, res) => {
    const comment = await Comment.create({ ...req.body });

    res.json(comment);
}));
router.put('/editComment', asyncHandler(async (req, res) => {
    const { id, post_id, user_id, comment } = req.body;

    const result = await Comment.findByPk(id);

    result.set({ post_id, user_id, comment });
    await result.save();

    res.json(result);
}));
router.delete('/delete', asyncHandler(async (req, res) => {
    const { commentId } = req.body;

    const comment = await Comment.findByPk(commentId);
    await comment.destroy();

    res.json();
}));



module.exports = router;
