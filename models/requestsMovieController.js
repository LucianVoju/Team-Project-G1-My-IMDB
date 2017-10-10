/*global fetch*/
const requestsMovieController = (function () {
	//get all movies
    const getAllMovies = async function(url){
		try{
			let response = await fetch(url, {method:"GET"});
			let movies = await response.json();
			
			console.log(movies);
		}
		catch(error){
			console.log(error);
		}
	};
	//search movie
	const searchMovie = async function(url,field,param){
		try{
			let response = await fetch(`${url}?${field}=${param}`, {method:"GET"});
			let movies = await response.json();
			
			console.log(movies);
		}
		catch(error){
			console.log(error);
		}
	};
	
	//get movie by ID
	const getSpecificMovie = async function(url,id){
		try{
			let response = await fetch(`${url}/${id}`, {method:"GET"});
			let movies = await response.json();
			
			console.log(movies);
		}
		catch(error){
			console.log(error);
		}
	};
	
	return {
		getAllM: getAllMovies,
		searchMovie:searchMovie,
		getSpecificMovie:getSpecificMovie
	}
		
})();