//variable to store the API key
const apiKey = "638741ded1msh07bc6f796714e78p1d32e2jsnea59f0e47a93";
//basic search url
const baseURL = "https://online-movie-database.p.rapidapi.com/title/find?q=";
const searchButton = $("#search-button");

let mockData = false;

//create an empty object
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "online-movie-database.p.rapidapi.com",
    "X-RapidAPI-Key": apiKey,
  },
};

//the function for the api call
const fetchData = async (url, options = {}) => {
  try {
    if (mockData) {
      const response = await fetch("./assets/data/dataReponseYear.json", options);
      const data = await response.json();
      return data;
    } else {
      const response = await fetch(url, options);

      if (response.ok) {
        const data = await response.json();

        return data;
      } else {
        throw new Error("Failed to fetch data");
      }
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

//function triggered by search click
const processMovieSearch = async (event) => {
  event.preventDefault();
  //target the search field
  const searchFieldValue = $("#search-field").val();

  let url = `${baseURL}${searchFieldValue}`;

  //call the api
  const movies = await fetchData(url, options);

  renderMovieCards(movies.results);
};

const renderMovieCards = (movies) => {
  const movieCards = movies
    .slice(0, 8)
    .map((movie) => {
      const extraDetails = movie.runningTimeInMinutes
        ? `Run time: ${movie.runningTimeInMinutes}`
        : "";
      const movieCard = `<div class="column is-one-quarter is-clickable project">
        <img data-movieCard = "${movie.id}" class="movie-card-image project__image"
          src="${movie.image.url}" alt="${movie.title ? movie.title : movie.legacyNameText}
        />
        <div class="project__detail">
          <h3 class="project__title">${movie.title ? movie.title : movie.legacyNameText} (${
        movie.year ? movie.year : movie.knownFor[0].year
      })</h3>
          <h4 class="project__category">${extraDetails}</h4>
        </div>
      </div>`;

      return movieCard;
    })
    .join("");

  $("#search-results-container").empty();

  $("#search-results-container").append(movieCards);
};

const handleNavBarToggle = () => {
  const navBurgerBtn = $(".navbar-burger");

  const toggleNavBar = () => {
    // get the nav container id (the div to show and hide)
    const navContainerId = navBurgerBtn.attr("data-target");
    const navContainer = $(`#${navContainerId}`);

    // toggle the class for hamburger button to show/hide
    navBurgerBtn.toggleClass("is-active");

    // toggle the class for nav container to show/hide
    navContainer.toggleClass("is-active");
  };

  navBurgerBtn.click(toggleNavBar);
};

//process the selected movie card
const checkMovieCard = (event) => {
  //target the target id
  const getMovieCardId = event.target.getAttribute("data-movieCard");
  console.log(getMovieCardId);
};

//will create an event listener for a search button
// const generateEventListener = (varID, triggerFunction) => {
//   //target the search
//   const searchButton = $(`${varID}`);
//   // add the event listener
//   searchButton.on("click", triggerFunction);
// };

//code to execute when ready
const onReady = () => {
  //target the search button
  searchButton.on("click", processMovieSearch);
  //handle the navbar
  handleNavBarToggle();
  //add an event listener to the movie cards container
  $("#search-results-container").on("click", checkMovieCard);
};

//check if document is ready
$(document).ready(onReady);

// $(document).ready(() => {
//   handleNavBarToggle();
// });
