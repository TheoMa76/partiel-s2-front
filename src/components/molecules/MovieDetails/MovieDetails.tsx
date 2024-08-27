import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Card from '../Containers/Card/Card';
import Reviews from '../Reviews/Reviews';

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
      {movie && (
        <div className="flex flex-col items-center">
          <Card className="max-w-4xl bg-gray-800 p-6 mb-8 shadow-lg rounded-lg hover:scale-105 transition-transform duration-300">
            <h2 className="text-3xl font-bold mb-4 text-center">{movie.title}</h2>
            <div className="flex flex-col items-start md:items-center">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={`${movie.title} Affiche`}
                className="w-auto h-auto rounded-md mb-4 md:mb-0 md:mr-6 object-cover"
              />
              <div className="flex-1">
                <p className="mb-2 text-lg"><strong>Date de sortie :</strong> {movie.release_date}</p>
                <p className="mb-2 text-lg"><strong>Slogan :</strong> {movie.tagline}</p>
                <p className="mb-2 text-lg"><strong>Note moyenne :</strong> {movie.vote_average}</p>
                <p className="mb-2 text-lg"><strong>Durée :</strong> {movie.runtime} minutes</p>
                <p className="mb-2 text-lg"><strong>Statut :</strong> {movie.status}</p>
                <p className="mb-2 text-lg"><strong>Budget :</strong> ${movie.budget.toLocaleString()}</p>
                <p className="mb-2 text-lg"><strong>Recettes :</strong> ${movie.revenue.toLocaleString()}</p>
                <p className="mb-4 text-lg"><strong>Description :</strong> {movie.overview}</p>
                <p className="mb-2 text-lg"><strong>Genres :</strong> {movie.genres.map((genre: any) => genre.name).join(', ')}</p>
                {movie.belongs_to_collection && (
                  <div className="mt-8 text-center">
                    <p className="mb-2 text-lg"><strong>Partie de la collection :</strong> {movie.belongs_to_collection.name}</p>
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.belongs_to_collection.poster_path}`}
                      alt={`${movie.belongs_to_collection.name} Affiche`}
                      className="w-80 h-auto mx-auto rounded-md object-cover"
                    />
                  </div>
                )}
                <p className="mb-2 text-lg"><strong>Compagnies de production :</strong></p>
                <ul className="list-disc pl-5">
                  {movie.production_companies.map((company: any) => (
                    <li key={company.id} className="flex items-center mb-2">
                      {company.logo_path && (
                        <img
                          src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                          alt={`${company.name} Logo`}
                          className="inline-block w-12 h-auto mr-2"
                        />
                      )}
                      <span>{company.name} ({company.origin_country})</span>
                    </li>
                  ))}
                </ul>
                <p className="mb-2 text-lg"><strong>Langue originale :</strong> {movie.original_language}</p>
                <p className="mb-2 text-lg"><strong>Page d'accueil :</strong> <a href={movie.homepage} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{movie.homepage}</a></p>
                <p className="mb-2 text-lg"><strong>ID IMDB :</strong> <a href={`https://www.imdb.com/title/${movie.imdb_id}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{movie.imdb_id}</a></p>
              </div>
            </div>
          </Card>
          <Reviews movieId={movieId} />
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
