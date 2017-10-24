/* global $ */

var movieUrl ="https://ancient-caverns-16784.herokuapp.com/movies/59d79f05b0b596040599aac8";

    $.ajax ({
      url: movieUrl,
      method: 'GET',
      success: function(response) {
        var title = document.getElementById("title");
        title.innerHTML =  response.Title;
        
        var poster = document.getElementById("poster");
        poster.setAttribute('src', response.Poster);
        
        var year = document.getElementById("year");
        year.innerHTML = "Year: " +  response.Year;
        
        var release = document.getElementById("release");
        release.innerHTML = "Released: " + response.Released;
        
        var runtime = document.getElementById("runtime");
        runtime.innerHTML = "Runtime: " + response.Runtime;
        
        var genre = document.getElementById("genre");
        genre.innerHTML = "Genre: " + response.Genre;
        
        var actors = document.getElementById("actors");
        actors.innerHTML = "Actors: " + response.Actors;
        
        var plot = document.getElementById("plot");
        plot.innerHTML = "Plot: " + response.Plot;
        
        var country = document.getElementById("country");
        country.innerHTML = "Country: " + response.Country;
        
        var awards = document.getElementById("awards");
        awards.innerHTML = "Awards: " + response.Awards;
        
        var type = document.getElementById("type");
        type.innerHTML = "Type: " + response.Type;
      }
    });
