import React, { useState } from 'react';
import { toast } from 'react-toastify';

interface SearchProps {
  onSearch: (keywordIds: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [keyword, setKeyword] = useState<string>('');

  const handleSearch = async () => {
    if (keyword.trim()) {
      const keywords = keyword
        .split(/[\s,]+/)
        .filter(Boolean)
        .map(k => k.trim());

      const keywordIds: number[] = [];
      for (const k of keywords) {
        try {
          const response = await fetch(`${process.env.REACT_APP_API_URL}3/search/keyword?query=${k}`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_BEARER_TOKEN}`,
            },
          });

          const data = await response.json();
          const exactMatch = data.results.find((kw: { name: string, id: number }) => kw.name.toLowerCase() === k.toLowerCase());
          if (exactMatch) {
            keywordIds.push(exactMatch.id);
          }
        } catch (error) {
          toast.error('Erreur lors de la récupération des mots-clés.');
        }
      }

      const keywordIdsString = keywordIds.join(',');
      onSearch(keywordIdsString);
    }
  };

  return (
    <div className="mb-8">
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Rechercher des films par mot-clé..."
        className="p-2 border rounded w-full"
      />
      <button
        onClick={handleSearch}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
      >
        Rechercher
      </button>
    </div>
  );
};

export default Search;
