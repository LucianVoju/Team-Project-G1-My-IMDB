/*global UIController*/
/*global requestsMovieController*/
/*global userController*/


const controller = (function (uiCtrl,requestCtrl,userCtrl) {
	const url = "https://ancient-caverns-16784.herokuapp.com/movies";
	const DOM = uiCtrl.getDOMstrings();
	let paginationData;
	let paginationRange = function (pageNum, lastPage) {
            const currentPage = pageNum,
            last = lastPage,
            delta = 2,
            left = currentPage - delta,
            right = currentPage + delta,
            range = [];
            for (let i = 1; i <= last; i++) {
            if ( i >= left && i <= right) {
                range.push(i);
                    }
                }
                return range;
            }
	
	
	let setupEventListeners = function() {
		document.querySelector(DOM.searchBtn).addEventListener("click", searchAndDisplayMovies);
		
		document.querySelector(DOM.searchParam).addEventListener('keypress', function(event) {
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
				paginationData = response.pagination;
				console.log(paginationData);
			});
		};
	
	//search and display movies based on user input
	let searchAndDisplayMovies = function(){
		let input;
		
		//get the selected field and input text
		input = uiCtrl.getInput();
		//get the movie array from api and display it to thr ui
		searchAndDisplay(url,input.type,input.description);
		//reset the text box
		uiCtrl.clearSearchInput();
	};
	
	//display the movies on page load
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
			//consoleLogLogin();
		}
	};	
	
})(UIController, requestsMovieController, userController);

window.addEventListener("load",controller.init);