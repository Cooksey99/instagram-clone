const express = require("express");
const asyncHandler = require("express-async-handler");
const { Post, User } = require("../../db/models")

const router = express.Router();


router.get('/', asyncHandler(async (req, res) => {
    const posts = await Post.findAll();
    let result = {}

    const data = await Promise.all(posts.map(async post => {
        const user = await User.findOne({
            where: {
                id: post.user_id
            }
        });
        // users.user =  user;
        let temp = { user: user, post: post };

        return temp;

        // post.user = temp;
        // return post;

    }));


    console.log('\n\n\n' + data + '\n\n\n')

    res.json(data);
}));


module.exports = router;
