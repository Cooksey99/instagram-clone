const express = require("express");
const asyncHandler = require("express-async-handler");
const { Post, User } = require("../../db/models")

const router = express.Router();

router.post('/newPost', asyncHandler(async (req, res) => {
    const post = await Post.create({ ...req.body });

    res.json(post);

}));

router.put('/editPost', asyncHandler(async (req, res) => {
    const { id } = req.body;

    const post = await Post.findByPk(id);

    post.set(req.body);
    await post.save();
    res.json(post);
}));

router.get('/:userId/posts', asyncHandler(async (req, res) => {
    const { userId } = req.params;

    const posts = await Post.findAll({
        where: {
            user_id: userId
        }
    });

    const data = posts.map(post => post);
    res.json(data)
}));



// Delete post
router.delete('/deletePost/:postId', asyncHandler(async (req, res) => {
    const { postId } = req.params;

    const post = await Post.findByPk(postId);
    await post.destroy();

    res.json()
}))

// Find user
router.get('/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(id);

    res.json(user);
  }));

module.exports = router;
