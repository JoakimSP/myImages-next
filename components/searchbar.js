import React, { useState } from 'react';

function SearchBar() {
  const [category, setCategory] = useState("Category 1");

  return (
    <div className="flex items-center">
      <select 
        className="border rounded p-2 mr-2" 
        value={category} 
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="Category 1">Category 1</option>
        <option value="Category 2">Category 2</option>
        <option value="Category 3">Category 3</option>
        <option value="Category 4">Category 4</option>
      </select>
      
      <input 
        className="border rounded p-2" 
        type="text" 
        placeholder={`Search in ${category}`} 
      />
    </div>
  );
}

export default SearchBar;
