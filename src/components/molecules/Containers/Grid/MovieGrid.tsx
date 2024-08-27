import React from 'react';
import MovieCard from '../Card/MovieCard';
import { Movie } from '../../../../type/type';

interface MovieGridProps {
  movies: Movie[];
  getGenreNames: (genreIds: number[]) => string;
  noResults: boolean;
}

const MovieGrid: React.FC<MovieGridProps> = ({ movies, getGenreNames, noResults }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {movies.length > 0 ? (
      movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} getGenreNames={getGenreNames} />
      ))
    ) : !noResults ? (
      <p className="text-center">Chargement...</p>
    ) : null}
  </div>
);

export default MovieGrid;
