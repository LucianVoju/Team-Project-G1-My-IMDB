/*jshint multistr: true */
//setup the dom strings for further elements acces
import {getAllMovies,
	searchMovies,
	getMovieById,
	addMovie,
	deleteMovie,
	editMovie} from "./MovieController";
 
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

//display a movie
//TODO clone a template instead of this html string and use it
function displayMovie(movie) {
    let html, newHtml;
    html = '<article class="movie">\
                    <h2>\
                        <a class="movie-title" href="%url%/movie.html?id=%movieid%">%movieTitle%</a>\
                    </h2>\
                    <img class = "poster-url" src="%posterUrl%"></img>\
                    <p class="-genremovie">%genre%</p>\
                    <p class="movie-year">%year%</p>\
                    <p class="movie-rating">%rating%</p>\
                    <ul class="no-bullet">\
                        <li class="read-more">\
                            <a class="movie-url" href="">Read more</a>\
                        </li>\
                        <li class="edit-movie">\
                            <a class="edit-a movie-edit"  data-movieid="%movieid%">Edit Movie</a>\
                        </li>\
                        <li class="delete-movie">\
                            <a class="delete-a movie-delete" data-movieid="%movieid%">Delete Movie</a>\
                        </li>\
                    </ul>\
                </article>';
    //replace html string with data from backend
    newHtml = html.replace("%movieTitle%", movie.Title || "Title not awaible");
    newHtml = newHtml.replace("%posterUrl%", movie.Poster || "https://via.placeholder.com/330x446");
    newHtml = newHtml.replace("%genre%", movie.Genre);
    newHtml = newHtml.replace("%year%", movie.Year);
    newHtml = newHtml.replace("%rating%", movie.imdbRating);
    newHtml = newHtml.replace("%movieid%", movie._id);

    //insert the HTML into the DOM
    document.getElementById("article-container").insertAdjacentHTML("afterbegin", newHtml);
}


function displayMovie(movie) {
    
    var main = document.getElementById("movies");
    var movieElem = document.getElementsByClassName("movie")[0];

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
    deleteMovieElem.addEventListener("click", ()=>{
        deleteMovie(movie._id);
    });
    
   var editMovieElem = newMovieElem.querySelector("#edit_movie");
   deleteMovieElem.addEventListener("click", editMovie);
    
    main.appendChild(newMovieElem);

}

//display pagination
//TODO clone a template instead of this html string and use it
function displayPagination(pagination) {

    let html, newHtml;
    html = '<li class="pagination-item">\
                        <i class="ion-arrow-left-c"></i>\
                        <p>%current% of %last-page%</p>\
                        <i class="ion-arrow-right-c"></i>\
                    </li>'
    //replace html string with data from backend
    newHtml = html.replace("%current%", pagination.currentPage);
    newHtml = newHtml.replace("%last-page%", pagination.numberOfPages);
    //insert the HTML into the DOM

    document.getElementById("pagination").insertAdjacentHTML("afterbegin", newHtml);

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
    displayMovie,
    displayPagination,
    getSearchInput,
    clearSearchInput
};