import React from 'react';
import MinecraftHN from '../../../atoms/Texts/Title/MinecraftHN';

type Props = {
  title?: string;
  children: React.ReactNode;
  className?: string;
  disableHover?: boolean;
};

const Card: React.FC<Props> = ({ title, children, className, disableHover = true }) => {
  return (
    <div
      className={`flex flex-col rounded-lg shadow-lg p-4 bg-gray-800 text-white transform transition-transform duration-300 ${disableHover ? '' : 'hover:scale-105'} ${className}`}
    >
      {title && <MinecraftHN as="h2" className="text-xl font-bold mb-4">{title}</MinecraftHN>}
      {children}
    </div>
  );
}

export default Card;
