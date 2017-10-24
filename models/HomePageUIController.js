/*jshint multistr: true */
//setup the dom strings for further elements acces
import {
    getAllMovies,
    searchMovies,
    getMovieById,
    addMovie,
    deleteMovie,
    editMovie
}
from "./MovieController";

let url = "https://ancient-caverns-16784.herokuapp.com/movies";

let domStrings = {
    movieTitle: "#movie-title",
    article: ".movie",
    searchType: ".select-search-field",
    searchParam: ".search-input",
    searchBtn: ".search-button",
    movieContainer: "#article-container",
    editBtn: ".edit-a",
    deleteBtn: ".delete-a",
    pagination: "#pagination",
};

//make the dom strings public
function getDomStrings() {
    return domStrings;
}

function displayMovies(movieArray) {

    var main = document.getElementById("movies");
    var movieElem = document.getElementsByClassName("movie")[0];

    movieArray.forEach(function(movie) {

        var newMovieElem = movieElem.cloneNode(true);

        var movieTitle = newMovieElem.querySelector("#movie-title");
        movieTitle.innerHTML = movie.Title;
        movieTitle.href = url + "/movie.html?id=" + movie._id;

        var posterUrl = newMovieElem.querySelector("#poster-url");
        posterUrl.innerHTML = movie.Poster;

        var movieGenre = newMovieElem.querySelector("#movie-genre");
        movieGenre.innerHTML = movie.Genre;

        var movieYear = newMovieElem.querySelector("#movie-year");
        movieYear.innerHTML = movie.Year;

        var deleteMovieElem = newMovieElem.querySelector("#delete-movie");
        deleteMovieElem.addEventListener("click", () => {
            deleteMovie(movie._id);
        });

        var editMovieElem = newMovieElem.querySelector("#edit_movie");
        editMovieElem.addEventListener("click", () => {
            editMovie(movie._id);
        });

        main.appendChild(newMovieElem);

    });

}

//display pagination
function displayPagination(pagination) {

    document.getElementById("page-number").innerHTML(pagination.currentPage + " of " + pagination.numberOfPages);

}
//get the users search type and input
function getSearchInput() {
    return {
        type: document.querySelector(domStrings.searchType).value,
        description: document.querySelector(domStrings.searchParam).value
    };
}

//clear the search input
function clearSearchInput() {
    let input = document.querySelector(domStrings.searchParam)
    input.value = "";
}

export {
    getDomStrings,
    displayMovies,
    displayPagination,
    getSearchInput,
    clearSearchInput
};