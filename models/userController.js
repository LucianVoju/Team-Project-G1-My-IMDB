/*global fetch*/
/*global Headers*/

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

const userController = (function(){
    let headers = new Headers();
    
    return {
        loginUser: async function(url) {
            try{
                let response =  await fetch('${url}/auth/login',{method:"POST",Payload:{username:"test", password:"test"}  });
                let loginResponse = await response.json();
                
                return loginResponse;
            }
            catch(error) {
                console.log(error)
            }
        },
        isLoggedIn: function() {
            return readCookie("loginToken") ? true:false;
        },
        getAuthToken: function() {
            return readCookie("loginToken")
        }
    }
})();