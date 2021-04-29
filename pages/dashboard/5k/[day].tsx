import React from "react";
import Link from "next/link";
import { Duration } from "luxon";
import { EffortDot, EffortDot2 } from "../../../components/dashboard/effort";
import { LineChart2 } from "../../../components/chart";
import { Container } from "../../../components/dashboard/container";
import { groupBy } from "../../../components/dashboard/util";
import { strava } from "../../../lib/strava";
import jsonData from "../../../data/dynamic-5k.json";
import { replace } from "formik";

export type Interval = {
  day: number;
  zone:
    | "Recovery"
    | "Endurance"
    | "Aerobic Threshold"
    | "VO2"
    | "Lactate Threshold"
    | "Long Endurance"
    | "Anaerobic";
  interval: number;
  percentHR: number;
  reps?: number;
  title?: string;
  description?: string;
  message?: string;
};
type Data = {
  raceDistance: number;
  goalTime: number;
  vo2Percent: number;
  vo2Factor: number;
  maxHR: number;
  intervals: Interval[];
};

// @ts-ignore
const data: Data = jsonData;

export const getServerSideProps = async (all) => {
  const day = all.params.day - 1;
  const items = Object.values(groupBy(data.intervals, "day"));

  const { athlete } = await strava.getAthlete(all);
  return { props: { athlete, data: { ...data, intervals: items[day] } } };
};

export default function Dashboard(props: { data: Data }) {
  const predictedVO2 = Math.ceil(
    (data.goalTime / data.vo2Factor) * data.vo2Percent
  );
  const items = Object.values(groupBy(data.intervals, "day"));

  return (
    <Container
      aside={
        <aside className="hidden relative xl:order-first xl:flex xl:flex-col flex-shrink-0 w-96 border-r border-gray-200 overflow-scroll">
          <List predictedVO2={predictedVO2} items={items} />
        </aside>
      }
    >
      <div className="p-12">
        <Header data={props.data} predictedVO2={predictedVO2} />
        <Feed predictedVO2={predictedVO2} data={props.data.intervals} />
        <div className="h-12" />
        <LineChart2 ints={expandIntervals(props.data.intervals)} />
      </div>
    </Container>
  );
}

const List = (props: { predictedVO2: number; items: Interval[][] }) => {
  return (
    <ul
      className="relative z-0 divide-y divide-gray-200 border-b border-gray-200"
      x-max={1}
    >
      {props.items.map((day, index) => {
        return (
          <li key={day[0].day} className="relative px-3 py-6 hover:bg-gray-50">
            <Link href={`/dashboard/5k/${index + 1}`}>
              <a>
                <div className="flex items-center justify-between space-x-4">
                  {/* Repo name and link */}
                  <div className="min-w-0 space-y-3">
                    <div className="flex items-center space-x-3">
                      <EffortDot effort={day[0].zone} />
                      <span className="block">
                        <h2 className="text-sm font-medium">
                          <span
                            className="absolute inset-0"
                            aria-hidden="true"
                          />
                          {day[0].zone}
                        </h2>
                      </span>
                    </div>
                  </div>
                  <div className="sm:hidden">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      x-description="Heroicon name: chevron-right"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  {/* Repo meta info */}
                  <div className="hidden sm:flex flex-col flex-shrink-0 items-end space-y-3">
                    <div className="flex items-center space-x-4">
                      <div className="relative text-sm text-gray-500 hover:text-gray-900 font-medium">
                        Day {day[0].day}
                      </div>
                    </div>
                  </div>
                </div>
                {/* {day.map((item) => (
                  <>
                    <div className="whitespace-pre-line mt-2 text-sm text-gray-500 group-hover:text-gray-900 font-medium">
                      {formatInterval(item, props.predictedVO2)}
                    </div>
                  </>
                ))} */}
              </a>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

function roundUp5(x) {
  return Math.ceil(x / 5) * 5;
}

function roundDown5(x) {
  return Math.floor(x / 5) * 5;
}

const durationRange = (x: number) => {
  const low = roundDown5(x);
  const high = roundUp5(x);
  return `${Duration.fromObject({
    seconds: low,
  }).toFormat("m:ss")} to ${Duration.fromObject({
    seconds: high,
  }).toFormat("m:ss")}`;
};

const maxHR = 200;
const formatInterval = (interval: Interval, predictedVO2: number) => {
  return `${Duration.fromObject({ seconds: interval.interval }).toFormat(
    "m:ss"
  )} at about ${durationRange(
    predictedVO2 / interval.percentHR
  )} per mile \nTarget HR: ${roundDown5(
    maxHR * interval.percentHR
  )} to ${roundUp5(200 * interval.percentHR + 1)}`;
};

const expandIntervals = (intervals: Interval[]) => {
  let isInRep = false;
  const res = [];
  intervals.forEach((interval, index) => {
    // if interval has `reps` key
    if (interval.reps) {
      // Break out of rep index
      isInRep = true;
      const restOfIntervals = intervals.slice(index + 1);
      const indexOfNextRepInterval = restOfIntervals.findIndex((interval) => {
        return interval.reps;
      });
      if (indexOfNextRepInterval === -1) {
        const indexOfCoolDown = restOfIntervals.findIndex((interval) => {
          return interval.title === "Cool-down";
        });
        if (indexOfCoolDown > 0) {
          const intervalsBeforCooldown = restOfIntervals.slice(
            0,
            indexOfCoolDown
          );
          const intervalsToLoop = [interval, ...intervalsBeforCooldown];
          for (var i = 0; i < interval.reps; i++) {
            intervalsToLoop.map((intervalInner, intIndex) => {
              // if is last time looping and we're on the last item, assume it's not necessary
              if (
                i === interval.reps - 1 &&
                intIndex === intervalsToLoop.length - 1
              ) {
                // do nothing
              } else {
                res.push(intervalInner);
              }
            });
          }
        }
      }
    } else {
      if (isInRep) {
        if (interval.title === "Cool-down") {
          isInRep = false;
          res.push(interval);
        }
      } else {
        res.push(interval);
      }
    }
  });
  return res;
};

const formatAllIntervals = (intervals: Interval[], predictedVO2: number) => {
  expandIntervals(intervals);
  const seconds = intervals.reduce((prev, current, currentIndex, array) => {
    return prev + current.interval;
  }, 0);
  const lowHR = Math.min(...intervals.map((interval) => interval.percentHR));
  const highHR = Math.max(...intervals.map((interval) => interval.percentHR));
  return `Total of ${Duration.fromObject({ seconds }).toFormat(
    "m:ss"
  )} minutes - \nHR between ${roundDown5(maxHR * lowHR)} and ${roundUp5(
    maxHR * highHR + 1
  )}`;
};

const Feed = (props: { predictedVO2: number; data: Interval[] }) => {
  const sets = [];
  props.data.forEach((item, index) => {
    const prev = props.data[index - 1];
    if (item.title) {
      if (item.title === "Warm-up") {
        sets.push([item]);
      }
      if (item.title === "Cool-down") {
        sets.push([item]);
      }
      if (item.title === "Workout") {
        sets.push([item]);
      }
    } else {
      if (prev) {
        if (prev.reps) {
          sets[index - 1].push(item);
        } else {
          sets.push([item]);
        }
      } else {
        sets.push([item]);
      }
    }
  });
  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {props.data[0].message && (
          <li>
            <div className="relative pb-8">
              {/* <span
              className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
              aria-hidden="true"
            /> */}
              <div className="relative flex items-start space-x-3">
                <div className="relative">
                  <img
                    className="h-10 w-10 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white"
                    src="https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
                    alt=""
                  />
                  <span className="absolute -bottom-0.5 -right-1 bg-white rounded-tl px-0.5 py-px">
                    {/* Heroicon name: chat-alt */}
                    <svg
                      className="h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <div>
                    <div className="text-sm">
                      <a href="#" className="font-medium text-gray-900">
                        Terrence says:
                      </a>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">
                      Terrence Mahon, Head Coach
                    </p>
                  </div>
                  <div className="mt-2 text-sm text-gray-700">
                    <p>{props.data[0].message}</p>
                  </div>
                </div>
              </div>
            </div>
          </li>
        )}
        {sets.map((item) => {
          return <FeedItem predictedVO2={props.predictedVO2} data={item} />;
        })}
      </ul>
    </div>
  );
};

const FeedItem = (props: { predictedVO2: number; data: Interval[] }) => {
  const item = props.data[0];
  switch (item.title) {
    case "Warm-up":
      return <Warmup predictedVO2={props.predictedVO2} data={props.data} />;
    case "Workout":
      return <Workout predictedVO2={props.predictedVO2} data={props.data} />;
    case "Cool-down":
      return <CoolDown predictedVO2={props.predictedVO2} data={props.data} />;
    default:
      return (
        <Interval
          trailing={false}
          predictedVO2={props.predictedVO2}
          data={props.data[0]}
        />
      );
  }
};

const Warmup = (props: { predictedVO2: number; data: Interval[] }) => {
  return (
    <>
      <Interval
        icon={
          <svg
            className="h-5 w-5 text-gray-500"
            x-description="Heroicon name: user-circle"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
              clipRule="evenodd"
            />
          </svg>
        }
        trailing={false}
        predictedVO2={props.predictedVO2}
        data={props.data[0]}
      />
      <div className="border border-color-gray-200 mb-8" />
    </>
  );
};
const Workout = (props: { predictedVO2: number; data: Interval[] }) => {
  const [expanded, setExpanded] = React.useState<boolean>(false);
  return (
    <>
      <li>
        <div className="relative pb-8">
          <span
            className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
            aria-hidden="true"
          />
          <div className="relative flex items-start space-x-3">
            <div className="relative">
              <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center ring-8 ring-white">
                <svg
                  className="h-6 w-6 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <div>
                <div className="text-sm">
                  <a href="#" className="font-medium text-gray-900">
                    {props.data[0].title}
                  </a>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  {props.data[0].reps} sets • Ave HR 160 BPM • Volume - 5 miles
                </p>
              </div>
            </div>
          </div>
        </div>
      </li>
      {props.data.map((item) => {
        return <Interval predictedVO2={props.predictedVO2} data={item} />;
      })}
      <li>
        <button onClick={() => setExpanded(true)} className="relative pb-8">
          <div className="relative flex items-start space-x-3">
            <div>
              <div className="relative px-1">
                <div className="h-8 w-8 bg-white border-2 border-gray-300 rounded-full ring-8 ring-white flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5 text-gray-300"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="min-w-0 flex-1 py-1.5">
              <div className="text-sm text-gray-500">
                <span className="font-medium text-gray-900">
                  {props.data[0].reps - 1} more.
                </span>{" "}
                Expand all.
              </div>
            </div>
          </div>
        </button>
      </li>
    </>
  );
};
const CoolDown = (props: { predictedVO2: number; data: Interval[] }) => {
  return (
    <>
      <div className="border border-color-gray-200 mb-8" />
      <Interval
        icon={
          <svg
            className="h-5 w-5 text-gray-500"
            x-description="Heroicon name: user-circle"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
              clipRule="evenodd"
            />
          </svg>
        }
        trailing={false}
        predictedVO2={props.predictedVO2}
        data={props.data[0]}
      />
    </>
  );
};

const Interval = (props: {
  trailing?: boolean;
  icon?: React.ReactNode;
  predictedVO2: number;
  data: Interval;
}) => {
  const shouldTrail = props.trailing === false ? false : true;
  return (
    <li>
      <div className="relative pb-8">
        {shouldTrail && (
          <span
            className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
            aria-hidden="true"
          />
        )}
        <div className="relative flex items-start space-x-3">
          <div>
            <div className="relative px-1">
              <div className="h-8 w-8 bg-gray-100 rounded-full ring-8 ring-white flex items-center justify-center">
                {props.icon || <EffortDot2 effort={props.data.percentHR} />}
              </div>
            </div>
          </div>
          <div className="min-w-0 flex-1 py-1.5">
            <div className="text-sm text-gray-500">
              <a href="#" className="font-medium text-gray-900">
                {formatInterval(props.data, props.predictedVO2)}
              </a>
              {props.data.description && (
                <p className="mt-0.5 text-sm text-gray-500">
                  {props.data.description}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

const Header = (props: { data: Data; predictedVO2: number }) => {
  return (
    <div className="lg:flex lg:items-center lg:justify-between mb-12 ">
      <div className="flex-1 min-w-0">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
          {props.data.intervals[0].zone}
        </h2>
        <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
          {formatAllIntervals(props.data.intervals, props.predictedVO2)}
        </div>
      </div>
      <div className="mt-5 flex lg:mt-0 lg:ml-4">
        <span className="sm:ml-3">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-steel-medium hover:bg-steel-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-steel-light"
          >
            {/* Heroicon name: check */}
            <svg
              className="-ml-1 mr-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Sync from Strava
          </button>
        </span>
        {/* Dropdown */}
        <span className="ml-3 relative sm:hidden">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-steel-light"
            id="mobile-menu"
            aria-haspopup="true"
          >
            More
            {/* Heroicon name: chevron-down */}
            <svg
              className="-mr-1 ml-2 h-5 w-5 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {/*
  Dropdown panel, show/hide based on dropdown state.

  Entering: "transition ease-out duration-200"
    From: "transform opacity-0 scale-95"
    To: "transform opacity-100 scale-100"
  Leaving: "transition ease-in duration-75"
    From: "transform opacity-100 scale-100"
    To: "transform opacity-0 scale-95"
*/}
          <div
            className="origin-top-right absolute right-0 mt-2 -mr-1 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5"
            aria-labelledby="mobile-menu"
            role="menu"
          >
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              Edit
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              View
            </a>
          </div>
        </span>
      </div>
    </div>
  );
};
