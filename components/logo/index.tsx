import React from "react";

export const Logo = ({ center }: { center?: boolean }) => {
  return (
    <div className={`${center ? "text-center" : ""}`}>
      <h2 className="leading-5 tracking-widest font-extrabold text-2xl font-mono">
        GC
      </h2>
      <h2 className="leading-5 tracking-widest font-extrabold text-2xl font-mono">
        TC
      </h2>
    </div>
  );
};
