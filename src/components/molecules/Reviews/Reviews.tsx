import React, { useEffect, useState } from 'react';

interface Review {
  id: string;
  author: string;
  content: string;
  url: string;
}

interface ReviewsProps {
  movieId: string | undefined;
}

const Reviews: React.FC<ReviewsProps> = ({ movieId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const [expandedReviewId, setExpandedReviewId] = useState<string | null>(null);

  useEffect(() => {
    if (!movieId) return;

    const fetchReviews = async () => {
      const apiUrlFR = `${process.env.REACT_APP_API_URL}3/movie/${movieId}/reviews?language=fr-FR`;
      const apiUrlGlobal = `${process.env.REACT_APP_API_URL}3/movie/${movieId}/reviews`;
      const bearerToken = process.env.REACT_APP_BEARER_TOKEN;

      try {
        let response = await fetch(apiUrlFR, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch French reviews');
        }

        const data = await response.json();

        if (data.results.length === 0) {
          setMessage('Aucune critique en français disponible, nous affichons donc les critiques globales.');
          response = await fetch(apiUrlGlobal, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${bearerToken}`,
            },
          });

          if (!response.ok) {
            throw new Error('Failed to fetch global reviews');
          }

          const globalData = await response.json();
          setReviews(globalData.results);
        } else {
          setReviews(data.results);
        }

        setLoading(false);
      } catch (error) {
        setError('Erreur lors de la récupération des critiques');
        setLoading(false);
      }
    };

    fetchReviews();
  }, [movieId]);

  if (loading) return <p className="text-center">Chargement des critiques...</p>;
  if (error) return <p className="text-center text-red-500">Erreur : {error}</p>;

  const toggleExpandReview = (reviewId: string) => {
    setExpandedReviewId(expandedReviewId === reviewId ? null : reviewId);
  };

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-4">Critiques</h3>
      {message && <p className="text-center text-yellow-400">{message}</p>}
      {reviews.length === 0 ? (
        <p>Aucune critique disponible pour ce film.</p>
      ) : (
        <ul className="space-y-4">
          {reviews.map((review) => (
            <li key={review.id} className="bg-gray-800 p-4 rounded-lg shadow-md">
              <p className="font-semibold">{review.author}</p>
              <p className="mt-2">
                {expandedReviewId === review.id
                  ? review.content
                  : truncateText(review.content, 200)}
              </p>
              {review.content.length > 200 && (
                <button
                  onClick={() => toggleExpandReview(review.id)}
                  className="mt-2 text-blue-400 hover:underline"
                >
                  {expandedReviewId === review.id ? 'Lire moins' : 'Lire plus'}
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Reviews;
