import React, { createContext } from "react";
import moment, { parseZone } from "moment";
import "moment-duration-format";

export const Boston = ({ onClick }: { onClick: (value: number) => void }) => {
  // const mensTimes = [
  //   { group: 'Ages 18 - 34', milliseconds: 11100000 },
  //   { group: 'Ages 35 - 45', milliseconds: 11400000 },
  // ];

  const mensTimes = [
    { group: "18-34", milliseconds: 10800000 },
    { group: "35-39", milliseconds: 11100000 },
    { group: "40-44", milliseconds: 11400000 },
    { group: "45-49", milliseconds: 12000000 },
    { group: "50-54", milliseconds: 12300000 },
    { group: "55-59", milliseconds: 12900000 },
    { group: "60-64", milliseconds: 13800000 },
    { group: "65-69", milliseconds: 14700000 },
    { group: "70-74", milliseconds: 15600000 },
    { group: "75-79", milliseconds: 16500000 },
    { group: "80 and over", milliseconds: 17400000 },
  ];
  const womensTimes = [
    { group: "18-34", milliseconds: 12600000 },
    { group: "35-39", milliseconds: 12900000 },
    { group: "40-44", milliseconds: 13200000 },
    { group: "45-49", milliseconds: 13800000 },
    { group: "50-54", milliseconds: 14100000 },
    { group: "55-59", milliseconds: 14700000 },
    { group: "60-64", milliseconds: 15600000 },
    { group: "65-69", milliseconds: 16500000 },
    { group: "70-74", milliseconds: 17400000 },
    { group: "75-79", milliseconds: 18300000 },
    { group: "80 and over", milliseconds: 19200000 },
  ];
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="col-span-1 shadow overflow-hidden sm:rounded-md">
        <div className="px-4 pt-4 md:px-6 text-xl md: text-2xl font-display font-extrabold">
          Women
        </div>
        <div className="bg-white overflow-hidden sm:rounded-md">
          <ul>
            {womensTimes.map((time) => {
              return (
                <li>
                  <a
                    href="#"
                    onClick={() => onClick(time.milliseconds)}
                    className="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out"
                  >
                    <div className="px-4 py-4 flex items-center sm:px-6">
                      <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                          <div className="text-sm leading-5 font-medium text-teal-600 truncate">
                            Ages {time.group}
                          </div>
                        </div>
                        <div className="mt-4  sm:mt-0 text-gray-600">
                          {moment
                            .duration({ milliseconds: time.milliseconds })
                            .format("h:mm:ss")}
                        </div>
                      </div>
                    </div>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="col-span-1 shadow overflow-hidden sm:rounded-md">
        <div className="px-4 pt-4 md:px-6 text-xl md: text-2xl font-display font-extrabold">
          Men
        </div>
        <div className="bg-white overflow-hidden sm:rounded-md">
          <ul>
            {mensTimes.map((time) => {
              return (
                <li>
                  <a
                    href="#"
                    onClick={() => onClick(time.milliseconds)}
                    className="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out"
                  >
                    <div className="px-4 py-4 flex items-center sm:px-6">
                      <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                          <div className="text-sm leading-5 font-medium text-teal-600 truncate">
                            Ages {time.group}
                          </div>
                        </div>
                        <div className="mt-4  sm:mt-0 text-gray-600">
                          {moment
                            .duration({ milliseconds: time.milliseconds })
                            .format("h:mm:ss")}
                        </div>
                      </div>
                    </div>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export const Olympic = ({
  onClick,
}: {
  onClick: (value: { meters: number; milliseconds: number }) => void;
}) => {
  const womensTimes = [
    { group: "100m", meters: 100, milliseconds: 11150 },
    { group: "200m", meters: 200, milliseconds: 22800 },
    { group: "400m", meters: 400, milliseconds: 51350 },
    { group: "800m", meters: 800, milliseconds: 119500 },
    { group: "1500m", meters: 1500, milliseconds: 244200 },
    { group: "3k Steeple", meters: 3000, milliseconds: 570000 },
    { group: "5000m", meters: 5000, milliseconds: 910000 },
    { group: "10000m", meters: 10000, milliseconds: 1885000 },
    { group: "Marathon", meters: 42195, milliseconds: 8979000 },
  ];
  const mensTimes = [
    { group: "100m", meters: 100, milliseconds: 10050 },
    { group: "200m", meters: 200, milliseconds: 20240 },
    { group: "400m", meters: 400, milliseconds: 44900 },
    { group: "800m", meters: 800, milliseconds: 105200 },
    { group: "1500m", meters: 1500, milliseconds: 215000 },
    { group: "3k Steeple", meters: 3000, milliseconds: 502000 },
    { group: "5000m", meters: 5000, milliseconds: 793500 },
    { group: "10000m", meters: 10000, milliseconds: 1648000 },
    { group: "Marathon", meters: 42195, milliseconds: 7890000 },
  ];
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="col-span-1 shadow overflow-hidden sm:rounded-md">
        <div className="px-4 pt-4 md:px-6 text-xl md: text-2xl font-display font-extrabold">
          Women
        </div>
        <div className="bg-white overflow-hidden sm:rounded-md">
          <ul>
            {womensTimes.reverse().map((time) => {
              return (
                <li>
                  <a
                    href="#"
                    onClick={() =>
                      onClick({
                        meters: time.meters,
                        milliseconds: time.milliseconds,
                      })
                    }
                    className="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out"
                  >
                    <div className="px-4 py-4 flex items-center sm:px-6">
                      <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                          <div className="text-sm leading-5 font-medium text-teal-600 truncate">
                            {time.group}
                          </div>
                        </div>
                        <div className="mt-4  sm:mt-0 text-gray-600">
                          {moment
                            .duration({ milliseconds: time.milliseconds })
                            .format("h:mm:ss.SS")}
                        </div>
                      </div>
                    </div>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="col-span-1 shadow overflow-hidden sm:rounded-md">
        <div className="px-4 pt-4 md:px-6 text-xl md: text-2xl font-display font-extrabold">
          Men
        </div>
        <div className="bg-white overflow-hidden sm:rounded-md">
          <ul>
            {mensTimes.reverse().map((time) => {
              return (
                <li>
                  <a
                    href="#"
                    onClick={() =>
                      onClick({
                        meters: time.meters,
                        milliseconds: time.milliseconds,
                      })
                    }
                    className="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out"
                  >
                    <div className="px-4 py-4 flex items-center sm:px-6">
                      <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                          <div className="text-sm leading-5 font-medium text-teal-600 truncate">
                            {time.group}
                          </div>
                        </div>
                        <div className="mt-4  sm:mt-0 text-gray-600">
                          {moment
                            .duration({ milliseconds: time.milliseconds })
                            .format("h:mm:ss.SS")}
                        </div>
                      </div>
                    </div>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export const World = ({
  onClick,
}: {
  onClick: (value: { meters: number; milliseconds: number }) => void;
}) => {
  const mensTimes = [
    { group: "100m", meters: 100, milliseconds: 9580 },
    { group: "200m", meters: 200, milliseconds: 19190 },
    { group: "400m", meters: 400, milliseconds: 43030 },
    { group: "800m", meters: 800, milliseconds: 100910 },
    { group: "1500m", meters: 1500, milliseconds: 206000 },
    { group: "Mile", meters: 1609.34, milliseconds: 223130 },
    { group: "3k Steeple", meters: 3000, milliseconds: 473630 },
    { group: "5000m", meters: 5000, milliseconds: 755360 },
    { group: "10000m", meters: 10000, milliseconds: 1576530 },
    { group: "Half Marathon", meters: 42195 / 2, milliseconds: 3481000 },
    { group: "Marathon", meters: 42195, milliseconds: 7299220 },
  ];
  const womensTimes = [
    { group: "100m", meters: 100, milliseconds: 10490 },
    { group: "200m", meters: 200, milliseconds: 21320 },
    { group: "400m", meters: 400, milliseconds: 47600 },
    { group: "800m", meters: 800, milliseconds: 113280 },
    { group: "1500m", meters: 1500, milliseconds: 230070 },
    { group: "Mile", meters: 1609.34, milliseconds: 252330 },
    { group: "3k Steeple", meters: 3000, milliseconds: 524320 },
    { group: "5000m", meters: 5000, milliseconds: 851150 },
    { group: "10000m", meters: 10000, milliseconds: 1757450 },
    { group: "Half Marathon", meters: 42195 / 2, milliseconds: 3934000 },
    { group: "Marathon", meters: 42195, milliseconds: 8221000 },
  ];
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="col-span-1 shadow overflow-hidden sm:rounded-md">
        <div className="px-4 pt-4 md:px-6 text-xl md: text-2xl font-display font-extrabold">
          Women
        </div>
        <div className="bg-white overflow-hidden sm:rounded-md">
          <ul>
            {womensTimes.reverse().map((time) => {
              return (
                <li>
                  <a
                    href="#"
                    onClick={() =>
                      onClick({
                        meters: time.meters,
                        milliseconds: time.milliseconds,
                      })
                    }
                    className="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out"
                  >
                    <div className="px-4 py-4 flex items-center sm:px-6">
                      <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                          <div className="text-sm leading-5 font-medium text-teal-600 truncate">
                            {time.group}
                          </div>
                        </div>
                        <div className="mt-4  sm:mt-0 text-gray-600">
                          {moment
                            .duration({ milliseconds: time.milliseconds })
                            .format("h:mm:ss.SS")}
                        </div>
                      </div>
                    </div>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="col-span-1 shadow overflow-hidden sm:rounded-md">
        <div className="px-4 pt-4 md:px-6 text-xl md: text-2xl font-display font-extrabold">
          Men
        </div>
        <div className="bg-white overflow-hidden sm:rounded-md">
          <ul>
            {mensTimes.reverse().map((time) => {
              return (
                <li>
                  <a
                    href="#"
                    onClick={() =>
                      onClick({
                        meters: time.meters,
                        milliseconds: time.milliseconds,
                      })
                    }
                    className="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out"
                  >
                    <div className="px-4 py-4 flex items-center sm:px-6">
                      <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                          <div className="text-sm leading-5 font-medium text-teal-600 truncate">
                            {time.group}
                          </div>
                        </div>
                        <div className="mt-4  sm:mt-0 text-gray-600">
                          {moment
                            .duration({ milliseconds: time.milliseconds })
                            .format("h:mm:ss.SS")}
                        </div>
                      </div>
                    </div>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
