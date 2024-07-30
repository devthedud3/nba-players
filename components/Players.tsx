"use client";
import { useEffect, useState } from "react";
import List from "./List";
import Search from "./Search";

const header = [
  "First_Name",
  "Last_Name",
  "From",
  "To",
  "Position",
  "Height",
  "Weight",
  "DOB",
  "College",
];

const Players = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [query, setQuery] = useState<string>("a");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async function () {
      setLoading(true);
      try {
        await fetch(`/api/players/${query}`, { method: "GET" })
          .then((data) => data.json())
          .then(({ players }) => setPlayers(players));
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [query]);

  if (error) return <div>{error}</div>;

  return (
    <>
      <Search query={query} setQuery={setQuery} />
      {loading ? (
        <div className="h-72 w-full animate-pulse bg-slate-50 rounded-xl" />
      ) : (
        <List headers={header} data={players} />
      )}
    </>
  );
};

export default Players;
