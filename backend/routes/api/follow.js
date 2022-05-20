const express = require('express');
const asyncHandler = require('express-async-handler');
const { Follow } = require('../../db/models');

const router = express.Router();

router.get('/:id', asyncHandler(async (req, res) => {
    id =  req.params;
    console.log('\n\n', id, '\n\n')
    const follows = await post.findAll({
        where: {
            following_user_id: id
        }
    });

    res.json(follows);
}));

module.exports = router;
