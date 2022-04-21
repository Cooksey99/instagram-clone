const express = require('express');
const asyncHandler = require('express-async-handler');
const { Comment, User } = require('../../db/models');

const router = express.Router();

router.post('/newComment', asyncHandler(async (req, res) => {
    const { user_id } = req.body;

    const comment = await Comment.create({ ...req.body });
    const user = await User.findByPk(user_id);

    res.json({ user, comment });
}));
router.put('/editComment/:commentId', asyncHandler(async (req, res) => {
    const { commentId } = req.params;

    const result = await Comment.findByPk(commentId);

    result.set(req.body);
    await result.save();

    // console.log('\n\n\n' + result.comment + '\n\n\n');

    res.json(result);
}));
router.delete('/delete/:commentId', asyncHandler(async (req, res) => {
    const { commentId } = req.params;

    console.log('\n\n\n' + commentId + '\n\n\n');

    const comment = await Comment.findByPk(commentId);
    await comment.destroy();

    res.json();
}));



module.exports = router;
