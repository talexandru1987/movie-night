const favouritesContainer = $("#favourites-container");

const renderNotification = () => {
  const notification = `<div class="modal">
  <div class="modal-background"></div>
  <div class="modal-content">
    <div class="box">
      <article class="media">
        <div class="media-content">
          <div class="content">
            <h4>
              Are you sure you want to delete this movie from your
              favourites?
            </h4>
          </div>
          <div class="field is-grouped">
            <p class="control">
              <button class="button is-normal">Cancel</button>
            </p>
            <p class="control">
              <button class="button is-danger">Delete</button>
            </p>
          </div>
        </div>
      </article>
    </div>
  </div>
  <button class="modal-close is-large" aria-label="close"></button>
</div>`;
  // $("#favourites-container").append(notification);

  // $("#favourites-container").append(moviesCards);
  // paste the HTML code and append to favouritesContainer
};

const renderEmptyMoviesAlert = () => {
  const alertEmptyMovies = `<div class="notification is-warning">
    Are you sure you want to
    <strong> delete </strong> this movie from your favourites?

    <a href="./index.html">Search Movies</a>.
  </div>`;
  favouritesContainer.append(alertEmptyMovies);
};

const renderFavouriteMovies = (movies) => {
  console.log(movies);
  favouritesContainer.empty();
  if (movies.length === 0) {
    // renderNotification();
    renderEmptyMoviesAlert();
  } else {
    // map through movies and construct a movie cards array
    const movieFavouritesCards = movies.map((movie) => {
      return `<div class="favourite-movie-card">
          <!-- card image div -->

          <div class="card-img-container">
            <img
              src="https://www.themoviedb.org/t/p/w1280/7SAp9DBEJNA3gXuQtum3u2SffQa.jpg"
            />
          </div>

          <!-- card info div -->
          <div class="favourite-movie-info">
            <h3 class="p-2 movie-title">${movie.title} (${movie.yearRelease})</h3>
            <h4 class="p-2"><i class="fa-solid fa-hourglass"></i> ${movie.runtime}</h4>
            <div class="my-3">
              <button data-movieId="${movie.imdbID}" class="is-fullwidth button is-danger">Delete</button>
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
    console.log(event);
    console.log(currentTarget.attr("data-movieId"));
    const imdbID = currentTarget.attr("data-movieId");
    // Get all movies from LS (movies)
    const movies = readFromLocalStorage("favorites", []);
    const filteredMovies = movies.filter((movie) => movie.imdbID !== imdbID);
    console.log(filteredMovies);
    writeToLocalStorage("favorites", filteredMovies);
    renderFavouriteMovies(filteredMovies);
  }
};

//code to execute when ready
const onFavouritesReady = () => {
  handleNavBarToggle();
  // Get all movies from LS (movies)
  const movies = readFromLocalStorage("favorites", []);
  console.log(movies);
  renderFavouriteMovies(movies);
};

//check if document is ready
$(document).ready(onFavouritesReady);
