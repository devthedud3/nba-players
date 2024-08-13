import React from "react";

type Props = {};

export const LoadingAnimation = (props: Props) => {
  return (
    <div className="w-full h-full bg-gray-300 animate-pulse rounded-lg relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent opacity-50 transform -translate-x-full animate-[glow_1.5s_infinite]" />
    </div>
  );
};
