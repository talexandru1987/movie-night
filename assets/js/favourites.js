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
  $("#favourites-container").append(notification);

  const movie = `<div class="favourite-movie-card">
 <!-- card image div -->
 <div class="card-img-container">
   <img
     src="https://www.themoviedb.org/t/p/w1280/7SAp9DBEJNA3gXuQtum3u2SffQa.jpg"
   />
 </div>

 <!-- card info div -->
 <div class="favourite-movie-info">
   <h3 class="p-2">Spiderman: Far From Home (2021)</h3>
   <h4 class="p-2"><i class="fa-solid fa-hourglass"></i> 90mins</h4>
   <div class="my-3">
     <button class="is-fullwidth button is-danger">Delete</button>
   </div>
 </div>
</div>`;
  $("#favourites-container").append(movie);
  // paste the HTML code and append to favouritesContainer
};

const renderFavouriteMovies = (movies) => {
  console.log(movies);
  // map through movies and construct a movie cards array
  const newMovies = newMovies.map((movies) => {
    return newMovies;
  });

  // convert array to string
  newMovies.toString();

  // append to the parent
  $("#favourites-container").append(newMovies);
};

//code to execute when ready
const onFavouritesReady = () => {
  handleNavBarToggle();
  // Get all movies from LS (movies)
  const movies = readFromLocalStorage("favouriteMovies", []);
  console.log(movies);
  // if movies is an empty array render alert
  if (movies.length === 0) {
    renderNotification();
  } else {
    renderFavouriteMovies(movies);
  }
  // if movies is not empty then call renderFavouriteMovies(movies)
  if (movies.length > 0) {
    renderFavouriteMovies(movies);
  }
};

//check if document is ready
$(document).ready(onFavouritesReady);
