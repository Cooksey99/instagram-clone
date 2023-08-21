const express = require('express');
const asyncHandler = require('express-async-handler');
const { Follow, User } = require('../../db/models');

const router = express.Router();

router.get('/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;

    const followers = await Follow.findAll({
        where: {
            following_user_id: id
        }
    });
    const following = await Follow.findAll({
        where: {
            followed_user_id: id
        }
    });

    let followerUsers = [{}];
    let followedUsers = [{}];
    for (let i = 0; i < followers.length; i++) {
        followerUsers[i] = await User.findByPk(followers[i].followed_user_id);
    }
    for (let i = 0; i < following.length; i++) {
        followedUsers[i] = await User.findByPk(following[i].following_user_id);
    }

    let followingObj = { followers, users: followerUsers };
    let followersObj = { following, users: followedUsers };

    const follows = { followingObj, followersObj };

    res.json(follows);
}));

// unfollower user
router.delete('/unfollow/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;

    const follow = await Follow.findOne({
        where: {
            followed_user_id: id
        }
    });
    
    await follow.destroy();
    res.json();
}));
// remove a follower
router.delete('/remove_follower/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;

    const follow = await Follow.findOne({
        where: {
            following_user_id: id
        }
    });
    await follow.destroy();

    res.json();
}))

// follow user
router.post('/follow_user', asyncHandler(async (req, res) => {
    const { following_user_id, followed_user_id } = req.body;

    const follower = await Follow.create({ ...req.body });
    const user = await User.findByPk(following_user_id);


    const follow = { follower, user };

    res.json(follow);
}))


module.exports = router;
