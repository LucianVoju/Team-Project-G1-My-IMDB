/*global fetch*/
const requestsMovieController = (function () {
	const mainUrl = "https://ancient-caverns-16784.herokuapp.com/movies";
	
	/* This function requests the movies from the server. You can call the function
	   with no parameters and will return all movies. You can call it with no url parameter
	   and sending the user search input and selected option from dropdown.
	   You can call it with the prowided url from the paination object.
	*/
    const getMovies = async function(url,selectedTypefromDropdown,searchInput){
    	
    	if(selectedTypefromDropdown&&searchInput){
			url = `${mainUrl}?${selectedTypefromDropdown}=${searchInput}`
		}else{
			url = mainUrl;
		}
		try{
			let response = await fetch(url, {method:"GET"});
			let movies = await response.json();
			
			return  movies;
		}
		catch(error){
			console.log(error);
		}
	};

	
	//get movie by ID
	const getSpecificMovie = async function(mainUrl,id){
		try{
			let response = await fetch(`${mainUrl}/${id}`, {method:"GET"});
			let movies = await response.json();
			
			console.log(movies);
		}
		catch(error){
			console.log(error);
		}
	};
	
	//delete movie
	// const deleteMovie = async function(url,id){
	// 	try{
	// 		let response = await fetch(`${url}/${id}`,{method: "DELETE"});
	// 		let movies = await response.json();
			
	// 		console.log(movies);
	// 	}
	// 	catch(error){
	// 		console.log(error);
	// 	}
	// };
	
	return {   
		getMovies: getMovies,
		//searchMovie:searchMovie,
		getSpecificMovie:getSpecificMovie,
		//deleteMovie:deleteMovie
	};
		
})();