"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type Props = {};

export default function News({}: Props) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  useEffect(() => {
    (async () => {
      try {
        await fetch("/api/news")
          .then((response) => response.json())
          .then(({ articles }) => setArticles(articles))
          .finally(() => setLoading(false));
      } catch (error: any) {
        setError(error.message);
      }
    })();
  }, []);
  if (error) return <div>{error}</div>;

  return (
    <section className="flex flex-col gap-10">
      <h5 className="text-2xl font-black">News</h5>

      {loading ? (
        <p>Loading News...</p>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {articles.slice(0, 5).map((article: any, index) => (
            <div key={index} className="relative border h-92">
              <Image
                src={article.image}
                alt={article.description}
                height={700}
                width={700}
                style={{ width: "auto" }}
              />
              <div className="absolute h-auto inset-0 container-p">
                <h2 className="text-white text-3xl font-black">
                  {article.description}
                </h2>
              </div>
            </div>
          ))}
          {articles.slice(5).map((article: any, index) => (
            <div key={index} className=" h-92">
              <h2 className="text-lg font-black">{article.description}</h2>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
