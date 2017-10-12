/*global UIController*/
/*global requestsMovieController*/
const controller = (function (uiCtrl,requestCtrl) {
	const url = "https://ancient-caverns-16784.herokuapp.com/movies";
	const DOM = uiCtrl.getDOMstrings();
	
	
	let setupEventListeners = function() {
		document.querySelector(DOM.searchBtn).addEventListener("click", searchAndDisplayMovies);
		
		document.addEventListener('keypress', function(event) {
            if (event.keyCode === 13 || event.which === 13) {
                searchAndDisplayMovies();
            }
        });
	}
	
	let searchAndDisplay = function(url,searchType,searchInput){
			
		let box = document.querySelector(DOM.articleContainer);
		while (box.lastChild) {
		  box.removeChild(box.lastChild);
		}
		
		requestCtrl.searchMovie(url,searchType, searchInput).then(response => {
				response.results.forEach(res=>{
					uiCtrl.displayMovies(res);
				});
			});
		};
	
	let searchAndDisplayMovies = function(){
		let input;
		
		//get the selected field and input text
		input = uiCtrl.getInput();
		//get the movie array from api and display it to thr ui
		searchAndDisplay(url,input.type,input.description);
		//reset the text box
		uiCtrl.clearSearchInput();
	};
	
	
	let displayMovie = async function(){
			let movieArr = await requestCtrl.getAllM(url);
			console.log(movieArr);
			movieArr.results.forEach((movie)=>{
				uiCtrl.displayMovies(movie);	
			});
		}
		
	return{
		
		
		getSpecificMovie: function(){
			requestCtrl.getSpecificMovie(url,"59d79f05b0b596040599aac9");
		},
		init:function() {
			setupEventListeners();
			displayMovie();
		}
	};	
	
})(UIController, requestsMovieController);

window.addEventListener("load",controller.init);