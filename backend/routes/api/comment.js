const express = require('express');
const asyncHandler = require('express-async-handler');
const { Comment } = require('../../db/models');

const router = express.Router();

router.post('/newComment', asyncHandler(async (req, res) => {
    const comment = await Comment.create({ ...req.body });

    res.json(comment);
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
router.get('/:postId/all', asyncHandler(async (req, res) => {
    const { postId } = req.params;

    const comments = await Comment.findAll({
        where: {
            post_id: postId
        },
        order: [
            ['createdAt', 'DESC']
        ]
    });

    const data = comments.map(comment => comment);
    res.json(data);
}))



module.exports = router;
