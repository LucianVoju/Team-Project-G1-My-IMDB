/*global fetch*/
/*global Headers*/

// register new user

const userController = (function(){
    let headers = new Headers();
    
    
    
    return {
        loginUser: async function() {
            let url = "https://ancient-caverns-16784.herokuapp.com"
            try{
                let response =  await fetch(`${url}/auth/login`,{method:"POST",contentType: 'application/x-www-form-urlencoded',data:{username:"test", password:"test"}  });
                let loginResponse = await response.json();
                
                return loginResponse
            }
            catch(error) {
                console.log(error)
            }
        }
    }
})();