let search = document.querySelector("#search");

search.addEventListener("keyup", (e) => {
  // console.log(e);
  let searchText = e.target.value;
  console.log(searchText);
  SearchMovies(searchText);
  //when key pressed hide text from DOM
  let formText = document.getElementById("divBlock");
  formText.style.display = "none";
  search.classList.add("afterkeyPress");
  document.querySelector("#formBlock").classList.add("afterKey_formBlock");
});

// speach Recognition api
let speachSearch = document.getElementById("speechIcon");
speachSearch.addEventListener("click", () => {
  let formText = document.getElementById("divBlock");
  formText.style.display = "none";
  search.classList.add("afterkeyPress");
  document.querySelector("#formBlock").classList.add("afterkey_formBlock");

  window.SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognition = new SpeechRecognition();
  let p = document.createElement("p");
  recognition.interimResults = true;

  recognition.addEventListener("result", (e) => {
    let transcript = [...e.results]
      .map((result) => result[0])
      .map((result) => result.transcript)
      .join("");

    search.value = transcript;
    if (e.results[0].isFinal) {
      p = document.createElement("p");
      p.innerHTML = transcript;
      let searchText = transcript;
      SearchMovies(searchText);
    }
  });
  recognition.start();
});

function SearchMovies(searchText) {
  // console.log(searchText);
  // console.log(searchText);
  const imdbAPi = `http://www.omdbapi.com/?s=${searchText}&apikey=7ec67373`;
  window
    .fetch(imdbAPi)
    .then((data) => {
      data
        .json()
        .then((movieData) => {
          let movies = movieData.Search;
          let output = [];
          for (let movie of movies) {
            let defaultImg =
              movie.Poster === "N/A"
                ? "https://eticketsolutions.com/themes/e-ticket/img/slider/theater.jpg"
                : movie.Poster;
            output += `
                        <div>
                        <img src="${defaultImg}"/>
                        <h1>${movie.Title}</h1>
                        <p>${movie.Year}</p>
                        <a href="http://www.imdb.com/title/${movie.imdbID}/" target="_blank">Movie Detail</a>
                        
                        </div>
                        `;
          }
          // let allImages = document.images;
          // [...allImages].forEach((img) => {
          //   console.log(img);
          //   if (img.src === "N/A") {
          //     console.log("NOT AVAILABLE");
          //   }
          // });
          document.getElementById("template").innerHTML = output;
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}
