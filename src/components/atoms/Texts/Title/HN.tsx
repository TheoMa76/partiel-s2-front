
import React from 'react';

interface HNProps {
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children: React.ReactNode;
  className?: string;
}

const classMap: { [key: string]: string } = {
  h1: 'text-3xl',
  h2: 'text-2xl',
  h3: 'text-2xl',
  h4: 'text-xl',
  h5: 'text-large',
  h6: 'text-base',
};

const MinecraftHN: React.FC<HNProps> = ({ as: Tag, className, children }) => {
  const classNameBase = classMap[Tag];
  
  return (
    <Tag className={`${classNameBase} ${className}`}>
      {children}
    </Tag>
  );
}

export default MinecraftHN;