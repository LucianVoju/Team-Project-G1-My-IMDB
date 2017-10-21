/*global $*/
$(document).ready(function(){
 function getCookies() {
                    let cookiesString = document.cookie;
                    console.log('cookies', cookiesString);
                    const cookiesArray = cookiesString.split("; ");
                    let cookies = {};
                    cookiesArray.forEach(function(c) {
                    let cookie = c.split("=");
                    cookies[cookie[0]] = cookie[1];
                                         });
           return cookies["accessToken"];      
          };
    
  let root = "https://ancient-caverns-16784.herokuapp.com";
   
  $("button#logout").on('click',function(){

      $.ajax({
          url : root + "/auth/logout",
          method: "GET",
          headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "x-auth-token": getCookies(),
          },
          success: function(response){
              alert(response.message);
              document.cookie="accessToken=";          
              window.location.href="home_page.html";    
          },
          error: function(error){
              console.log(error);
              alert("You have to be logged-in in order to log out");
          }
      });

  });
})