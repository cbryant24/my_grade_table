const models = require('../models');
const express = require('express');
const bodyParser = require('body-parser')

const router = express.Router();
let User_History = models.history;

router.use(bodyParser.json());

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