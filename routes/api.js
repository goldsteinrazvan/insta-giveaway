var express = require('express');
var router = express.Router();

var Nightmare = require('nightmare');

router.get( '/', (req, res)=>{
    res.send('API v1 endpoint')
})

router.get('/get_comments', (req, res)=>{
    var nightmare = Nightmare({show: false})
    nightmare
    .goto(req.query.instagram_link)
    .evaluate( ()=>{
        return JSON.stringify(window._sharedData.entry_data.PostPage[0].graphql.shortcode_media.edge_media_to_comment.edges)
    })
    .end()
    .then( (comments) =>{
        var data = JSON.parse(comments)
        var accounts = []
        data.forEach( (elem)=>{
            accounts.push(elem.node.owner.username)
        })
        var randomAccount = Math.floor(Math.random() * accounts.length )
        res.send(accounts[randomAccount])
    })
    .catch( (error) =>{
        console.error('Failed to get link: ', error)
    })

})

module.exports = router;
