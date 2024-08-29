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
  const [selected, setSelected] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (!selected) {
      const interval = setInterval(() => {
        setIndex((p) => (p + 1) % articles.length);
      }, 7000);
      return () => clearInterval(interval);
    }
  }, [index]);

  function handleClick(n: any) {
    setIndex(n);
    setSelected(n);
  }

  return (
    <article className="relative h-[50vh] lg:h-[675px] bg-black  lg:w-full flex flex-col">
      <div className="flex-1 justify-end overflow-hidden">
        <div
          className={`fade-effect lg:translate-x-48 transition-transform scale-animation`}
        >
          <Image
            className="animation-pulse"
            src={articles[index].image}
            alt={articles[index].title}
            height={1300}
            width={1000}
            priority
            style={{ height: "100%" }}
          />
        </div>
      </div>
      <div
        className={`lg:absolute h-auto inset-0 container-p lg:w-96 text-white flex flex-col justify-center gap-6`}
      >
        <div className="space-y-2">
          <h2 className={`${oswald.className} lg:text-3xl font-black`}>
            {articles[index].title.toLocaleUpperCase()}
          </h2>
          <p className="text-xs hidden lg:block">
            {articles[index].description}
          </p>
        </div>
        <Link
          href={`https://nba.com${articles[index].link}`}
          className=" border-2 border-white w-fit p-1 text-xs px-4 rounded-full"
          target="_blank"
        >
          READ
        </Link>
      </div>
      <div className="lg:h-auto w-full px-4">
        <div className="transition-all duration-400 flex border-inherit w-full justify-between">
          {articles.map((article: Article, keyIdx) => {
            return (
              <div
                key={keyIdx}
                onClick={() => handleClick(keyIdx)}
                className={`transition-all p-2 lg:p-4 lg:space-y-2 cursor-pointer ${
                  keyIdx == index ? "border-black" : "border-slate-200"
                } w-full`}
              >
                <div className=" bg-zinc-400 rounded-full w-full">
                  <div
                    className={`transition-all h-1 ${
                      keyIdx === index
                        ? selected === undefined
                          ? "duration-[7s] w-full"
                          : "w-full"
                        : "duration-200 w-0"
                    } bg-white rounded-full`}
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
            );
          })}
        </div>
        <h3 className="text-white text-sm lg:hidden p-2 pb-6 ">
          Next: {articles[(index + 1) % articles.length].title}
        </h3>
      </div>
    </article>
  );
}
