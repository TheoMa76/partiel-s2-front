import React from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';
import { Movie } from '../../../../type/type';
import Note from '../../../atoms/Notes/Note';


interface MovieCardProps {
  movie: Movie;
  getGenreNames: (genreIds: number[]) => string;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, getGenreNames }) => (
  <Link to={`/movie/${movie.id}`} key={movie.id} className="flex flex-col">
    <Card
      title={movie.title}
      className="flex flex-col h-full bg-custom-dark-grey"
      disableHover={false}
    >
      <div className="flex-1 flex flex-col items-center">
        {movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={`${movie.title} Poster`}
            className="mb-4 w-full h-auto object-cover"
          />
        ) : (
          <div className="mb-4 w-full h-auto text-center">
            <p>Affiche non disponible</p>
          </div>
        )}
        <div className="flex-1 flex flex-col justify-between">
          <p className="mb-2">Année de sortie : {new Date(movie.release_date).getFullYear()}</p>
          <p className="mb-2 text-center">{movie.overview}</p>
          <p className="mb-2">Genres : {getGenreNames(movie.genre_ids)}</p>
          <p className="mb-2">Note moyenne : <Note rating={movie.vote_average} /> {movie.vote_average} </p>
        </div>
      </div>
    </Card>
  </Link>
);

export default MovieCard;
