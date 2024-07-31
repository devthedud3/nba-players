import { ShoppingBasketIcon } from "@/assets/svg-icons";
import Link from "next/link";
import React from "react";

type Props = {};

export default function Header({}: Props) {
  return (
    <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b bg-[--background] shadow-sm container-p">
      <Link href="/" className="flex items-center gap-2" prefetch={false}>
        <ShoppingBasketIcon />
        <span className="text-xl font-bold">Stats Corner</span>
      </Link>
      <div>search bar going here</div>
    </header>
  );
}
