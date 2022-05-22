function loadClient() {
  gapi.client.setApiKey("AIzaSyB1-Af9cB00krXwvloIk5oFwU0yQ1B5YoY");
  return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest").then(
    function () {
      console.log("GAPI client loaded for API");
    },
    function (err) {
      console.error("Error loading GAPI client for API", err);
    }
  );
}

// Need to do something with this function to get an embed player to render, and to get it to read the URL generated from execute()
const renderYoutubeTrailer = async () => {
  const searchTerm = `${movie.Title} ${movie.Year} trailer`;
  const data = await execute(searchTerm);

  return searchTerm;
};

// Make sure the client is loaded and sign-in is complete before calling this method.
function execute(searchTerm) {
  return gapi.client.youtube.search

    .list({
      part: ["snippet"],
      q: `${movie.Title} ${movie.Year} HD trailer`,
      maxResults: 1,
    })
    .then(
      function (response) {
        const trailerUrl = `https://www.youtube.com/watch?v=${response.result.items[0].id.videoId}`;
        return response.result.items[0].id.videoId;
      },
      function (err) {
        console.error("Execute error", err);
      }
    );
}
gapi.load("client");
