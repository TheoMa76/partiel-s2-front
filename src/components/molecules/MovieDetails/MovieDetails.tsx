import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Reviews from '../Reviews/Reviews';
import MovieCard from '../Containers/Card/MovieCard';

interface MovieDetailsProps {}

const MovieDetails: React.FC<MovieDetailsProps> = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const apiUrl = `${process.env.REACT_APP_API_URL}3/movie/${movieId}?language=fr-FR`;
      const bearerToken = process.env.REACT_APP_BEARER_TOKEN;

      try {
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch movie details');
        }

        const data = await response.json();
        setMovie(data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch movie details');
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  const getGenreNames = (genreIds: number[]) => {
    if (!movie || !movie.genres) return '';
    return movie.genres
      .filter((genre: any) => genreIds.includes(genre.id))
      .map((genre: any) => genre.name)
      .join(', ');
  };

  if (loading) return <p className="text-center">Chargement...</p>;
  if (error) return <p className="text-center text-red-500">Erreur : {error}</p>;

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <button
        onClick={handleBackClick}
        className="px-4 py-2 mx-1 bg-gray-600 text-white rounded hover:bg-gray-500"
      >
        Retour à l'accueil
      </button>
      <div className='my-7'>
      {movie && (
        <MovieCard
          movie={movie}
          getGenreNames={getGenreNames}
          disableLink={true}
        />
      )}
      </div>
      <Reviews movieId={movieId} />
    </div>
  );
};

export default MovieDetails;
