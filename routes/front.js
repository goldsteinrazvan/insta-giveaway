var express = require('express');
var router = express.Router();

router.get('/main', (req, res) =>{
    res.render('main')
})

module.exports = router