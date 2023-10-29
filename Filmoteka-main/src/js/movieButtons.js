import {
  saveToLocalStorage,
  removeFromLocalStorage,
  getFromLocalStorage,
} from './localStorage';
import { globalMovieId } from './modalOpen';

// Modific numele butoanelor atunci când sunt selectate
const watchedButton = document.getElementById('watched-button');
const queueButton = document.getElementById('queue-button');

let watchedClicked = false;
let queueClicked = false;

watchedButton.addEventListener('click', () => {
  if (!watchedClicked) {
    watchedButton.innerText = 'Watched';
    watchedClicked = true;
    // Adăugați filmul la "Watched" în local storage
    saveToLocalStorage('watchedMovies', globalMovieId);
  } else {
    watchedButton.innerText = 'Add to Watched';
    watchedClicked = false;
    // Eliminați filmul din "Watched" în local storage
    removeFromLocalStorage('watchedMovies', globalMovieId);
  }
});

queueButton.addEventListener('click', () => {
  if (!queueClicked) {
    queueButton.innerText = 'Queued';
    queueClicked = true;
    // Adăugați filmul la "Queue" în local storage
    saveToLocalStorage('queuedMovies', globalMovieId);
  } else {
    queueButton.innerText = 'Add to Queue';
    queueClicked = false;
    // Eliminați filmul din "Queue" în local storage
    removeFromLocalStorage('queuedMovies', globalMovieId);
  }
});
export { watchedButton, queueButton };
