"use client";
import { oswald } from "@/assets/Fonts";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Props = {};

export default function News({}: Props) {
  const [articles, setArticles] = useState([]);
  const [headlines, setHeadlines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  useEffect(() => {
    (async () => {
      try {
        await fetch("/api/news")
          .then((response) => response.json())
          .then(({ articles, headlines }) => {
            setArticles(articles);
            setHeadlines(headlines);
          })
          .finally(() => setLoading(false));
      } catch (error: any) {
        setError(error.message);
      }
    })();
  }, []);
  if (error) return <div>{error}</div>;

  return (
    <section className="flex flex-col gap-10">
      {loading ? (
        <p>Loading News...</p>
      ) : (
        <div className="grid grid-cols-5 gap-6">
          <div className="col-span-4 space-y-6">
            {articles.slice(0, 5).map((article: any, index) => (
              <article key={index} className="relative bg-black">
                <div className="flex justify-end overflow-hidden">
                  <div className="fade-effect translate-x-56">
                    <Image
                      className="animation-pulse "
                      src={article.image}
                      alt={article.title}
                      height={1500}
                      width={1000}
                      priority
                      style={{ height: "100%" }}
                    />
                  </div>
                </div>
                <div className="absolute h-auto inset-0 container-p w-96 text-white flex flex-col justify-center gap-6">
                  <div className="space-y-2">
                    <h2 className={`${oswald.className} text-3xl font-black`}>
                      {article.title.toLocaleUpperCase()}
                    </h2>
                    <p className="text-xs">{article.description}</p>
                  </div>
                  <Link
                    href={`https://nba.com${article.link}`}
                    className=" border border-white w-fit p-2 "
                    target="_blank"
                  >
                    Read more
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <div className="col-span-1 border h-fit bg-white">
            <div className={` p-4`}>
              <h3
                className={`${oswald.className} font-semibold text-xl pb-2 border-b`}
              >
                HEADLINES
              </h3>
              <section className="flex flex-col space-y-4 pt-4">
                {headlines.map((headline: any, index) => (
                  <Link
                    key={index}
                    className="text-xs font-light"
                    href={headline.link}
                  >
                    {headline.headline}
                  </Link>
                ))}
              </section>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
