const express = require("express");
const asyncHandler = require("express-async-handler");
const { Post } = require("../../db/models")

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


module.exports = router;
