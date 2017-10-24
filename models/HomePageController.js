/*global UIController*/
/*global requestsMovieController*/
/*global userController*/

import { getAllMovies, searchMovies, getMovieById, addMovie, deleteMovie, editMovie } from "./MovieController.js";
import { getDomStrings, displayMovie, displayPagination, getSearchInput, clearSearchInput } from "./HomePageUIController.js";

let domStrings = getDomStrings();


let setupEventListeners = function() {
	document.querySelector(domStrings.searchBtn).addEventListener("click", searchAndDisplayMovies);
}

let setupPageLoadedEventListeners = function() {
	document.querySelectorAll(domStrings.editBtn).forEach(e => {
		e.addEventListener("click", editMovie);
	});
	document.querySelectorAll(domStrings.deleteBtn).forEach(e => {
		e.addEventListener("click", deleteMovie);
	});
}

let searchAndDisplay = function(selectedTypefromDropdown, searchInput) {

	let movieContainer, paginationContainer;

	paginationContainer = document.querySelector(domStrings.pagination);
	movieContainer = document.querySelector(domStrings.movieContainer);

	while (movieContainer.lastChild) {
		movieContainer.removeChild(movieContainer.lastChild);
	}

	while (paginationContainer.lastChild) {
		paginationContainer.removeChild(paginationContainer.lastChild);
	}

	searchMovies(selectedTypefromDropdown, searchInput).then(response => {
		response.results.forEach(res => {
			displayMovie(res);
		});
		let pagination = response.pagination;
		displayPagination(pagination);
	});
};

let editMovie = function(e) {
	e.preventDefault();
	console.log(this);
	if (isLoggedIn()) {

	}
	else {
		alert("Can't edit movie. User not logged in.");
	}
	return false; // preventDefault
}

let deleteMovie = function(e) {
	e.preventDefault();
	console.log(this);
	if (isLoggedIn()) {
		movieId = this.getAttribute("data-movieid");
		if (!movieId) {
			alert("No movieId provided");
			return;
		}
		jQuery.ajax({
				url: url + "/" + movieId,
				method: 'DELETE',
				headers: {
					'x-auth-token': userCtrl.getAuthToken()
				}
			}).done(function() {
				alert("success");
			})
			.fail(function(jqXHR, textStatus, errorThrown) {
				alert("error");
				console.log(textStatus);
				console.log(errorThrown);
			});
	}
	else {
		alert("Can't delete movie. User not logged in.");
	}
	return false; // preventDefault
}

//search and display movies based on user input
let searchAndDisplayMovies = function() {
	let input;

	//get the selected field and input text
	input = getSearchInput();


	//get the movie array from api and display it to thr ui
	searchAndDisplay(input.type, input.description);


	//reset the text box
	clearSearchInput();
};

//display the movies on page load
let displayMovie = async function() {
	let paginationContainer = document.querySelector(DOM.pagination);
	let movieContainer = document.querySelector(DOM.movieContainer);

	let movieResponseObject = await requestCtrl.getMovies();
	console.log(movieResponseObject);
	movieResponseObject.results.forEach((movie) => {
		displayMovie(movie);
	});

	let paginationResponse = movieResponseObject.pagination;
	uiCtrl.displayPagination(paginationResponse);
	setupPageLoadedEventListeners();
}

let consoleLogLogin = async function() {
	let response = await userCtrl.loginUser(url);
	console.log(response);
}
return {

	getSpecificMovie: function() {
		requestCtrl.getSpecificMovie(url, "59d79f05b0b596040599aac9");
	},
	init: function() {
		setupEventListeners();
		displayMovie();
		//consoleLogLogin();
	}
};
