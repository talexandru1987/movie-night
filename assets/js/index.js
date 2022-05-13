//variable to store the API key
const apiKey = "638741ded1msh07bc6f796714e78p1d32e2jsnea59f0e47a93";
//basic search url
let url;

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
    const response = await fetch(url, options);

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data;
    } else {
      throw new Error("Failed to fetch data");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

//function to check the movie radio buttons
const movieRadioButtons = () => {
  //target the title radio button
  const defaultTitle = $("#title-radio");

  // target the year radio button
  const yearButton = $("#year-radio");

  //check witch button is selected
  if (defaultTitle.is(":checked")) {
    console.log("Title  radio selected");
    return "title";
  } else {
    console.log("Year radio selected");
    return "year";
  }
};

fetch(
  "https://ott-details.p.rapidapi.com/advancedsearch?start_year=2010&end_year=2010&min_imdb=6&max_imdb=7.8&type=movie&sort=latest&page=1",
  options
)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));

//function triggered by search click
const processMovieSearch = () => {
  //target the search field
  const searchFieldValue = $("#search-field").value;

  //which radio button was selected
  const radioButtonValue = movieRadioButtons();

  if (radioButtonValue === "title") {
    //make and API call for tile
    //construct api
    url = `https://ott-details.p.rapidapi.com/search?title=${searchFieldValue}&page=1`;

    //call the api
    fetchData(url, options);
  } else {
    //make an API call for year
    //construct api
    url = `https://ott-details.p.rapidapi.com/advancedsearch?start_year=${searchFieldValue}&end_year=${searchFieldValue}&min_imdb=6&max_imdb=7.8&type=movie&sort=latest&page=1`;

    //call the api
    fetchData(url, options);
  }
};

//will create an event listener for a search bu
const generateEventListener = (varID, triggerFunction) => {
  //target the search
  const searchButton = $(`${varID}`);
  // add the event listener
  searchButton.on("click", triggerFunction);
};

//code to execute when ready
const onReady = () => {
  generateEventListener("#search-button", processMovieSearch);
};

//check if document is ready
// $(document).ready(onReady);
// const handleNavBarToggle = () => {
//   const navBurgerBtn = $(".navbar-burger");

//   const toggleNavBar = () => {
//     // get the nav container id (the div to show and hide)
//     const navContainerId = navBurgerBtn.attr("data-target");
//     const navContainer = $(`#${navContainerId}`);

//     // toggle the class for hamburger button to show/hide
//     navBurgerBtn.toggleClass("is-active");

//     // toggle the class for nav container to show/hide
//     navContainer.toggleClass("is-active");
//   };

//   navBurgerBtn.click(toggleNavBar);
// };

// $(document).ready(() => {
//   handleNavBarToggle();
// });
