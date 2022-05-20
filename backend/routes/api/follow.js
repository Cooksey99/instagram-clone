const express = require('express');
const asyncHandler = require('express-async-handler');
const { Follow } = require('../../db/models');

const router = express.Router();

router.get('/:id', asyncHandler(async (req, res) => {
    const { id } =  req.params;
    console.log('\n\n', id, '\n\n')
    const followers = await Follow.findAll({
        where: {
            following_user_id: id
        }
    });
    const following = await Follow.findAll({
        where: {
            followed_user_id: id
        }
    })

    const follows = { followers, following };

    res.json(follows);
}));

module.exports = router;
