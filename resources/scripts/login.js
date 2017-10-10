/*global $*/
$(document).ready(function(){
    $("form#loginForm").submit(function(){
    const root = "https://ancient-caverns-16784.herokuapp.com";
    let user = document.getElementsByName("uname").value;
    let password = document.getElementsByName("psw").value;
     if (user && password) {
         $.ajax({
             url: root + "/auth/login",
             type: "POST",
             data: {
                 username: "alig25",
                 password: "1985"
             },
             headers: {
                 "Content-type":"application/x-www-urlencoded",
             },
            success: function(data){
                console.log(data);
            }
         });
     }
    
});   
});