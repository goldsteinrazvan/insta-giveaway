function loadMoreComments(nightmare){
    return nightmare
            .exists('._m3m1c, ._1s3cd')
            .then( (result) =>{
                if(result){
                    nightmare.click('._m3m1c')
                    return loadMoreComments(nightmare)
                } else {
                    console.log('All comments loaded')
                    return false
                }
            })
}

module.exports.load = loadMoreComments