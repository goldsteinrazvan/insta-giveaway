$(document).ready(function(){
    $("#submit-link").on("click", function(e){
        e.preventDefault()
        var link = $("#instagram-link").val()
        var url = 'http://localhost:3000/api/v1/participants?instagram_link=' + link
        
        $.ajax({
            type:"GET",
            url: url,
            success: function(result){
                console.log(result)
            },
            error: function(jqXHR){
                console.log(jqXHR)
            }
        })
    })
})