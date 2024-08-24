"use client";
import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [city, setCity] = useState("");

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center space-x-2">
      <input
        type="text"
        value={city}
        onChange={handleInputChange}
        placeholder="Enter city name"
        className="px-4 py-2 border rounded-md focus:outline-none"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white font-bold text-sm rounded-md"
      >
        Search
      </button>
    </form>
  );
}
