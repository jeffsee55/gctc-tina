import React from "react";
import { DateTime } from "luxon";
import { SlideOver } from "../slideover";
import { useWindowSize } from "../../hooks/useWindowSize";
// @ts-ignore
import { trainingWeeks } from "./weeks";

export const Calendar = () => {
  const startSunday = true;
  const weekDisplay = startSunday
    ? ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const month = DateTime.local().startOf("month");
  const firstWeek = month.startOf("week");
  const week1 = startSunday ? firstWeek.minus({ day: 1 }) : firstWeek;
  const week2 = week1.plus({ week: 1 });
  const week3 = week1.plus({ week: 2 });
  const week4 = week1.plus({ week: 3 });
  const week5 = week1.plus({ week: 4 });
  const week6 = week1.plus({ week: 5 });
  const week7 = week1.plus({ week: 6 });
  const week8 = week1.plus({ week: 7 });
  const week9 = week1.plus({ week: 8 });
  const week10 = week1.plus({ week: 9 });
  const week11 = week1.plus({ week: 10 });
  const week12 = week1.plus({ week: 11 });
  const weeks = [
    week1,
    week2,
    week3,
    week4,
    week5,
    week6,
    week7,
    week8,
    week9,
    week10,
    week11,
    week12,
  ];

  const [isOpen, setIsOpen] = React.useState(false);
  const [activeMember, setActiveDay] = React.useState<DateTime>(
    DateTime.local()
  );
  const open = (day: DateTime) => {
    setIsOpen(true);
    setActiveDay(day);
  };
  const { width } = useWindowSize();
  return (
    <div className="grid grid-cols-12 w-full">
      {/* FIXME on mobile this should be slightly less than full height */}
      <div className="h-screen flex col-span-12 lg:col-span-7 xl:col-span-8">
        <div className="flex flex-col w-0 flex-1 overflow-auto">
          <div className="">
            {/* Page title & actions */}
            <div className="sticky top-0">
              <div className="bg-white border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
                <div className="flex-1 min-w-0">
                  <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">
                    September
                  </h1>
                </div>
                <div className="mt-4 flex sm:mt-0 sm:ml-4">
                  <span className="order-1 ml-3 shadow-sm rounded-md sm:order-0 sm:ml-0">
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out"
                    >
                      Share
                    </button>
                  </span>
                  <span className="order-0 sm:order-1 sm:ml-3 shadow-sm rounded-md">
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-purple-600 hover:bg-purple-500 focus:outline-none focus:shadow-outline-purple focus:border-purple-700 active:bg-steel-dark transition duration-150 ease-in-out"
                    >
                      Create
                    </button>
                  </span>
                </div>
              </div>
              <div
                className="grid gap-1 p-1 pb-0 lg:bg-gray-200"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(7, minmax(50px, 1fr))",
                }}
              >
                {weekDisplay.map((day) => {
                  return (
                    <div className="flex justify-center items-center font-mono text-sm">
                      {day}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="">
              <div className="">
                <div className="lg:bg-gray-200">
                  {width && width < 1024 && (
                    <DaySlideOver
                      isOpen={isOpen}
                      onClose={() => setIsOpen(false)}
                      {...activeMember}
                    />
                  )}
                  {weeks.map((week, index) => {
                    return (
                      <Week
                        activeDay={activeMember}
                        onDay={(day) => open(day)}
                        start={week}
                        training={trainingWeeks[index]}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-screen hidden lg:flex lg:col-span-5 xl:col-span-4">
        {activeMember && <DayLong day={activeMember} />}
      </div>
    </div>
  );
};

const Week = ({
  activeDay,
  start,
  training,
  onDay,
}: {
  activeDay: DateTime;
  start: DateTime;
  training: { effort: number; mileage: number }[];
  onDay: (day: DateTime) => void;
}) => {
  const days = [
    start,
    start.plus({ day: 1 }),
    start.plus({ day: 2 }),
    start.plus({ day: 3 }),
    start.plus({ day: 4 }),
    start.plus({ day: 5 }),
    start.plus({ day: 6 }),
  ];
  return (
    <>
      <style>
        {`
        .week-grid::before {
          content: '';
          width: 0;
          padding-bottom: 100%;
          grid-row: 1 / 1;
          grid-column: 1 / 1;
        }
        .week-grid > *:first-child {
          grid-row: 1 / 1;
          grid-column: 1 / 1;
        }
        `}
      </style>
      <div
        className="week-grid grid gap-1 p-1 pb-0"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, minmax(50px, 1fr))",
          gridAutoRows: "1fr",
        }}
      >
        {days.map((day, index) => {
          return (
            <BigDay
              training={training[index]}
              active={activeDay.toISODate() === day.toISODate()}
              onSelect={(day) => onDay(day)}
              day={day}
            />
          );
        })}
      </div>
    </>
  );
};

const BigDay = ({
  active,
  day,
  onSelect,
  training,
}: {
  active: boolean;
  onSelect: (args: DateTime) => void;
  training: { effort: number; mileage: number };
  day: DateTime;
}) => {
  return (
    <div
      onClick={() => onSelect(day)}
      // className="cursor-pointer"
      className={`rounded-full lg:rounded-none flex items-center justify-center lg:block lg:${
        effortScale[training.effort]
      } lg:hover:bg-gray-100 cursor-pointer`}
    >
      <div
        // className={`mt-2 ml-2 h-8 w-8 rounded-full flex items-center justify-center ${
        className={`h-8 w-8 lg:h-6 lg:w-6 lg:mt-2 lg:ml-2 border-2 lg:border-none border-red-300 sm:h-12 sm:w-12 rounded-full flex items-center justify-center ${
          active ? `bg-indigo-400 text-white` : `text-gray-500`
        }`}
      >
        <h4 className="font-mono font-bold text-sm">{day.day}</h4>
      </div>
      <Pill effort={training.effort} volume={training.mileage} />
    </div>
  );
};

function Heartbeat(props: any) {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        fill="currentColor"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      >
        <polyline fill="none" points="1 11 8 11 10 8 14 14 16 11 23 11" />
        <path
          d="M5,14.2A58.932,58.932,0,0,0,12,22a58.932,58.932,0,0,0,7-7.8"
          fill="none"
        />
        <path
          d="M22,7.429A5.458,5.458,0,0,0,16.545,2,5.521,5.521,0,0,0,12,4.443,5.521,5.521,0,0,0,7.455,2,5.458,5.458,0,0,0,2,7.429"
          fill="none"
        />
      </g>
    </svg>
  );
}

const effortScale = [
  "bg-green-50 text-green-600",
  "bg-green-50 text-green-600",
  "bg-green-50 text-green-600",
  "bg-yellow-50 text-yellow-600",
  "bg-orange-50 text-orange-600",
  "bg-orange-50 text-orange-600",
  "bg-red-50 text-red-600",
];

const iconScale = [null, null, null, null, <Bolt />, <Heartbeat />, <Bolt />];

function Bolt(props: any) {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 12 12"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g strokeWidth="1">
        <polygon
          fill="none"
          points="6.5 0.5 5.5 4.5 11.5 4.5 5.5 11.5 6.5 7.5 0.5 7.5 6.5 0.5"
          stroke="currentColor"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

const Pill = ({ effort, volume }: { effort: number; volume: number }) => {
  const style = effortScale[effort];
  return (
    <div
      className={`ml-2 mt-5 cursor-pointer inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold leading-5 ${style} md:mt-2 lg:mt-0`}
    >
      <div className="flex items-center justify-center">
        {iconScale[effort]}{" "}
        <div className={iconScale[effort] ? "ml-2" : ""}>{volume}</div>
      </div>
    </div>
  );
};

function Chili(props: any) {
  return (
    <svg className={`h-4 w-4 text-red-500`} viewBox="0 0 16 16">
      <g fill="currentColor">
        <path
          d="M14.4,10c-4.4,0.8-5.3,1.3-6.6-0.5C7.4,9.1,7.4,8.2,7.4,7.5c0-0.5,0-1-0.1-1.5C7.1,5,6.4,4.2,5.6,3.7 c0.3-0.2,0.5-0.6,0.4-1C5.9,2.2,5.3,1.8,4.8,1.9C4.1,2,3.5,2.5,3,3.3c-2,0.2-3,1.5-3,3.6c0,3,1.2,5.5,2.2,6.6 C3.7,15.1,5.8,16,8.1,16c3,0,5.7-1.5,7.6-3.7c0.4-0.4,0.4-1.1,0.1-1.6C15.5,10.2,15,9.9,14.4,10z M8.2,14C8.1,14,8.1,14,8.2,14 c-1.8,0-3.4-0.7-4.4-1.9c-0.9-1-1.7-3-1.7-5.3C2,6,2.2,5.6,2.6,5.4c0,0.8,0.5,1.2,1,1.2c0.6,0,1-0.5,1-1.1C5,5.7,5.2,6,5.3,6.4 C5.4,6.7,5.4,7,5.4,7.5c0,1,0,2.3,0.8,3.3c1.8,2.4,3.7,2.2,6.5,1.6C11.3,13.4,9.7,14,8.2,14z"
          fill="currentColor"
        />
        <path d="M12,5c0.3,0,0.5-0.1,0.7-0.3l2-2c0.4-0.4,0.4-1,0-1.4s-1-0.4-1.4,0l-2,2 c-0.4,0.4-0.4,1,0,1.4C11.5,4.9,11.7,5,12,5z" />
        <path d="M13,6c-0.6,0-1,0.4-1,1s0.4,1,1,1h2c0.6,0,1-0.4,1-1s-0.4-1-1-1H13z" />
        <path d="M9,4c0.6,0,1-0.4,1-1V1c0-0.6-0.4-1-1-1S8,0.4,8,1v2C8,3.6,8.4,4,9,4z" />
      </g>
    </svg>
  );
}

type Day = {};
type DaySlideover = { isOpen: boolean; onClose: () => void } & Day;

export const DaySlideOver = (props: DaySlideover) => {
  const { onClose, ...rest } = props;
  return (
    <SlideOver width="lg" pad={false} isOpen={props.isOpen} onClose={onClose}>
      <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
        <DayLong day={DateTime.local()} />
      </div>
    </SlideOver>
  );
};

export const DayLong = ({ day }: { day: DateTime }) => {
  return (
    <>
      <div className="divide-y divide-gray-200 bg-white">
        <div className="">
          <div
            className="bg-steel-dark h-28 lg:h-48"
            style={{
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundImage:
                "url('https://images.unsplash.com/photo-1530143311094-34d807799e8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80')",
            }}
          />
          <div className="px-4 pt-5 sm:p-6">
            <dl>
              <dt className="text-base font-bold tracking-wide leading-6 font-normal text-gray-600">
                Steady Tempo
              </dt>
              <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
                <div className="flex items-baseline text-2xl leading-8 font-semibold text-steel-medium">
                  {day.day}
                  <span className="ml-1 text-sm leading-5 font-medium text-gray-500">
                    mi
                  </span>
                </div>
                <div
                  title="this one is spicy"
                  className="cursor-pointer inline-flex items-center px-2.5 py-0.5 rounded-full text-md font-medium leading-5 bg-red-100 text-red-800 md:mt-2 lg:mt-0"
                >
                  <Chili />
                  <div className="ml-3">7</div>
                </div>
              </dd>
            </dl>
          </div>
        </div>
        <div className="px-4 py-5 sm:px-0 sm:py-0">
          {/* <dl className="space-y-8 sm:space-y-0">
            <Example />
          </dl> */}
          <div className="p-6">
            <p className="text-base leading-6 text-gray-500">
              I don't know, but the flag is a big plus. Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Quas cupiditate laboriosam
              fugiat.
            </p>
          </div>
          <dl className="space-y-8 sm:space-y-0">
            <div className="flex items-center justify-center mt-2">
              {/* <Threshold /> */}
            </div>
          </dl>
        </div>
      </div>
    </>
  );
};
