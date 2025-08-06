const STORAGE_KEY = "watchedMovies";

export function getWatched(): number[] {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
}

export function markWatched(id: number) {
  const watched = getWatched();
  if (!watched.includes(id)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...watched, id]));
  } else {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...watched.filter(watchedId => watchedId !== id)]));
  }
}

export function isWatched(id: number): boolean {
  return getWatched().includes(id);
}