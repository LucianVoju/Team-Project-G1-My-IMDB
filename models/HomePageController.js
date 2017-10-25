/*global UIController*/
/*global requestsMovieController*/
/*global userController*/

import { getAllMovies, searchMovies, getMovieById, addMovie, deleteMovie, editMovie } from "./MovieController.js";
import { getDomStrings, displayMovies, displayPagination, getSearchInput, clearSearchInput } from "./HomePageUIController.js";

let domStrings = getDomStrings();


let setupEventListeners = function() {
	document.querySelector(domStrings.searchBtn).addEventListener("click", searchAndDisplayMovies);
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

	searchMovies(selectedTypefromDropdown, searchInput).then(function(response){
		displayMovies(response.results);
	});
};

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
let displayMovies = async function() {
	let paginationContainer = document.querySelector(domStrings.pagination);
	let movieContainer = document.querySelector(domStrings.movieContainer);

	getAllMovies().then(function(response){
		displayMovies(response.results);
		displayPagination(response.pagination);
	});
}

return {

	init: function() {
		setupEventListeners();
		displayMovies();
	}
};
