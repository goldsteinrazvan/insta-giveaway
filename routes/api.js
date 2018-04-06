var express = require('express');
var router = express.Router();

var Nightmare = require('nightmare');

var LoadComments = require('../utils/LoadComments')

var front = require('./front')
router.use(front)

router.get( '/', (req, res)=>{
    res.send('API v1 endpoint')
})

router.get('/participants', (req, res) =>{
    var username
    var nightmare = Nightmare({show: true, executionTimeout: 180000})
    nightmare
        .goto(req.query.instagram_link)
        .exists('._m3m1c, ._1s3cd')
        .then( (result) =>{
            if(result){
                console.log('Load more comments exists')
                return LoadComments.load(nightmare)
            } else {
                return
            }
        })
        .then( ()=>{
           return nightmare
                .evaluate( ()=>{
                   return document.querySelector('._iadoq').innerText
                })
        })
        .then( (result)=>{
            //get owner account of post
            username = result
            return nightmare
                    .evaluate( () =>{
                        return Array.from(document.querySelectorAll('._ezgzd ._2g7d5')).map(element => element.innerText)
                    })
        })
        .then( (accounts) =>{
            //filter out account that is the owner of the post
            var participants = accounts.filter(account => account != username)

            //remove duplicate accounts
            var response = participants.filter((participant, next, self)=>{
                return self.indexOf(participant) == next
            })

            var randomAccount = Math.floor(Math.random() * accounts.length )
            res.send(response[randomAccount])

            return nightmare.end()
        })
        .catch( (error) =>{
            console.error('Failed to get link: ', error)
        })

})

module.exports = router;
