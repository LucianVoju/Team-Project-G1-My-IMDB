/*global UIController*/
/*global requestsMovieController*/
const controller = (function (uiCtrl,requestCtrl) {
	const url = "https://ancient-caverns-16784.herokuapp.com/movies";
	return{
		getMovies: function(){
			requestCtrl.getAllM(url);
			},
		
		searchMovie:function(){
			requestCtrl.searchMovie(url,"Title", "Star")
		},
		getSpecificMovie: function(){
			requestCtrl.getSpecificMovie(url,"59d79f05b0b596040599aac9");
		}
	}	
	
})(UIController, requestsMovieController);