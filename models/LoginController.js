/*global fetch*/
/*global Headers*/

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function setCoockie(name,value){
    document.cookie = "name=" + value;
}

const loginUser = async function(uname, pwd) {
    let headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");

    try {
        let response = await fetch('${url}/auth/login', { method: "POST", headers: headers, Payload: { username: uname, password: pwd }});
        let loginResponse = await response.json();
        setCoockie("loginToken",loginResponse.accessToken);
    }
    catch (error) {
        console.log(error);
    }
};

function isLoggedIn(){
    return readCookie("loginToken") ? true : false;
}

function getAuthToken(){
    return readCookie("loginToken");
}

export {
  loginUser, isLoggedIn,getAuthToken
};