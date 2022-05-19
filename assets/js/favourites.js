function handleFavClick() => {
  console.log("ahdbjahdbjahdsha");

  //        ----------- SAVE THIS MOVIE TO LOCAL STORAGE  ----------------------------- 
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

  //function to render the favourite cards onto the favourites page
  renderFavCards () => {
    //render the faveCard movie div & delete button
    const faveMovieCard =  `    <div
    id="search-results-container"
    class="columns is-multiline p-0 pt-6 last"
  >
    <div class="column is-full">
      <div class="column is-one-quarter is-clickable project">
        <img data-movieCard = "${movie.id}"
          class="movie-card-image project__image"
          src="${movie?.image?.url}" alt="${movie.title? movie.title : movie.legacyNameText}"
        />

        <div class="project__detail">
          <h3 class="project__title">${movie.title ? movie.title : movie.legacyNameText}</h3>
          <h4 class="project__category">${extraDetails}</h4>
          <button type="onclick" id="btn"><i class="fa-solid fa-circle-minus">Delete</i></button>
        </div>
      </div> 
      
    </div>
  </div>`;

      //append to container
      $("#fave-container").append(faveMovieCard);

      //sort out alphabetically from the object array in LS
      const movie = []
      movie.sort();
      return movie;

  };

  //when the cards show up we can have the option to delete 
  $("#btn").on("click").remove(faveMovieCard);
};



//write to local storage
const writeToLocalStorage = (key, value) => {
  // convert value to string
  const stringifiedValue = JSON.stringify(value);

  // set stringified value to LS for key name
  localStorage.setItem(key, stringifiedValue);
};



//code to execute when ready
const onReady = () => {
  //target the heart button
  .on("click", handleFavClick);
  //handle the navbar
  handleNavBarToggle();
  //add an event listener to the movie cards container
  $("#search-results-container").on("click", checkMovieCard);
};

//check if document is ready
$(document).ready(onReady);