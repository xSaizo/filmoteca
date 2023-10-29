import { fetchData } from './apiUtils';




async function displayMoviesBasedOnList(list) {
    const moviesContainer = document.getElementById('my-library');
    const watchedMovies = JSON.parse(localStorage.getItem('watchedMovies')) || [];
    const queuedMovies = JSON.parse(localStorage.getItem('queuedMovies')) || [];
    let moviesToDisplay = [];

    moviesContainer.innerHTML = '';

    if (list === 'queued') {
        moviesToDisplay = queuedMovies;
    } else if (list === 'watched') {
        moviesToDisplay = watchedMovies;
    } else {
     
        moviesToDisplay = watchedMovies.concat(queuedMovies);
    }
    

    if (moviesToDisplay.length === 0) {
        moviesContainer.innerText = 'Nothing saved yet'; // Afișăm mesajul
    } else {
        for (const movieId of moviesToDisplay) {
            const movieDetails = await fetchData(`/movie/${movieId}`);

        const movieElement = document.createElement('div');
        movieElement.innerHTML = `
            <li class="gallery__items" >
                <div class="gallery__items__img">
                    <img src="https://image.tmdb.org/t/p/w500${movieDetails.poster_path}" alt="${movieDetails.poster_path}" loading="lazy" />
                </div>
                <div class="gallery__items__details">
                    <p class="gallery__items__details--title">${movieDetails.title}</p>
                    <p class="gallery__items__details--genres">${movieDetails.genres[0].name}, ${movieDetails.genres[1].name} | <span class="gallery__items__details--year">${movieDetails.release_date.slice(0, 4)}</span></p>
                </div>
            </li>
        `;

        moviesContainer.appendChild(movieElement);
    }
}}

const urlParams = new URLSearchParams(window.location.search);
const list = urlParams.get('list');

// Afișează inițial ambele liste dacă parametrul 'list' lipsește sau nu este corect
displayMoviesBasedOnList(list);



const watchedMoviesButton = document.getElementById('watchedMovies');

watchedMoviesButton.addEventListener('click', function() {
    window.location.href = 'my-library.html?list=watched';

});

const queuedMoviesButton = document.getElementById('queuedMovies');

queuedMoviesButton.addEventListener('click', function() {
    window.location.href = 'my-library.html?list=queued';
   
    
});

