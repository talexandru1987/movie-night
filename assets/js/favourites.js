const favouritesContainer = $("#favourites-container");

const renderNotification = () => {
  // paste the HTML code and append to favouritesContainer
};

const renderFavouriteMovies = (movies) => {
  // map through movies and construct a movie cards array
  // convert array to string
  // append to the parent
};

//code to execute when ready
const onReady = () => {
  handleNavBarToggle();
  // Get all movies from LS (movies)
  const movies = readFromLocalStorage("favouriteMovies", []);
  // if movies is an empty array render alert
  if (movies.length === 0) {
    renderNotification();
  } else {
    renderFavouriteMovies(movies);
  }
  // if movies is not empty then call renderFavouriteMovies(movies)
};

//check if document is ready
$(document).ready(onReady);
