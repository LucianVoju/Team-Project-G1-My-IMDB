const UIController = (function () {
    //get the DOM Strings
    
    let DOMstrings= {
        movieTitle: "#movie-title",
        article:"movie"
    }
    
    return {
        getDOMstrings:function(targetContainer){
            return DOMstrings;
        },
        
        displayMovies:function (movieArr) {
            let html, newHtml; 
            html = '<article class="movie"><h2><a id="movie-title" href="#">%movieTitle%</a></h2><img src="%posterUrl%"></img><p id="-genremovie">%genre%</p><p id="movie-year">%year%</p><p id="movie-rating">%rating%</p><ul><li class="read-more"><a id="movie-url" href="">Read more</a></li></ul></article>'
            //replace html string with data from backend
            newHtml = html.replace("%movieTitle%", movieArr.Title);
            newHtml= newHtml.replace("%posterUrl%",movieArr.Poster);
            newHtml = newHtml.replace("%genre%",movieArr.Genre);
            newHtml = newHtml.replace("%year%",movieArr.Year);
            newHtml = newHtml.replace("%rating%",movieArr.imdbRating);
            
            
            document.getElementById("article-container").insertAdjacentHTML("afterbegin",newHtml);
        }
    }
})();