const UIController = (function () {
    //setup the dom strings for further elements acces
    let DOMstrings= {
        movieTitle: "#movie-title",
        article:"movie",
        searchType:".select-search-field",
        searchParam: ".search-input",
        searchBtn:".search-button",
        articleContainer:"#article-container",
        movieEdit: ".movie-edit",
        movieDelet: ".movie-delete",
    };
    
    return {
        //make the dom strings public
        getDOMstrings:function(targetContainer){
            return DOMstrings;
        },
        
        //display the list of movies using insertAdjacentHTML function
        displayMovies:function (movieArr) {
            let html, newHtml; 
            html = '<article class="col-md-1 movie"><h2><a id="movie-title" href="#">%movieTitle%</a></h2><img src="%posterUrl%"></img><p id="-genremovie">%genre%</p><p id="movie-year">%year%</p><p id="movie-rating">%rating%</p><ul><li class="read-more"><a id="movie-url" href="">Read more</a> <button type="submit" class="movie-edit">Edit</button> <button type="submit" class="movie-delete">Delete</button></li></ul></article>'
            //replace html string with data from backend
            newHtml = html.replace("%movieTitle%", movieArr.Title);
            newHtml= newHtml.replace("%posterUrl%",movieArr.Poster);
            newHtml = newHtml.replace("%genre%",movieArr.Genre);
            newHtml = newHtml.replace("%year%",movieArr.Year);
            newHtml = newHtml.replace("%rating%",movieArr.imdbRating);
            
            //insert the HTML into the DOM
            document.getElementById("article-container").insertAdjacentHTML("afterbegin",newHtml);
        },
        
        //get the users search type and input
        getInput:function(){
            return {
                type:document.querySelector(DOMstrings.searchType).value,
                description: document.querySelector(DOMstrings.searchParam).value
            };
        },
        
        //clear the search input
        clearSearchInput: function() {
            let input = document.querySelector(DOMstrings.searchParam)
            input.value="";
        }
    }
})();