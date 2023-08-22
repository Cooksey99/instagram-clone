const express = require("express");
const asyncHandler = require("express-async-handler");
const { Post, User, Comment } = require("../../db/models")

const router = express.Router();


router.get('/', asyncHandler(async (req, res) => {
    const posts = await Post.findAll({
        order: [['createdAt', 'DESC']]
    });

    const data = await Promise.all(posts.map(async post => {
        const user = await User.findByPk(post.user_id);

        const comments = await Comment.findAll({
            where: {
                post_id: post.id
            }
        })

        // users.user =  user;
        let temp = { user: user, post: post, comments: comments };

        return temp;

        // post.user = temp;
        // return post;

    }));



    return res.json(data);
}));



module.exports = router;
