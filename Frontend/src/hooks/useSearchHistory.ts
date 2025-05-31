import { useState, useEffect } from 'react';

const MAX_HISTORY_ITEMS = 5;
const STORAGE_KEY = 'jobSearchHistory';

export const useSearchHistory = () => {
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  useEffect(() => {
    // Load search history from localStorage when component mounts
    const savedHistory = localStorage.getItem(STORAGE_KEY);
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  const addToHistory = (query: string) => {
    if (!query.trim()) return;
    
    setSearchHistory(prevHistory => {
      // Remove the query if it already exists to avoid duplicates
      const filteredHistory = prevHistory.filter(item => item !== query);
      
      // Add the new query to the beginning of the array
      const newHistory = [query, ...filteredHistory].slice(0, MAX_HISTORY_ITEMS);
      
      // Save to localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
      
      return newHistory;
    });
  };

  const clearHistory = () => {
    localStorage.removeItem(STORAGE_KEY);
    setSearchHistory([]);
  };

  return { searchHistory, addToHistory, clearHistory };
};