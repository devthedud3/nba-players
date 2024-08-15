"use client";

import React from "react";

interface Props {
  setQuery?: (query: string) => void;
  query: string;
}

const a = "abcdefghijklmnopqrstuvwxyz";

const Search: React.FC<Props> = ({ query, setQuery }) => {
  const handleClick = (letter: string) => {
    if (setQuery) {
      setQuery(letter);
    }
  };

  return (
    <div className="w-full flex justify-between">
      {a.split("").map((letter, index) => (
        <p
          className={`transition-all p-4 cursor-pointer ${
            query === letter && "bg-black text-white"
          }`}
          key={index}
          onClick={() => handleClick(letter)}
        >
          {letter.toLocaleUpperCase()}
        </p>
      ))}
    </div>
  );
};

export default Search;
