//variable to store the API key
const apiKey = "b7166079e1mshf482422d9a32c25p1d1b0djsn3ea8fbf64317";
//basic search url
const baseURL = "https://ott-details.p.rapidapi.com/";
const searchButton = $("#search-button");

let mockData = true;

//create an empty object
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "ott-details.p.rapidapi.com",
    "X-RapidAPI-Key": apiKey,
  },
};

//the function for the api call
const fetchData = async (url, options = {}) => {
  try {
    if (mockData) {
      const response = await fetch(
        "/assets/data/dataReponseYear.json",
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
  console.log("process movie");
  //target the search field
  const searchFieldValue = $("#search-field").val();
  const defaultTitle = $('input[name="answer"]:checked').val();
  console.log(defaultTitle, searchFieldValue);
  let url;
  //which radio button was selected
  // const radioButtonValue = movieRadioButtons();
  // if the search is empty otr not

  if (defaultTitle === "title") {
    //make and API call for tile
    //construct api
    url = `${baseURL}search?title=${searchFieldValue}&page=1`;
  } else {
    //make an API call for year
    //construct api
    url = `${baseURL}advancedsearch?start_year=${searchFieldValue}&end_year=${searchFieldValue}&min_imdb=6&max_imdb=7.8&type=movie&sort=latest&page=1`;

    //call the api
  }

  //call the api
  const movies = await fetchData(url, options);
  console.log(movies);
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

//will create an event listener for a search button
const generateEventListener = (varID, triggerFunction) => {
  //target the search
  const searchButton = $(`${varID}`);
  // add the event listener
  searchButton.on("click", triggerFunction);
};

//code to execute when ready
const onReady = () => {
  // generateEventListener("#search-button", processMovieSearch);
  searchButton.on("click", processMovieSearch);
  handleNavBarToggle();
};

//check if document is ready
$(document).ready(onReady);

// $(document).ready(() => {
//   handleNavBarToggle();
// });
