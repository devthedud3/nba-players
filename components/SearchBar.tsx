"use client";
import { AppIcon } from "@/assets/AppIcons";
import { useSearch } from "@/context/SearchContext";

import React from "react";

type Props = {
  icon?: boolean;
};

export default function SearchBar({ icon }: Props) {
  const { search, setSearch } = useSearch();

  function handleChange(e: any) {
    e.preventDefault();
    setSearch(e.currentTarget.value);
  }
  console.log(search);
  return (
    <div className="flex w-96 border items-center py-2 px-2 gap-2 rounded-full bg-slate-100">
      {icon && <AppIcon icon="search" />}
      <input
        className="w-full outline-none bg-inherit text-sm"
        placeholder="Search players, teams, and more..."
        value={search}
        onChange={handleChange}
      />

      <button
        className={`transition-opacity opacity-0 ${search && "opacity-100"}`}
        onClick={() => setSearch("")}
      >
        <AppIcon icon="clear" />
      </button>
    </div>
  );
}
