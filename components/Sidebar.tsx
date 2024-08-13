import { AppIcon, ShoppingBasketIcon } from "@/assets/AppIcons";
import Link from "next/link";
import React from "react";

type Props = {};

const options = "players_history_stats_schedule_news".split("_");

export const Sidebar = (props: Props) => {
  return (
    <aside className=" container-p border bg-white">
      <div className="flex items-center gap-2 mt-3">
        <ShoppingBasketIcon />
        <span className="text-xl font-bold">Statistics Hub</span>
      </div>
      <nav className="flex flex-col gap-2 mt-12">
        {options.map((option, index) => (
          <Link
            key={index}
            href={`/`}
            className="flex items-center gap-4 font-medium transition-colors hover:bg-gray-100 hover:text-foreground px-3 py-2 rounded-lg"
          >
            <AppIcon icon={option} />
            <p>{option[0].toUpperCase() + option.slice(1)}</p>
          </Link>
        ))}
      </nav>
    </aside>
  );
};
