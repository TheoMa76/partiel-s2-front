import React from 'react';
import { Genre } from '../../../type/type';

interface GenreFilterProps {
  genres: Genre[];
  selectedGenres: Set<number>;
  onGenreChange: (id: number) => void;
}

const GenreFilter: React.FC<GenreFilterProps> = ({ genres, selectedGenres, onGenreChange }) => (
  <div className="mb-4">
    <h3 className="text-lg font-semibold mb-2 text-white">Filtrer par genre</h3>
    <div className="flex flex-wrap gap-4">
      {genres.map((genre) => (
        <label key={genre.id} className="flex items-center text-white">
          <input
            type="checkbox"
            checked={selectedGenres.has(genre.id)}
            onChange={() => onGenreChange(genre.id)}
            className="mr-2"
          />
          {genre.name}
        </label>
      ))}
    </div>
  </div>
);

export default GenreFilter;
