import News from "@/components/News";
import Players from "@/components/Players";
import Teams from "@/components/Teams";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col space-y-10 ">
      <News />
      <Teams />
      {/* <Players /> */}
    </div>
  );
}
