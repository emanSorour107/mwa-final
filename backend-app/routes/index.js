const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.json("Welcome to contactless online market");
});

const ctrlUser = require('../controllers/user.controller');
router.post('/register', ctrlUser.register);


module.exports = router;