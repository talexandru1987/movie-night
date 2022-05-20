//variable to store the API key
const apiKey = "ab8ecba8f8msh3f5afdafcf2d348p1b6b52jsne7b90c6a16b4";
//basic search url
const baseURL = "https://online-movie-database.p.rapidapi.com/title/find?q=";
const searchButton = $("#search-button");
let mockData = false;

const readFromLocalStorage = (key, defaultValue) => {
  // get from LS using key name
  const dataFromLS = localStorage.getItem(key);

  // parse data from LS
  const parsedData = JSON.parse(dataFromLS);

  if (parsedData) {
    return parsedData;
  } else {
    return defaultValue;
  }
};

const writeToLocalStorage = (key, value) => {
  // convert value to string
  const stringifiedValue = JSON.stringify(value);

  // set stringified value to LS for key name
  localStorage.setItem(key, stringifiedValue);
};

//create the options for the fetch request
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
      const response = await fetch(
        "./assets/data/dataReponseYear.json",
        options
      );
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
  const filteredMovies = movies.results.filter((movie) =>
    movie.id.includes("title")
  );
  console.log(filteredMovies);

  renderMovieCards(filteredMovies);
};

const renderMovieCards = (movies) => {
  //empty the container
  $("#search-results-container").empty();
  const searchHeader = `<div class="column is-full">
  <p class="title is-1 has-text-white">Search Results</p>
</div>`;

  //append to container
  $("#search-results-container").append(searchHeader);

  const movieCards = movies
    .slice(0, 8)
    .map((movie) => {
      const extraDetails = movie.runningTimeInMinutes
        ? `Run time: ${movie.runningTimeInMinutes}`
        : "";
      const movieCard = `<div class="column is-one-quarter is-clickable project">
        <img data-movieCard = "${
          movie.id
        }" class="movie-card-image project__image"
          src="${movie?.image?.url}" alt="${
        movie?.title ? movie?.title : movie?.legacyNameText
      }"
        />
        <div class="project__detail">
          <h3 class="project__title">${
            movie.title ? movie.title : movie.legacyNameText
          } (${movie.year ? movie.year : movie?.knownFor[0].year})</h3>
          <h4 class="project__category">${extraDetails}</h4>
        </div>
      </div>`;

      return movieCard;
    })
    .join("");

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
  const getMovieCardId = $(event.target).attr("data-movieCard").split("/")[2];
  //write to local storage
  //writeToLocalStorage("favoriteMovie", getMovieCardId);
  //load the details page
  window.location.replace(`./movie.html?id=${getMovieCardId}`);
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

// JS for the trailer modal on movie package

// const trailerButton = $(".trailer-button");

document.addEventListener("DOMContentLoaded", () => {
  // Functions to open and close a modal
  function openModal($el) {
    $el.classList.add("is-active");
  }
  function closeModal($el) {
    $el.classList.remove("is-active");
  }
  function closeAllModals() {
    (document.querySelectorAll(".modal") || []).forEach(($modal) => {
      closeModal($modal);
    });
  }
  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll(".js-modal-trigger") || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);
    $trigger.addEventListener("click", () => {
      openModal($target);
    });
  });
  // Add a click event on various child elements to close the parent modal
  (
    document.querySelectorAll(
      ".modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button"
    ) || []
  ).forEach(($close) => {
    const $target = $close.closest(".modal");
    $close.addEventListener("click", () => {
      closeModal($target);
    });
  });
  // Add a keyboard event to close all modals
  document.addEventListener("keydown", (event) => {
    const e = event || window.event;
    if (e.keyCode === 27) {
      // Escape key
      closeAllModals();
    }
  });
});
