/*global UIController*/
/*global requestsMovieController*/
const controller = (function (uiCtrl,requestCtrl) {
	const url = "https://ancient-caverns-16784.herokuapp.com/movies";
	const DOMstrings = uiCtrl.getDOMstrings();
	
	/*let movieArr= {
            Title: "Star Wars: Episode IV - A New Hope",
            Year: "1977",
            Genre: "Action, Adventure, Fantasy",
            Poster: "https://images-na.ssl-images-amazon.com/images/M/MV5BYTUwNTdiMzMtNThmNS00ODUzLThlMDMtMTM5Y2JkNWJjOGQ2XkEyXkFqcGdeQXVyNzQ1ODk3MTQ@._V1_SX300.jpg",
            imdbRating: "8.7",
	}*/
	let displayMovie = async function(){
			let movieArr = await requestCtrl.getAllM(url);
			console.log(movieArr);
			movieArr.results.forEach((movie)=>{
				uiCtrl.displayMovies(movie);	
			});
		}
		
	return{
		
		searchMovie:function(){
			requestCtrl.searchMovie(url,"Title", "Star").then(response => {
				console.log(response);
			});
		},
		getSpecificMovie: function(){
			requestCtrl.getSpecificMovie(url,"59d79f05b0b596040599aac9");
		},
		init:function() {
			displayMovie();
		}
	};	
	
})(UIController, requestsMovieController);

controller.init();