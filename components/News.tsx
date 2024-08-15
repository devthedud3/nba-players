"use client";
import { oswald } from "@/assets/Fonts";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { LoadingAnimation } from "./LoadingAnimation";
import Slider from "./Slider";

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
        <div className="grid lg:grid-cols-5 gap-6">
          <div className="col-span-4 h-[675px]">
            <LoadingAnimation />
          </div>
          <div className="animate-pulse delay-100 bg-gray-300 col-span-1" />
        </div>
      ) : (
        <div className="grid lg:grid-cols-5 gap-6">
          <div className="lg:col-span-4 space-y-6">
            <Slider articles={articles} />
          </div>
          <div className="col-span-1 p-4 mx-4 lg:m-0 border h-auto bg-white">
            <h3
              className={`${oswald.className} font-semibold text-xl pb-2 border-b`}
            >
              HEADLINES
            </h3>
            <section className="flex flex-col space-y-4 pt-4">
              {headlines.map((headline: any, index) => (
                <Link
                  key={index}
                  className={`text-xs font-light ${
                    index !== headlines.length - 1 && "pb-4 border-b"
                  }`}
                  href={`https://nba.com${headline.link}`}
                  target="_blank"
                >
                  {headline.headline}
                </Link>
              ))}
            </section>
          </div>
        </div>
      )}
    </section>
  );
}
