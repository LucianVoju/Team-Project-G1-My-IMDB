/*global UIController*/
/*global requestsMovieController*/
/*global userController*/


const controller = (function (uiCtrl, requestCtrl, userCtrl) {
	const url = "https://ancient-caverns-16784.herokuapp.com/movies";
	const DOM = uiCtrl.getDOMstrings();


	let setupEventListeners = function () {
		document.querySelector(DOM.searchBtn).addEventListener("click", searchAndDisplayMovies);
		document.addEventListener('keypress', function (event) {
			if (event.keyCode === 13 || event.which === 13) {
				searchAndDisplayMovies();
			}
		});
	}

	let setupPageLoadedEventListeners = function() {
		document.querySelectorAll(DOM.editBtn).forEach(e=>{
			e.addEventListener("click", editMovie);
		});
		document.querySelectorAll(DOM.deleteBtn).forEach(e=>{
			e.addEventListener("click", deleteMovie);
		});
	}

	let searchAndDisplay = function (url,selectedTypefromDropdown, searchInput) {

		let movieContainer, paginationContainer;
	
		paginationContainer = document.querySelector(DOM.pagination);
		movieContainer = document.querySelector(DOM.movieContainer);
		
		while (movieContainer.lastChild) {
			movieContainer.removeChild(movieContainer.lastChild);
		}
	
		while (paginationContainer.lastChild) {
			paginationContainer.removeChild(paginationContainer.lastChild);
		}

		requestCtrl.getMovies(url,selectedTypefromDropdown,searchInput).then(response => {
			response.results.forEach(res => {
				uiCtrl.displayMovies(res);
			});
			let pagination = response.pagination;
			uiCtrl.displayPagination(pagination);
		});
	};

	let editMovie = function(e) {
		e.preventDefault();
		console.log(this);
		if (userCtrl.isLoggedIn()) {

		} else {
			alert("Can't edit movie. User not logged in.");
		}
		return false; // preventDefault
	}

	let deleteMovie = function(e) {
		e.preventDefault();
		console.log(this);
		if (userCtrl.isLoggedIn()) {
			movieId = this.getAttribute("data-movieid");
			if(!movieId) {
				alert("No movieId provided");
				return;
			}
			jQuery.ajax({
				url: url + "/" + movieId,
				method: 'DELETE',
				headers: {
					'x-auth-token':userCtrl.getAuthToken()
				}
			  }).done(function() {
				alert( "success" );
			  })
			  .fail(function( jqXHR, textStatus, errorThrown) {
				alert( "error" );
				console.log(textStatus);
				console.log(errorThrown);
			  });
		} else {
			alert("Can't delete movie. User not logged in.");
		}
		return false; // preventDefault
	}

	//search and display movies based on user input
	let searchAndDisplayMovies = function () {
		let input;

		//get the selected field and input text
		input = uiCtrl.getInput();
		
		
		//get the movie array from api and display it to thr ui
		searchAndDisplay(url,input.type, input.description);
		
		
		//reset the text box
		uiCtrl.clearSearchInput();
	};

	//display the movies on page load
	let displayMovie = async function () {
		let paginationContainer = document.querySelector(DOM.pagination);
		let movieContainer = document.querySelector(DOM.movieContainer);
		
		let movieResponseObject = await requestCtrl.getMovies();
		console.log(movieResponseObject);
			movieResponseObject.results.forEach((movie) => {
			uiCtrl.displayMovies(movie);
		});
		
		let paginationResponse = movieResponseObject.pagination;
			uiCtrl.displayPagination(paginationResponse);
			setupPageLoadedEventListeners();
	}

	let consoleLogLogin = async function () {
		let response = await userCtrl.loginUser(url);
		console.log(response);
	}
	return {

		getSpecificMovie: function () {
			requestCtrl.getSpecificMovie(url, "59d79f05b0b596040599aac9");
		},
		init: function () {
			setupEventListeners();
			displayMovie();
			//consoleLogLogin();
		}
	};

})(UIController, requestsMovieController, userController);

window.addEventListener("load", controller.init);

