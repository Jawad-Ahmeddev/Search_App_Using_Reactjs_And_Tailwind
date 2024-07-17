import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext();
const baseUrl =  'https://real-time-image-search.p.rapidapi.com/search';

export const StateContextProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const getResults = async () => {
    setLoading(true);

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '83635baa1emsh571c3ae5c4c5c2cp1ef387jsnb8ab5de0f5f6',
		'X-RapidAPI-Host': 'real-time-image-search.p.rapidapi.com'
      }
    };
    
    const url = `${baseUrl}?query=${encodeURIComponent(searchTerm)}&region=us`;

    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
    
    setResults(data);
    setLoading(false);
  };

  return (
    <StateContext.Provider value={{ getResults, results, searchTerm, setSearchTerm, loading }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);