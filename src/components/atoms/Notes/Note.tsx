import React from 'react';
import Star from './Star';

interface NoteProps {
  rating: number;
}

const Note: React.FC<NoteProps> = ({ rating }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    const lowerBound = (i - 1) * 2;
    const upperBound = i * 2;

    let fillPercentage;

    if (rating >= upperBound) {
      fillPercentage = 100;
    } else if (rating >= lowerBound) {
      fillPercentage = ((rating - lowerBound) / 2) * 100;
    } else {
      fillPercentage = 0;
    }

    stars.push(<Star key={i} fillPercentage={fillPercentage} />);
  }

  return <div className="flex">{stars}</div>;
};

export default Note;
