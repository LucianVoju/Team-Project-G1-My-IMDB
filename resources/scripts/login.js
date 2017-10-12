/*global $*/
$(document).ready(function(){
    $("form#loginForm").submit(function(e){
        e.preventDefault();

    let root = "https://ancient-caverns-16784.herokuapp.com/auth/login";
    let username = document.getElementsByName("uname")[0].value;
    let password = document.getElementsByName("psw")[0].value;
     if (username == "" || password == "") {
         $("input").addClass("error");
     } else {
         $.ajax({
             url: root,
             method: "POST",
             data: {
                 username: username,
                 password: password
             },
             contentType: "application/x-www-form-urlencoded",
            success: function(response){
                console.log(response);
                document.cookie = "loginToken=" + response.accessToken + ";";
                window.location.href= "index.html";
            },
            error: function(){
                alert("User not found/wrong password");
            }
         });
        }
    
    });  

});