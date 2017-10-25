/*global $*/
$(document).ready(function(){
    let root = "https://ancient-caverns-16784.herokuapp.com";
 
    $("form#loginForm").submit(function(e){
        e.preventDefault();
        
    let username = document.getElementsByName("uname")[0].value;
    let password = document.getElementsByName("psw")[0].value;
    
     if (username == "") {      
         $("#user").addClass("error");
     } else {
         if(password == ""){
             $("#pass").addClass("error");
         }
         else {
         $.ajax({
             url: root + "/auth/login",
             method: "POST",
             data: {
                 username: username,
                 password: password
             },
             contentType: "application/x-www-form-urlencoded",
            success: function(response){
                console.log(response);
                document.cookie = "accessToken=" + response.accessToken + ";";
                window.location.href= "index.html";
            },
            error: function(){
                alert("User not found/wrong password! Please register if you didn't!");
            }
            
         });
        }
     }
    });  
    
   
});