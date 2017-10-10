/*global UIController*/
/*global requestsMovieController*/
const controller = (function (uiCtrl,requestCtrl) {
	const url = "https://ancient-caverns-16784.herokuapp.com/movies";
	const DOMstrings = uiCtrl.getDOMstrings();
	
	let movieArr= {
		
            Title: "Star Wars: Episode IV - A New Hope",
            Year: "1977",
            
            Genre: "Action, Adventure, Fantasy",
           
            Poster: "https://images-na.ssl-images-amazon.com/images/M/MV5BYTUwNTdiMzMtNThmNS00ODUzLThlMDMtMTM5Y2JkNWJjOGQ2XkEyXkFqcGdeQXVyNzQ1ODk3MTQ@._V1_SX300.jpg",
            imdbRating: "8.7",
            
	}
	let displayMovie = function(){
			let movieArr = requestCtrl.getAllM();
			movieArr.then(console.log(movieArr));
		}
		
	return{
		getMovies: function(){
			requestCtrl.getAllM(url);
			},
		
		searchMovie:function(){
			requestCtrl.searchMovie(url,"Title", "Star")
		},
		getSpecificMovie: function(){
			requestCtrl.getSpecificMovie(url,"59d79f05b0b596040599aac9");
		},
		init:function() {
			displayMovie();
		}
	}	
	
})(UIController, requestsMovieController);