import React from "react";

export type DataT = {
  Day: number;
  Notes: "hard" | "easy" | "medium";
  Title: string;
  Description: string;
};

export const SimpleList = (props: { data: DataT[] }) => {
  return (
    <div className="bg-white lg:min-w-0 lg:flex-1">
      <div className="p-3 relative">
        {/* Dropdown menu toggle, controlling the show/hide state of dropdown menu. */}
        <div>
          <button
            type="button"
            className="group w-full bg-gray-100 rounded-md px-3.5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-purple-500"
            id="options-menu"
            aria-haspopup="true"
            aria-expanded="true"
          >
            <span className="flex w-full justify-between items-center">
              <span className="flex min-w-0 items-center justify-between space-x-3">
                <img
                  className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"
                  src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80"
                  alt=""
                />
                <div className="text-left min-w-0 pr-4">
                  <div className="text-gray-900 text-sm text-lg truncate">
                    24:00
                  </div>
                  <div className="text-gray-500 text-sm truncate">
                    10-week plan
                  </div>
                </div>
              </span>
              {/* Heroicon name: selector */}
              <svg
                className="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>

      <ul
        className="relative z-0 divide-y divide-gray-200 border-b border-gray-200"
        x-max={1}
      >
        {props.data.map((dt) => {
          return (
            <li className="relative p-2 sm:p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between space-x-4">
                {/* Repo name and link */}
                <div className="min-w-0 space-y-3">
                  <div className="flex items-center space-x-3">
                    <EffortDot effort={dt.Notes} />
                    <span className="block">
                      <h2 className="text-sm font-medium">
                        <a href="#">
                          <span
                            className="absolute inset-0"
                            aria-hidden="true"
                          />
                          {dt.Title}
                        </a>
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
                      Day {dt.Day}
                    </div>
                  </div>
                </div>
              </div>
              <div className="whitespace-pre-line mt-4 text-sm text-gray-500 group-hover:text-gray-900 font-medium">
                {dt.Description}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export const EffortDot = (props: { effort: "easy" | "medium" | "hard" }) => {
  let outerClass;
  let innerClass;
  switch (props.effort) {
    case "easy":
      outerClass = "bg-green-100";
      innerClass = "bg-green-400";
      break;
    case "medium":
      outerClass = "bg-yellow-100";
      innerClass = "bg-yellow-400";
      break;
    case "hard":
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
