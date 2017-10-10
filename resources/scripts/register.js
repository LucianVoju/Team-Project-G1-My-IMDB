window.addEventListener('load', function(){ 
	var submit = document.getElementById('submitBtn');

	submit.addEventListener('click',function() {
		event.preventDefault();

	$.ajax({
		var root = "https://ancient-caverns-16784.herokuapp.com/";
		method : 'POST',
		data: {
			username : 'bogdan',
			password : '123'
		},
		success: function(response) {
 		console.log(response);
 		}
	}); 
		


		// var displayMsg = document.getElementById('js-post');
		// displayMsg.classList.add('hidden');

		// // validate text imputs
		// var email = document.getElementById('email');
		// if (email.value == "") { 
		// 	email.style.border = "1px solid red";
		// 	email.focus();
		// 	return false;
		// };

		// var password = document.getElementById('password');
		// if (password.value =="") {
		// 	password.style.border = "1px solid red";
		// 	password.focus();
		// 	return false;
		// }

		// var rePassword = document.getElementById('rePassword');
		// if (rePassword.value =="") {
		// 	password.style.border = "1px solid red";
		// 	password.focus();
		// 	return false;
		// }

		// var passMatch =

		// validate register form
		// if((email !== '') && (password !== '')) {
		// 	displayMsg.classList.remove('hidden');
		// 	displayMsg.innerHTML = 'Thank you for registering !';
	
		// }


	});

});