const favouritesContainer = $("#favourites-container");
//id to target to the delete card process

const renderNotification = (imdbID) => {
  const notification = `<div class="notification is-warning">
        <div class="content">
            <h4>
              Are you sure you want to delete this movie from your
              favorites?
            </h4>
          </div>
          <div id = "decision-container" class="field is-grouped">
            <p class="control">
              <button id = "cancel-btn" class="button is-normal">Cancel</button>
            </p>
            <p class="control">
              <button id = "delete-btn" data-movieId ="${imdbID}" class="button is-danger">Delete</button>
            </p>
          </div>
       </div>`;

  //empty the container
  favouritesContainer.empty();
  //append the notification
  favouritesContainer.append(notification);
  //add an event listener to the decision pop-up
  favouritesContainer.on("click", processDecision);
};

const processDecision = (event) => {
  //target the event
  const currentTarget = $(event.target);
  //process the event id
  const valueOfId = currentTarget.attr("id");
  const imdbID = currentTarget.attr("data-movieId");

  //process decision
  if (valueOfId === "delete-btn") {
    //empty the container
    favouritesContainer.empty();

    // Get all movies from LS (movies)
    const movies = readFromLocalStorage("favorites", []);
    const filteredMovies = movies.filter((movie) => movie.imdbID !== imdbID);

    writeToLocalStorage("favorites", filteredMovies);
    renderFavouriteMovies(filteredMovies);
  } else if (valueOfId === "cancel-btn") {
    //empty the container
    favouritesContainer.empty();

    // Get all movies from LS (movies)
    const movies = readFromLocalStorage("favorites", []);
    renderFavouriteMovies(movies);
  }
};

const renderEmptyMoviesAlert = () => {
  const alertEmptyMovies = `<div class="notification is-warning">
  You have no favorite movies saved. Click 
    <strong><a href="./index.html">here</a></strong> if you want to search for movies
    
  </div>`;
  favouritesContainer.append(alertEmptyMovies);
};

const renderFavouriteMovies = (movies) => {
  favouritesContainer.empty();
  if (movies.length === 0) {
    // renderNotification
    renderEmptyMoviesAlert();
  } else {
    // map through movies and construct a movie cards array
    const movieFavouritesCards = movies.map((movie) => {
      return `<div class="favourite-movie-card">
          <!-- card image div -->

          <div class="card-img-container">
            <img
              src="${movie.poster}"
            />
          </div>

          <!-- card info div -->
          <div class="favourite-movie-info">
            <h3 class="p-2 movie-title">${movie.title} (${movie.yearRelease})</h3>
            <h4 class="p-2"><i class="fa-solid fa-hourglass"></i> ${movie.runtime}</h4>
            <div class="my-3">
              <button id="${movie.imdbID}" class="is-fullwidth button is-danger">Delete</button>
            </div>
          </div>
        </div>`;
    });

    // append to the parent
    favouritesContainer.append(movieFavouritesCards.join(""));
    favouritesContainer.click(deleteFavouriteMovie);
  }
};

const deleteFavouriteMovie = (event) => {
  const currentTarget = $(event.target);
  if (currentTarget.prop("tagName") === "BUTTON") {
    //target the movie id
    const imdbID = currentTarget.attr("id");
    //render the choice notification
    renderNotification(imdbID);
  }
};

//code to execute when ready
const onFavouritesReady = () => {
  handleNavBarToggle();
  // Get all movies from LS (movies)
  const movies = readFromLocalStorage("favorites", []);

  renderFavouriteMovies(movies);
};

//check if document is ready
$(document).ready(onFavouritesReady);
