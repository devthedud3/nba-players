"use client";

import React from "react";

interface Props {
  setQuery?: (query: string) => void;
}

const a = "abcdefghijklmnopqrstuvwxyz";

const Search: React.FC<Props> = ({ setQuery }) => {
  const handleClick = (letter: string) => {
    if (setQuery) {
      setQuery(letter);
    }
  };

  return (
    <div className="w-full flex justify-between">
      {a.split("").map((letter, index) => (
        <p
          className="border p-4 cursor-pointer"
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
