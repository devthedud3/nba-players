import React from "react";

type Props = {};

export default function Card({}: Props) {
  return (
    <div className="border w-fit">
      <div className="w-full flex">
        <p>TLOGO</p>
        <p>Header</p>
      </div>
      <div className="w-full">
        <p>Body</p>
      </div>
    </div>
  );
}
