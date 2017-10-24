/*global fetch*/
//get all movies
import {loginUser, isLoggedIn,getAuthToken} from "./userController";

let url = "https://ancient-caverns-16784.herokuapp.com/movies";

let headers = new Headers();
headers.append("x-auth-token", getAuthToken());

const getAllMovies = async function() {
	try {
		let response = await fetch(url, { method: "GET" });
		let movies = await response.json();
		return movies;
	}
	catch (error) {
		console.log(error);
	}
};
//search movie
const searchMovies = async function(field, param) {
	try {
		let response = await fetch(`${url}?${field}=${param}`, { method: "GET" });
		let movies = await response.json();
		return movies;
	}
	catch (error) {
		console.log(error);
	}
};

//get movie by ID
const getMovieById = async function(id) {
	try {
		let response = await fetch(`${url}/${id}`, { method: "GET" });
		let movie = await response.json();
		return movie;
	}
	catch (error) {
		console.log(error);
	}
};

//add movie
const addMovie = async function(movie) {

	try {
		let response = await fetch(`${url}/${movie}`, { method: "POST", headers: headers, body: JSON.stringify(movie) });
		return await response.json();
	}
	catch (error) {
		console.log(error);
	}
};

//delete movie
const deleteMovie = async function(id) {
	try {
		 await fetch(`${url}/${id}`, { method: "DELETE", headers: headers });
	}
	catch (error) {
		console.log(error);
	}
};

//edit movie
const editMovie = async function(id, movie) {
	try {
		let response = await fetch(`${url}/${movie}`, { method: "PUT", headers: headers, body: JSON.stringify(movie) });
		return await response.json();
	}
	catch (error) {
		console.log(error);
	}
};

export {
	getAllMovies,
	searchMovies,
	getMovieById,
	addMovie,
	deleteMovie,
	editMovie
};