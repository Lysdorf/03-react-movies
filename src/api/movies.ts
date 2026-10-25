
import type { Movie } from '../types/movie';

export async function searchMovies(query: string): Promise<Movie[]> {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch movies');
  }

  const data = await response.json();

  return data.results;
}
