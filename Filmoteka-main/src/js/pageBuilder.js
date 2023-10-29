import { fetchGenreList } from './fetchGenreList';
import { handleResponse } from './galleryBuilder';
import { fetchPopularMovies } from './fetchMovieApi';

// Funcție pentru popularea paginii in main
// Funcție pentru popularea paginii în main
const showPage = async (page, isSearch = false, searchQuery = '') => {
  try {
    const genreList = await fetchGenreList();
    let response;

    if (isSearch) {
      response = await fetchMovies(searchQuery, page);
      handleResponse(response, true, genreList); // Se șterge conținutul galeriei când se face o căutare
    } else {
      response = await fetchPopularMovies(page);
      handleResponse(response, page === 1, genreList); // Se menține conținutul existent al galeriei pentru paginile următoare
    }
  } catch (error) {
    console.error('Error', error);
  }
};

export { showPage };
