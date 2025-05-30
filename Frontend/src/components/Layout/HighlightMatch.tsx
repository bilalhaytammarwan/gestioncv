import React from 'react';

interface HighlightMatchProps {
  text: string;
  query: string;
}

const HighlightMatch: React.FC<HighlightMatchProps> = ({ text, query }) => {
  if (!query.trim()) {
    return <>{text}</>;
  }

  // Escape special characters in query to use in regex
  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escapedQuery})`, 'gi');
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) => (
        regex.test(part) ? (
          <span key={i} style={{ fontWeight: 700 }}>{part}</span>
        ) : (
          <span key={i}>{part}</span>
        )
      ))}
    </>
  );
};

export default HighlightMatch;