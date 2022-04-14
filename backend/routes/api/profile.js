const express = require("express");
const asyncHandler = require("express-async-handler");
const { Post, User } = require("../../db/models")

const router = express.Router();

router.post('/newPost', asyncHandler(async (req, res) => {
    const post = await Post.create({ ...req.body });

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

// Find user
router.get('/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(id);

    res.json(user);
  }));

module.exports = router;
