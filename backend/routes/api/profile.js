const express = require("express");
const asyncHandler = require("express-async-handler");
const { Post, User, Comment } = require("../../db/models")
const { Op } = require("sequelize");

const router = express.Router();

router.post('/newPost', asyncHandler(async (req, res) => {
    const post = await Post.create({ ...req.body });

    res.json(post);

}));

router.put('/editPost/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;

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
        },
        order: [
            ['createdAt', 'DESC']
        ]
    });

    const data = posts.map(post => post);
    res.json(data)
}));

// Get post data
router.get('/post/:postId', asyncHandler(async (req, res) => {
    const { postId } = req.params;

    const post = await Post.findByPk(postId);

    const commentList = await Comment.findAll({
        where: {
            post_id: postId
        },
        order: [
            ['createdAt', 'ASC']
        ]
    })

    const user = await User.findByPk(post.user_id);

    const comments = await Promise.all(commentList.map(async comment => {
        let user = await User.findByPk(comment.user_id);

        let result = { user, comment }

        return result;
    }));

    // let comments = { commentsObj };
    let final = { post, user, comments}
    // console.log('\n\n\n' + comments + '\n\n\n')

    // const comments = await Promise.all(commentList.map(comment => {
    // }));

    // const result = { post: post, comments: comments}

    res.json(final);
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
// Search user by username
router.get('/search/:string', asyncHandler(async (req, res) => {
    const { string } = req.params;
    const userList = await User.findAll({
        where: {
            username: {
                [Op.iLike]: `%${string}%`
            }
        }
    });

    let users = userList.map(user => user);
    console.log('\n\n' + users + '\n\n')
    res.json(users);
}))

module.exports = router;
