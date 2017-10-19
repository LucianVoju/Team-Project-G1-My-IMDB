/*global $*/
$(document).ready(function(){
 function getCookies() {
                    let cookiesString = document.cookie;
                    console.log('cookies', cookiesString);
                    const cookiesArray = cookiesString.split("; ");
                    let cookies = {};
                    cookiesArray.forEach(function(c) {
                    let cookie = c.split("=");
       // console.log('key', cookie[0]);
       // console.log('value', cookie[1]);
                    cookies[cookie[0]] = cookie[1];
                });
                return cookies["accessToken"];
    };
    
  let root = "https://ancient-caverns-16784.herokuapp.com";
   
  $("button#logout").on('click',function(){

      $.ajax({
          url : root + "/auth/logout",
          method: "GET",
        //   username: username,
        //   password: password,
          headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "x-auth-token": getCookies(),
          },
          success: function(response){
              alert(response.message);
              
              window.location.href="home_page.html";
          },
          error: function(error){
              console.log(error);
              //alert("You have to be logged-in in order to log out");
          }
      });

  });
})