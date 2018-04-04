const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send({ title: 'Keep calm and be Expressed', greet: 'this wonderful world' });
});

module.exports = router;
