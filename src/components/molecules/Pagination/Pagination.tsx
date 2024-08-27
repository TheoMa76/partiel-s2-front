import React from 'react';
import { useNavigate } from 'react-router-dom';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
};

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages }) => {
  const navigate = useNavigate();

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    navigate(`?page=${page}`);
  };

  return (
    <div className="flex justify-center mt-8">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 mx-1 bg-gray-600 text-white rounded hover:bg-gray-500"
      >
        Précédent
      </button>
      <span className="px-4 py-2 mx-1 bg-gray-700 text-white rounded">
        Page {currentPage} sur {totalPages}
      </span>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 mx-1 bg-gray-600 text-white rounded hover:bg-gray-500"
      >
        Suivant
      </button>
    </div>
  );
};

export default Pagination;
