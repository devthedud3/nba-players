"use client";
import { oswald } from "@/assets/Fonts";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type SlideProps = {
  articles: Article[];
};

export default function Slider({ articles }: SlideProps) {
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((p) => (p + 1) % articles.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <article className="relative bg-black w-screen lg:w-full">
      <div className="flex justify-end overflow-hidden">
        <div className="fade-effect lg:translate-x-48">
          <Image
            className="animation-pulse "
            src={articles[index].image}
            alt={articles[index].title}
            height={1300}
            width={1000}
            priority
            style={{ height: "100%" }}
          />
        </div>
      </div>
      <div className="absolute h-auto inset-0 container-p w-96 text-white flex flex-col justify-center gap-6">
        <div className="space-y-2">
          <h2 className={`${oswald.className} text-3xl font-black`}>
            {articles[index].title.toLocaleUpperCase()}
          </h2>
          <p className="text-xs">{articles[index].description}</p>
        </div>
        <Link
          href={`https://nba.com${articles[index].link}`}
          className=" border border-white w-fit p-2 "
          target="_blank"
        >
          Read more
        </Link>
      </div>
      <div className="transition-all duration-400 inset-0 bottom-0 flex border-inherit lg:w-full w-screen justify-between">
        {articles.map((article: Article, keyIdx) => (
          <div
            key={keyIdx}
            onClick={() => setIndex(keyIdx)}
            className={`transition-all p-4 space-y-2 cursor-pointer ${
              keyIdx == index ? "border-black" : "border-slate-200"
            } w-1/${articles.length}`}
          >
            <div className="w-full h-1 bg-zinc-400 rounded-full">
              <div
                className={`transition-all  ${
                  keyIdx == index ? "duration-[7s] w-full" : "duration-75 w-0"
                } h-full bg-white rounded-full`}
              />
            </div>
            <h2
              className={`transition-opacity ${
                oswald.className
              } font-medium hidden lg:block text-sm text-white ${
                keyIdx !== index && "opacity-50"
              }`}
            >
              {article.title.toLocaleUpperCase()}
            </h2>
          </div>
        ))}
      </div>
    </article>
  );
}
