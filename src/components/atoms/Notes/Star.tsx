import React from 'react';

interface StarProps {
  fillPercentage: number; // De 0 à 100
}

const Star: React.FC<StarProps> = ({ fillPercentage }) => {
  return (
    <div className="relative w-6 h-6">
      <svg
        className="absolute top-0 left-0 w-full h-full text-gray-300"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24l-9.02-.78L12 2 11.02 8.46 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
      <svg
        className="absolute top-0 left-0 w-full h-full text-yellow-500"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        style={{ clipPath: `inset(0 ${100 - fillPercentage}% 0 0)` }}
      >
        <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24l-9.02-.78L12 2 11.02 8.46 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
    </div>
  );
};

export default Star;
