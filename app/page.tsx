import News from "@/components/News";
import Players from "@/components/Players";
import Teams from "@/components/Teams";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col p-12 space-y-4">
      <News />
      <Teams />
      <h1 className="text-xl font-extrabold">NBA Players</h1>
      <Players />
    </div>
  );
}
