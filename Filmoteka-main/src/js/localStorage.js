// Funcția pentru a obține datele din local storage
function getFromLocalStorage(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}

// Funcția pentru a salva un film în local storage
function saveToLocalStorage(key, movieId) {
  const movies = getFromLocalStorage(key);
  movies.push(movieId);
  localStorage.setItem(key, JSON.stringify(movies));
}

// Funcția pentru a elimina un film din local storage
function removeFromLocalStorage(key, movieId) {
  const movies = getFromLocalStorage(key);
  const updatedMovies = movies.filter(id => id !== movieId);
  localStorage.setItem(key, JSON.stringify(updatedMovies));
}

export { saveToLocalStorage, removeFromLocalStorage, getFromLocalStorage };
