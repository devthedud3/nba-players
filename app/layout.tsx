import type { Metadata } from "next";

import "./globals.css";
import Header from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { SearchProvider } from "@/lib/context/SearchContext";
import { inter } from "@/assets/Fonts";

export const metadata: Metadata = {
  title: "NBA news and stats",
  description: "Created by Corey",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex min-h-screen`}>
        <SearchProvider>
          {/* <Sidebar /> */}
          <div className="flex-1">
            <Header />
            <main className="lg:p-[3rem]">{children}</main>
          </div>
        </SearchProvider>
      </body>
    </html>
  );
}
