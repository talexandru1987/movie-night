//variable to store the API key
const apiKey = "638741ded1msh07bc6f796714e78p1d32e2jsnea59f0e47a93";
//basic search url
const baseURL = "https://online-movie-database.p.rapidapi.com/title/find?q=";

let mockData = false;

//read from local storage
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

//create the options for the fetch request
const options = {
  method: "GET",
  // headers: {
  //   "X-RapidAPI-Host": "online-movie-database.p.rapidapi.com",
  //   "X-RapidAPI-Key": apiKey,
  // },
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
        console.log(data);

        return data;
      } else {
        throw new Error("Failed to fetch data");
      }
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

//write to local storage
const writeToLocalStorage = (key, value) => {
  // convert value to string
  const stringifiedValue = JSON.stringify(value);

  // set stringified value to LS for key name
  localStorage.setItem(key, stringifiedValue);
};

const renderMovieInfo = (movie) => {
  const movieContainer = `<section class="is-flex">
    <div
      class="columns is-half-desktop is-full-mobile is-half-tablet is-half-desktop is-half-widescreen is-half-fullhd"
    >
      <!-- Movie poster image - to be pulled from the imdb api-->

      <div
        class="column is-half-desktop is-full-mobile is-half-tablet is-half-desktop is-half-widescreen is-half-fullhd is-justify-content-flex-start"
      >
        <!-- <div class="column"> -->
        <img
          class="movie-image"
          src="${movie.Poster}"
        />
      </div>

      <!-- Movie Title and Synopisis - to be pulled from the imdb api-->
      <div
        class="has-text-centered column is-half is-spaced message-header is-justify-content-flex-end"
      >
        <!-- <div class="column is-half-desktop is-spaced message-header is-full-mobile is-half-tablet is-half-desktop is-half-widescreen is-half-fullhd"> -->
        <!-- <div class="column is-half"> -->

        <div>
          <h1 id="movie-title" class="title is-1 has-text-white is-spaced">
            ${movie.Title}
          </h1>
          <h1 id="movie-synopsis" class="subtitle is-3 has-text-white">
          ${movie.Plot}
           
          </h1>
        </div>

        <!-- Buttons -->
      </div>

      <!-- Modal - hidden by default - shows youtube trailer in a popup when clicked -->
      <!-- need to hook up the youtube api to this  -->
    </div>
  </section>`;

  $("#main-container").append(movieContainer);
};

//code to execute when ready
const onReady = async () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get("id");

  //create the url
  let url = `https://www.omdbapi.com/?i=${id}&plot=full&apikey=ae0076fc`;

  //call the api
  const movie = await fetchData(url, options);
  console.log(movie);

  renderMovieInfo(movie);
};

//check if document is ready
$(document).ready(onReady);

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