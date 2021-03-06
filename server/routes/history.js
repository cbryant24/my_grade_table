/**@module user_history_route */

const models = require('../models');
const express = require('express');
const bodyParser = require('body-parser')

const router = express.Router();
let User_History = models.history;

router.use(bodyParser.json());

/**
 * returns {Array}  of data objects from the history table of users history for activity feed
 */
debugger
router.post('/', (req, res) => {
    User_History
    .findAll({
        where: { fb_id: req.body.fb_id},
        limit: 10,
        order: [['id', 'DESC']]
    }).then( result => {
        res.status(200).send(result)
    })
})

module.exports = router;