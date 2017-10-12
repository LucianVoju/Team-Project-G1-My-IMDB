 var blogBaseUrl = "https://frontend-bma-bartamihai.c9users.io/blog";
 
 window.addEventListener("load", function(e) {
  
  var movies = new Movies();
  var moviesReq = movies.getMovies();

  moviesReq.then(renderMovies);

  function renderMovies() {
   
    var main = document.getElementById("movies");
    var movieElem = document.getElementsByClassName("movie")[0];
    
     for (var i = 0; i<movies.models.length;i++){
      
       var newAMovieElem = movieElem.cloneNode(true);
       
       var movieTitle = newAMovieElem.querySelector("#movie-title");
       movieTitle.innerHTML = movies.models[i].title;
       
       var movieGenre = newAMovieElem.querySelector("#movie-genre");
       movieGenre.innerHTML = movies.models[i].body;
       
       var movieYear = newAMovieElem.querySelector("#movie-year");
       movieYear.innerHTML =  movies.models[i].year;
       
       var movieRating = newAMovieElem.querySelector("#movie-rating");
       movieRating.innerHTML =  movies.models[i].rating;
       
       
       var movieUrl = newAMovieElem.querySelector("#article-url");
       movieUrl.href = blogBaseUrl + "/movies/movie.html?id=" + movies.models[i].id;
       
       var movieDelete = newAMovieElem.querySelector(".movie-delete");
       movieDelete.id = response[i].id;
       movieDelete.addEventListener("click", deleteMovie);
       
       var movieEdit = newAMovieElem.querySelector(".movie-edit");
       movieEdit.id = response[i].id;
       movieEdit.addEventListener("click", editMovie);

       main.appendChild(newAMovieElem);

      }
  }
  
  //mock
  fucntion getMovies(){
   
  }
  
 });
 
