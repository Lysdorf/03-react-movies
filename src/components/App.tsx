import SearchBar from './SearchBar/SearchBar';
import { fetchMovies } from '../services/movieService';
import type { Movie } from '../types/movie';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import MovieGrid from './MovieGrid/MovieGrid';
import Loader from './Loader/Loader';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import MovieModal from './MovieModal/MovieModal';

export function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSearch = async (value: string) => {
    setSelectedMovie(null);
    setMovies([]);
    setIsError(false);
    setIsLoading(true);

    try {
      const movies = await fetchMovies(value);
      setMovies(movies);
      if (movies.length === 0) {
        toast.error('No movies found for your request.');
      }
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <>
      <Toaster />
      <SearchBar onSubmit={handleSearch} />
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}


      {isLoading ? (
        <Loader />
      ) : isError ? (
        <ErrorMessage />
      ) : (
        movies.length > 0 && (
          <MovieGrid
            movies={movies}
            onSelect={(movie) => setSelectedMovie(movie)}
          />
        )
      )}
    </>
  );
}

export default App;