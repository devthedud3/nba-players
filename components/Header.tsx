import { AppIcon } from "@/assets/AppIcons";

import Link from "next/link";
import React from "react";
import SearchBar from "./SearchBar";

type Props = {};

export default function Header({}: Props) {
  return (
    <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b bg-[--background] shadow-sm container-p">
      <Link href="/" className="flex items-center gap-2" prefetch={false}>
        <AppIcon icon="logo" />
        <span className="text-xl font-bold">NBA Corner</span>
      </Link>
      <SearchBar icon />
    </header>
  );
}
