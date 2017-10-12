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
                 username: "alig25",
                 password: "1985"
             },
             contentType: "application/x-www-form-urlencoded",
            success: function(response){
                console.log(response);
               /* if (response == "success") {
                    alert("Authentication succeded: " + response);
                } else {
                    if (response == "401"){
                        alert("User not found/wrong password!");
                    }
                  }*/
            }
         });
        }
    });  

});