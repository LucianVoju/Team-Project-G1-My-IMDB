/*global $*/
$(document).ready(function(){
    
    let root = "https://ancient-caverns-16784.herokuapp.com";
    let username = document.getElementsByName("uname")[0].value;
    let password = document.getElementsByName("psw")[0].value;
 
    $("form#loginForm").submit(function(e){
        e.preventDefault();
    
     if (username == "" || password == "") {      
         $("input").addClass("error");
     } else {
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
                document.cookie = "loginToken=" + response.accesToken + ";";
                window.location.href= "index.html";
            },
            error: function(){
                alert("User not found/wrong password! Please register if you didn't!");
            }
            
         });
        }
    
    });  

  /*  $("button#log-out").on('click',function(){
    
      $.ajax({
          url : root + "/auth/logout",
          method: "GET",
          username: username,
          password: password,
          headers: {
              "Authorization": "Basic Auth",
              "Content-Type": "application/x-www-form-urlencoded",
              "x-auth-token": "document.cookie.value"
          },
          success: function(response){
              alert(response.message);
              
              window.location.href="home_page.html";
          },
          error: function(){
              alert("You have to be logged-in in order to log out");
          }
      });
   });*/
});