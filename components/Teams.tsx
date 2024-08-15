"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Props = {};

export default function Teams({}: Props) {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  useEffect(() => {
    (async () => {
      try {
        await fetch("/api/teams")
          .then((response) => response.json())
          .then(({ teams }) => setTeams(teams))
          .finally(() => setLoading(false));
      } catch (error: any) {
        setError(error.message);
      }
    })();
  }, []);
  if (error) return <div>{error}</div>;

  return (
    <section className="flex bg-white flex-col lg:gap-10 p-2 mx-4 lg:m-0 ">
      <h5 className="text-2xl font-black p-2 border-b">Teams</h5>

      {loading ? (
        <p>Loading News...</p>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {teams.map((team: any, index) => (
            <Link
              className="transition flex p-1 items-center border-2 border-white hover:border-slate-200 rounded-lg gap-2 cursor-pointer"
              key={index}
              href={`https://nba.com/${team.name
                .toLocaleLowerCase()
                .split(" ")
                .at(-1)}`}
              target="_blank"
            >
              <Image alt={team.name} src={team.image} height={50} width={50} />
              <p className="text-[0.65rem]">{team.name} </p>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
