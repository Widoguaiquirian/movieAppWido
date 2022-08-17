'use strict';
// ! *********** FOR LESSONS NAMES *********** //
// ? *********** FOR REGULAR COMMENTS *********** //
const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=cf389d516c632728e210b7acf88d9749&page=1';

const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';

const SEARCH_URL = 'https://api.themoviedb.org/3/search/movie?api_key=cf389d516c632728e210b7acf88d9749&query="';

const form = document.getElementById('form');
const search = document.querySelector('.search');
const main = document.querySelector('.main');
//Get initial movies

getMovies(API_URL);

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();

  showMovies(data.results);
}

function showMovies(movies) {
  main.innerHTML = '';

  movies.forEach(function (movie) {
    const { title, poster_path, vote_average, overview, release_date } = movie;

    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');

    movieEl.innerHTML = `
    <time class="release">${release_date}</time>
    <img src="${IMG_PATH + poster_path}" alt="${title}" />
    <div class="movie-info">
      <h3>${title}</h3>
      <span class="${getClassByRate(vote_average)}">${vote_average}</span>
    </div>
    <div class="overview">
      <h3>Overview</h3>
    ${overview}
    </div>

    `;

    main.appendChild(movieEl);
  });
}

function getClassByRate(vote) {
  if (vote >= 8) {
    return 'green';
  } else if (vote >= 5) {
    return 'orange';
  } else {
    return 'red';
  }
}

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const searchTerm = search.value;
  if (searchTerm && searchTerm !== '') {
    getMovies(SEARCH_URL + searchTerm);

    search.value = '';
  } else {
    window.location.reload();
  }
});
