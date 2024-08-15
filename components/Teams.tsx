"use client";
import Image from "next/image";
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
    <section className="flex flex-col lg:gap-10 p-2 mx-4 lg:m-0 ">
      <h5 className="text-2xl font-black border-b p-2">Teams</h5>

      {loading ? (
        <p>Loading News...</p>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-5 ">
          {teams.map((team: any, index) => (
            <div className="flex items-center gap-2" key={index}>
              <Image alt={team.name} src={team.image} height={50} width={50} />
              <p className="text-xs">{team.name} </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
