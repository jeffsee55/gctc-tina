import React from "react";

type Effort =
  | "Recovery"
  | "Endurance"
  | "Aerobic Threshold"
  | "VO2"
  | "Lactate Threshold"
  | "Long Endurance"
  | "Anaerobic";

export const EffortDot = (props: { effort: Effort }) => {
  let outerClass;
  let innerClass;
  switch (props.effort) {
    case "Recovery":
      outerClass = "bg-blue-100";
      innerClass = "bg-blue-400";
      break;
    case "Long Endurance":
    case "Endurance":
      outerClass = "bg-green-100";
      innerClass = "bg-green-400";
      break;
    case "Lactate Threshold":
    case "Aerobic Threshold":
      outerClass = "bg-yellow-100";
      innerClass = "bg-yellow-400";
      break;
    case "Anaerobic":
    case "VO2":
      outerClass = "bg-red-100";
      innerClass = "bg-red-400";
      break;
  }
  return (
    <span
      className={`h-4 w-4 ${outerClass} rounded-full flex items-center justify-center`}
      aria-hidden="true"
    >
      <span className={`h-2 w-2 ${innerClass} rounded-full`} />
    </span>
  );
};

export const EffortDot2 = (props: { effort: number }) => {
  let outerClass;
  let innerClass;
  if (props.effort < 0.5) {
    outerClass = "bg-blue-100";
    innerClass = "text-blue-800";
  }
  if (props.effort >= 0.5 && props.effort <= 0.7) {
    outerClass = "bg-green-100";
    innerClass = "text-green-800";
  }
  if (props.effort > 0.7 && props.effort < 0.85) {
    outerClass = "bg-yellow-100";
    innerClass = "text-yellow-800";
  }
  if (props.effort >= 0.85) {
    outerClass = "bg-red-100";
    innerClass = "text-red-800";
  }
  return (
    <span
      className={`h-8 w-8 ${outerClass} rounded-full flex items-center justify-center font-bold tracking-wider text-xs`}
      aria-hidden="true"
    >
      <span className={`${innerClass}`}>{props.effort * 100}</span>
    </span>
  );
};
