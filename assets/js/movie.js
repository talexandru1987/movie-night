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
      const response = await fetch("./assets/data/dataReponseYear.json", options);
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

const getArrayFromString = (string) => {
  //split into separate tags
  const stringArray = string.split(",");
  //create the p tags for each element in the map
  const tags = stringArray.map(
    (
      tag
    ) => `<p class="tag is-dark is-large is-info column is-two-thirds title is-3 has-text-white" 
  id="director">${tag.trim()}</p>`
  );
  return tags.join("");
};

//render the rating cards
const renderMovieRatings = (string) => {
  //create the p tags for each element in the map
  console.log(string);
  console.log(string[0]);
  const tags = string.map(
    (tag) => ` <div class="tile is-parent is-shady">
    <article class="tile is-child notification message-header">
        <p class="title is-6 has-text-white is-spaced has-text-centered is-flex is-align-content-center is-justify-content-center">${tag.Source}</p>
        <p class="title is-1 has-text-white is-spaced has-text-centered is-flex is-align-content-center is-justify-content-center" id="movie-rating">${tag.Value}</p>
    </article>
</div>`
  );

  return tags.join("");
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
          src="${movie?.Poster}"
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
        <div class="buttons are-large is-spaced is-responsive column is-full" >
                        
            <!-- Trailer modal button - Triggers a popup - code for this can be found in index.js -->
            <!-- Create new ID's if required for JavaScript / youtube API -->
            <button class="js-modal-trigger button is-spaced is-halfwidth trailer-button" id="movie-page-hero-btn" data-target="modal-js-example">
                View Trailer
            </button>

            <!-- Add to schedule button - to be hooked up to the calendar once its complete -->
            <button class="button is-spaced is-halfwidth" id="movie-page-hero-btn">Add to Schedule</button>

            <!-- Add to favourites button - to be hooked up to the favourites page -->
            <button class="button is-spaced is-halfwidth" id="movie-page-hero-btn">Add to Favourites</button>

        </div>
  

      <!-- Modal - hidden by default - shows youtube trailer in a popup when clicked -->
      <!-- need to hook up the youtube api to this  -->
          </div>
          <div id="modal-js-example" class="modal">
          <div class="modal-background"></div>

          <div class="modal-content">
          <div>
              <p>Movie trailer from the youtube API needs to render here</p>
              <!-- Your content - Youtube trailer pulled from the youtube API goes below here - Iframe used as an example-->
              <iframe width="560" height="315" src="https://www.youtube.com/embed/Nt9L1jCKGnE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
          </div>

          <!-- close modal popup button -->
          <button class="modal-close is-large" aria-label="close"></button>
      </div>  
   
  </section>
  
  <section class="section container m-auto">
  <hr>

  <!-- Country info goes here -->
  <div class="columns is-full tags">
      <h1 class="column title is-3 has-text-white">Country:</h1>

      ${getArrayFromString(movie.Country)}
      
  </div>  

  <!-- Release date information section -->
  <div class="columns is-full is-spaced tags mt-5 is-flex-wrap-wrap">
      <h1 class="column title is-3 has-text-white">Release Date:</h1>
      <p class="tag is-dark is-large is-info column is-two-thirds title is-3 has-text-white" 
      id="director">${movie.Released}</p>
      </div>

      <!-- Release date information section -->
      <div class="columns is-full is-spaced tags mt-5 is-flex-wrap-wrap">
          <h1 class="column title is-3 has-text-white">Duration:</h1>
          <p class="tag is-dark is-large is-info column is-two-thirds title is-3 has-text-white" 
          id="director">${movie.Runtime}</p>
          </div>


  <!-- Genre information section -->
  <div class="columns is-full tags">
      <h1 class="column title is-3 has-text-white">Genre:</h1>

  <!-- Below is what we want to populate with director info pulled from the imdb API -->
  
       ${getArrayFromString(movie.Genre)}
  </div>  

  <!-- Director information section -->
  <div class="columns is-full tags">
      <h1 class="column title is-3 has-text-white">Director:</h1>

  <!-- Below is what we want to populate with director info pulled from the imdb API -->

      ${getArrayFromString(movie.Director)}
  </div>  


  <!-- Film actors information section -->
  <div class="columns is-full is-spaced tags mt-5 is-flex-wrap-wrap">
      <h1 class="column title is-3 has-text-white">Cast:</h1>

  <!-- Below is what we want to populate with actor info pulled from the imdb API -->
     
      ${getArrayFromString(movie.Actors)}
    

  </div> 
  <hr>
  </section>

  <!-- Tiles section starts here -->
  <section>
  <h1 id="movie-title" class="title is-1 has-text-white is-spaced has-text-centered"> RATINGS</h1>
      <div class="sandbox container">
          <div class="tile is-ancestor ">
          ${renderMovieRatings(movie.Ratings)}
    
       
           
          </div>

          <hr>
  `;

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
  getArrayFromString(movie.Actors);
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
