window.addEventListener('load', function(){ 
	const $submit = document.getElementById('submitBtn');
	const $form = document.getElementById('registerForm');
	const $username = document.getElementById('email');
	const $password = document.getElementById('password');
	const $rePassword = document.getElementById('rePassword');
	const $redirectMessage = document.getElementById('redirectMessage');
	const $errorList = document.getElementById('errorList');

	let errorList = [];


	$form.addEventListener('submit', function(event){
		event.preventDefault();
		
		const username = $username.value;
		const password = $password.value;
		const rePassword = $rePassword.value;

		let passwordValid = false;
		let usernameValid = false;

		// empty password list on submit
		clearErrors();

		addClass(redirectMessage, 'hidden');

		// validation
		// password validation
		if (
			isPasswordValid(password, rePassword)
		) {
			// password valid
			removeClass($password, 'warning');
			removeClass($rePassword, 'warning');
			passwordValid = true;
			
		} else {
			// password not valid
			addClass($password, 'warning');
			addClass($rePassword, 'warning');
			passwordValid = false;
			
		}

		// username validation
		if (
			isUsernameValid(username)
		) {
			//username valid
			removeClass($username, 'warning');
			usernameValid = true;
		} else {
			addClass($username, 'warning');
			usernameValid = false;
		}

		// if both username and password are valid
		if (usernameValid && passwordValid) {
			registerUser(username, password);
		} else {
			showErrors();
		}
	});

	function addClass($element, className){
		if (!$element.classList.contains(className)) {
			$element.classList.add(className)
		}
	};

	function removeClass($element, className){
		if ($element.classList.contains(className)) {
			$element.classList.remove(className)
		}
	};


	function isPasswordValid(password, rePassword) {
		if (password !== rePassword) {
			errorList.push('Passwords do not match');
		}

		if(password.length < 8 || password.length > 24) {
			errorList.push('Password must be between 8 and 24 characters');
		}

		if (password == rePassword && password.length >= 8 && password.length <= 24) {
			return true;
		} else {
			return false;
		}
	};

	function isUsernameValid(username) {
		if (username.length >= 8 && username.length <= 24) {
			return true;
		} else {
			errorList.push('Username must be between 8 and 24 characters');
			return false;
		}
	}

	function showErrors() {
		errorList.forEach(function(error){

			let $p = document.createElement('p');
			$p.innerText = error;
			$errorList.appendChild($p);
		});
	}

	function clearErrors() {
		errorList = [];
		$errorList.innerHTML = '';
	}

	function registerUser(username, password) {
		const baseUrl = 'https://ancient-caverns-16784.herokuapp.com/';

		$.ajax({
			url : baseUrl + 'auth/register',
			method : 'POST',
			data: {
				username : username,
				password : password
			},
			success: function(response) {
	 			const accessToken = response.accessToken;

	 			//saving in cookie using jQuery
	 			setCookie('accessToken', accessToken);
	 			
	 			clearErrors();

	 			//show message register successfully redirecting in 5 sec  
	 			removeClass(redirectMessage, 'hidden');

	 			//redirect after success
	 			setTimeout(function(){
	 				window.location.href = 'index.html';
	 			}, 5000)
	 		},
	 		error: function(xhr, status, error) {

	 			const errorMessage = xhr.responseJSON.message;
	 			errorList.push(errorMessage);
	 			showErrors();
	 		}
		}); 
	}

	function setCookie(cname, cvalue, exdays) {
    	var d = new Date();
	    d.setTime(d.getTime() + (exdays*24*60*60*1000));
	    var expires = "expires="+ d.toUTCString();
	    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	}
});