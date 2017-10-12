/*global fetch*/
/*global Headers*/

// register new user

const userController = (function(){
    let headers = new Headers();
    
    
    
    return {
        loginUser: async function(url) {
            try{
                let response =  await fetch(`${url}/auth/login`,{method:"POST",Payload:{username:"test", password:"test"}  });
                let loginResponse = await response.json();
                
                return loginResponse
            }
            catch(error) {
                console.log(error)
            }
        }
    }
})();