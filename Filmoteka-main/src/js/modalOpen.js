import { fetchData } from './apiUtils';
import { getFromLocalStorage } from './localStorage';
import { watchedButton, queueButton } from './movieButtons';

//Salvez ID-ul filmului
let globalMovieId = null;

const openModal = async movieId => {
  try {
    // Obțineți detaliile complete ale filmului utilizând ID-ul
    const movieDetails = await fetchData(`/movie/${movieId}`);
    const modal = document.querySelector('.modal-gallery');
    globalMovieId = movieId;

    // Verificăm dacă filmul este deja adăugat la "Watched" sau "Queue"
    const watchedMovies = getFromLocalStorage('watchedMovies');
    const queuedMovies = getFromLocalStorage('queuedMovies');

    if (watchedMovies.includes(movieId)) {
      watchedButton.innerText = 'Watched';
    } else {
      watchedButton.innerText = 'Add to Watched';
    }

    if (queuedMovies.includes(movieId)) {
      queueButton.innerText = 'Queued';
    } else {
      queueButton.innerText = 'Add to Queue';
    }

    const roundedVoteAverage = parseFloat(movieDetails.vote_average).toFixed(1);
    const roundedPopularity = parseFloat(movieDetails.popularity).toFixed();

    // Obține URL-ul complet pentru poster
    const posterUrl = movieDetails.poster_path
      ? `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`
      : nullPoster;

    // Populez modalul cu detaliile obținute folosind structura HTML specificată
    modal.querySelector('.modal-content').innerHTML = `
    <img src="${posterUrl}" alt="${
      movieDetails.title
    }" class="modal-movie-poster">

      <h3 class="modal-movie-title">Title: ${movieDetails.title}</h3>
      <p class="modal-movie-vote">Vote / Votes: ${roundedVoteAverage} / ${
      movieDetails.vote_count
    }</p>
      <p class="modal-movie-popularity">Popularity: ${roundedPopularity}</p>
      <p class="modal-movie-original-title">Original Title: ${
        movieDetails.original_title
      }</p>
      <p class="modal-movie-genre">Genre: ${movieDetails.genres
        .map(genre => genre.name)
        .join(', ')}</p>
      <p class="modal-movie-overview">Overview: ${movieDetails.overview}</p>
    `;

    // Afisez modalul
    modal.classList.remove('gallery-is-hidden');
  } catch (error) {
    console.error('Error opening modal:', error);
  }
};

export { openModal, globalMovieId };
