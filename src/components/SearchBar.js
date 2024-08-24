import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="flex items-center justify-center mt-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for eBook..."
        className="p-2 border border-orange-300 rounded-md w-80 md:w-1/2"
      />
      <button
        onClick={handleSearch}
        className="ml-2 px-4 py-2 bg-green-500 text-orange rounded-md
        hover:bg-black-600 transition"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
