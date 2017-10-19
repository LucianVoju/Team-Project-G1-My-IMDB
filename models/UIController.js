
/*jshint multistr: true */
const UIController = (function () {
    //setup the dom strings for further elements acces
    let DOMstrings = {
        movieTitle: "#movie-title",
        article: ".movie",
        searchType: ".select-search-field",
        searchParam: ".search-input",
        searchBtn: ".search-button",
        movieContainer: "#article-container",
        editBtn: ".edit-a",
        deleteBtn: ".delete-a",
        pagination:"#pagination",
    };

    return {
        //make the dom strings public
        getDOMstrings: function (targetContainer) {
            return DOMstrings;
        },

        //display the list of movies using insertAdjacentHTML function
        displayMovies: function (movieArr) {
            let html, newHtml;
            html = '<article class="movie">\
                    <h2>\
                        <a class="movie-title" href="#">%movieTitle%</a>\
                    </h2>\
                    <img src="%posterUrl%"></img>\
                    <p class="-genremovie">%genre%</p>\
                    <p class="movie-year">%year%</p>\
                    <p class="movie-rating">%rating%</p>\
                    <ul class="no-bullet">\
                        <li class="read-more">\
                            <a class="movie-url" href="#">Read more</a>\
                        </li>\
                        <li class="edit-movie">\
                            <a class="edit-a movie-edit" href="#" data-movieid="%movieid%">EditMovie</a>\
                        </li>\
                        <li class="delete-movie">\
                            <a class="delete-a movie-delete" href="#"  data-movieid="%movieid%">DeleteMovie</a>\
                        </li>\
                    </ul>\
                </article>';
            //replace html string with data from backend
            newHtml = html.replace("%movieTitle%", movieArr.Title || "Title not awaible");
            newHtml = newHtml.replace("%posterUrl%", movieArr.Poster || "https://via.placeholder.com/330x446");
            newHtml = newHtml.replace("%genre%", movieArr.Genre);
            newHtml = newHtml.replace("%year%", movieArr.Year);
            newHtml = newHtml.replace("%rating%", movieArr.imdbRating);
            newHtml = newHtml.replace(/%movieid%/g, movieArr._id);

            //insert the HTML into the DOM
            document.getElementById("article-container").insertAdjacentHTML("afterbegin", newHtml);
        },
        //display pagination
        displayPagination: function(pagination){
            
            let html, newHtml;
            html = '<li class="pagination-item">\
                        <i class="ion-arrow-left-c"></i>\
                        <p>%current% of %last-page%</p>\
                        <i class="ion-arrow-right-c"></i>\
                    </li>'
            //replace html string with data from backend
            newHtml = html.replace("%current%",pagination.currentPage);
            newHtml = newHtml.replace("%last-page%",pagination.numberOfPages);
             //insert the HTML into the DOM
            
            document.getElementById("pagination").insertAdjacentHTML("afterbegin", newHtml);
             
        },
        //get the users search type and input
        getInput: function () {
            return {
                type: document.querySelector(DOMstrings.searchType).value,
                description: document.querySelector(DOMstrings.searchParam).value
            };
        },

        //clear the search input
        clearSearchInput: function () {
            let input = document.querySelector(DOMstrings.searchParam)
            input.value = "";
        }
    }
})();