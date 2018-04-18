var express = require('express');
var router = express.Router();

router.get('/main', (req, res) =>{
    res.render('main', {host: process.env.HOST})
})

module.exports = router