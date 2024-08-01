import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { SearchProvider } from "@/context/SearchContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NBA All stats",
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
          <Sidebar />
          <div className="flex-1">
            <Header />
            {children}
          </div>
        </SearchProvider>
      </body>
    </html>
  );
}
