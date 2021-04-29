import React, { useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { Duration } from "luxon";
import { tenK, fiveK, halfMarathon, marathon } from "../../data/paces";

const people = [
  "Wade Cooper",
  "Arlene Mccoy",
  "Devon Webb",
  "Tom Cook",
  "Tanya Fox",
  "Hellen Schmidt",
  "Caroline Schultz",
  "Mason Heaney",
  "Claudie Smitham",
  "Emil Schaefer",
];

export const colonizeNumber = (item, unit = "time") => {
  // We are showing miles, not pace
  if (unit === "mileage") {
    return item;
  } else {
    return item
      .toString()
      .split(/(?=(?:\d{2})+(?:\.|$))/g)
      .join(":");
  }
};
export const ListBox = (props: {
  onSelect: (value: typeof fiveK.pro.paces[0]) => void;
  activePace: typeof fiveK.pro.paces[0];
  zones: typeof fiveK.pro.ranges;
  paces: typeof fiveK.pro.paces;
}) => {
  if (!props.paces) {
    return null;
  }

  return (
    <div className="w-full mt-5">
      <Listbox
        as="div"
        className="space-y-1"
        value={props.activePace}
        onChange={props.onSelect}
      >
        {({ open }) => (
          <>
            <Listbox.Label className="block text-sm leading-5 font-medium text-gray-700">
              Choose a pace
            </Listbox.Label>
            <div className="relative">
              <span className="inline-block w-full rounded-md shadow-sm">
                <Listbox.Button className="cursor-pointer relative w-full rounded-md border border-gray-300 bg-white hover:bg-gray-50 pl-3 pr-10 py-2 text-left focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                  {/* <span className="block truncate">{props.activePace}</span> */}
                  <span className="block truncate">
                    <span
                      className={`${
                        false ? "font-semibold" : "font-normal"
                      } block truncate`}
                    >
                      <div
                        className={`text-xl font-extrabold ${
                          false ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {props.activePace
                          ? colonizeNumber(props.activePace.value)
                          : "--"}
                      </div>
                      <div
                        className={`text-small font-medium ${
                          false ? "text-gray-100" : "text-gray-500"
                        }`}
                      >
                        {props.activePace
                          ? `${props.zones[props.activePace.zone].mileage.join(
                              " to "
                            )} miles per week`
                          : "--"}
                      </div>
                    </span>
                  </span>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </Listbox.Button>
              </span>

              <Transition
                show={open}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                className="absolute z-20 mt-1 w-full rounded-md bg-white shadow-lg"
              >
                <Listbox.Options
                  static
                  className="max-h-60 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5"
                >
                  {props.paces.map((pace) => (
                    <Listbox.Option key={JSON.stringify(pace)} value={pace}>
                      {({ selected, active }) => (
                        <div
                          className={`${
                            active
                              ? "text-white bg-steel-dark"
                              : "text-gray-900"
                          }  z-10 relative cursor-pointer select-none relative py-2 pl-8 pr-4`}
                        >
                          <span
                            className={`${
                              selected ? "font-semibold" : "font-normal"
                            } block truncate`}
                          >
                            <div
                              className={`text-xl font-extrabold ${
                                active ? "text-white" : "text-gray-900"
                              }`}
                            >
                              {colonizeNumber(pace.value)}
                            </div>
                            <div
                              className={`text-small font-medium ${
                                active ? "text-gray-100" : "text-gray-500"
                              }`}
                            >
                              {props.zones[pace.zone].mileage.join(" to ")} mpw
                            </div>
                          </span>
                          {selected && (
                            <span
                              className={`${
                                active ? "text-white" : "text-steel-medium"
                              } absolute inset-y-0 left-0 flex items-center pl-1.5`}
                            >
                              <svg
                                className="h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </span>
                          )}
                        </div>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  );
};
