import { getGenres } from './fetchGenreList';
import { clearGallery } from './clearGallery';
import { getGalleryElement } from './clearGallery';
import { openModal } from './modalOpen';

const nullPoster =
  'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg';

// Funcția se ocupă de manipularea răspunsului API și afișarea datelor în galerie.
// ...

const handleResponse = (data, shouldClearGallery = true, genreList) => {
  const galleryElement = getGalleryElement();
  if (!galleryElement) {
    return;
  }

  if (shouldClearGallery) {
    clearGallery();
  }

  const markup = data.results
    .map((result, index) => markupGalleryItem(result, genreList))
    .join('');

  galleryElement.insertAdjacentHTML('beforeend', markup);

  // Adăugați evenimentul de ascultare pentru fiecare element din galerie
  const galleryItems = galleryElement.querySelectorAll('.gallery__items');
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const movieId = item.getAttribute('data-id');
      openModal(movieId);
    });
  });
};

// Funcția generează HTML pentru fiecare element din galerie.
const markupGalleryItem = (result, genreList) => {
  const { title, release_date, poster_path, genre_ids, id } = result;
  const coverUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : nullPoster;
  const genres = genre_ids ? getGenres(genre_ids, genreList) : ['Unknown'];
  const year = release_date ? release_date.slice(0, 4) : 'N/A';

  return `
    <li class="gallery__items" data-id="${id}">
      <div class="gallery__items__img">
        <img src="${coverUrl}" alt="${title}" loading="lazy" />
      </div>
      <div class="gallery__items__details">
        <p class="gallery__items__details--title">${title}</p>
        <p class="gallery__items__details--genres">${genres.join(
          ', '
        )} | <span class="gallery__items__details--year">${year}</span>
      </p>
      </div>
    </li>
  `;
};

export { handleResponse, getGalleryElement, nullPoster };
