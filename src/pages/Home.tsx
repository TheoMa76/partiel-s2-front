import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MinecraftHN from '../components/atoms/Texts/Title/HN';
import Search from '../components/molecules/FIlters/Search/Search';
import Pagination from '../components/molecules/Pagination/Pagination';
import GenreFilter from '../components/molecules/FIlters/GenreFilter';
import MovieGrid from '../components/molecules/Containers/Grid/MovieGrid';
import NoResults from '../components/atoms/Errors/NoResult';
import { toast } from 'react-toastify';
import { Genre, Movie } from '../type/type';

export const Home: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const [keywordIds, setKeywordIds] = useState<string>('');
  const [selectedGenres, setSelectedGenres] = useState<Set<number>>(new Set());
  const [noResults, setNoResults] = useState<boolean>(false);

  useEffect(() => {
    const fetchGenres = async () => {
      const apiUrl = `${process.env.REACT_APP_API_URL}/3/genre/movie/list?language=fr`;
      try {
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_BEARER_TOKEN}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch genres');
        }

        const data = await response.json();
        setGenres(data.genres);
      } catch (error) {
        console.error('Erreur:', error);
      }
    };

    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      let apiUrl = `${process.env.REACT_APP_API_URL}/3/discover/movie?language=fr-FR&page=${currentPage}`;
  
      const genreFilter = Array.from(selectedGenres).join(',');
  
      if (keywordIds) {
        apiUrl += `&with_keywords=${keywordIds}`;
      }
  
      if (genreFilter) {
        apiUrl += `&with_genres=${genreFilter}`;
      }
  
      try {
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_BEARER_TOKEN}`,
          },
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch movies');
        }
  
        const data = await response.json();
        setMovies(data.results);
        setTotalPages(data.total_pages);
        setNoResults(data.results.length === 0);
      } catch (error) {
        console.error('Erreur:', error);
      }
    };
  
    fetchMovies();
  }, [currentPage, keywordIds, selectedGenres, searchParams]);

  const handleSearch = (ids: string) => {
    if (ids) {
      setKeywordIds(ids);
      setNoResults(false);
      setSearchParams({ page: '1' });
    } else {
      setKeywordIds('');
      setNoResults(true);
      toast.error("Aucun résultat trouvé pour ce mot-clé");
    }
  };

  const handleClearFilters = () => {
    setKeywordIds('');
    setSelectedGenres(new Set());
    setNoResults(false);
    setSearchParams({ page: '1' });
  };

  const handleGenreChange = (id: number) => {
    setSelectedGenres(prev => {
      const newSelection = new Set(prev);
      if (newSelection.has(id)) {
        newSelection.delete(id);
      } else {
        newSelection.add(id);
      }
  
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', '1'); 
      setSearchParams(params);
  
      return newSelection;
    });
  };

  const getGenreNames = (genreIds: number[]) => {
    return genreIds.map(id => {
      const genre = genres.find(g => g.id === id);
      return genre ? genre.name : 'Unknown';
    }).join(', ');
  };

  return (
    <div className='m-5'>
      <MinecraftHN as="h2" className="mb-8 text-center text-white">Films les plus populaires</MinecraftHN>
      <Search onSearch={handleSearch} />
      <button
        onClick={handleClearFilters}
        className="mb-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 transition duration-300"
      >
        Effacer les filtres
      </button>
      {genres.length > 0 && (
        <GenreFilter
          genres={genres}
          selectedGenres={selectedGenres}
          onGenreChange={handleGenreChange}
        />
      )}
      {noResults && <NoResults />}
      <MovieGrid movies={movies} getGenreNames={getGenreNames} noResults={noResults} />
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
};

export default Home;
