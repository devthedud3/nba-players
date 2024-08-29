"use client";
import { useEffect, useState } from "react";
import List from "./List";
import Search from "./Search";
import Card from "./Card";

const header = [
  "Name",
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
    <section className="bg-white p-4">
      <Card />
      <h5 className="text-2xl font-black p-2 border-b mb-10">Players</h5>
      <Search query={query} setQuery={setQuery} />
      {loading ? (
        <div className="w-full space-y-4">
          {[...Array(50)].map((_, index) => (
            <div
              key={index}
              className="h-6 w-full animate-pulse bg-slate-300 rounded-xl"
            />
          ))}
        </div>
      ) : (
        <List headers={header} data={players} />
      )}
    </section>
  );
};

export default Players;
