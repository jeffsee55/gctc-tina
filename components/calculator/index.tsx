import React, { createContext } from "react";
import { SelectField } from "./select-field";
import { TextField, TimeField } from "./text-field";
import { useMachine } from "@xstate/react";
import { useDebounce } from "../../hooks/useDebounce";
import { Machine, assign } from "xstate";
import moment from "moment";
import "moment-duration-format";
import { Boston, Olympic, World } from "./tables";

const DISTANCE_UNITS = ["km", "miles"] as const;
const PACE_UNITS = ["km", "miles", "5k", "400m"] as const;

/**
 * @mdx
 *
 * ## Calculator
 *
 * <Playground>
 * <Calculator2 />
 * </Playground>
 */
export const Calculator2 = () => {
  const [state, send] = useMachine<ToggleContext, ToggleEvent, ToggleState>(
    toggleMachine,
    {
      context: {
        meters: 42195,
        distanceUnit: "km",
        distanceFactor: 1000,
        paceFactor: 1609.34,
        paceUnit: "miles",
        milliseconds: 7299 * 1000,
        activeTab: "boston",
      },
    }
  );

  const calcRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // console.log(state.value);
    // console.log(state.context.milliseconds);
  }, [state.context]);

  const options = [
    { value: "miles", label: "per mile" },
    { value: "km", label: "per km" },
  ];
  if (state.context.meters > 5000) {
    options.push({
      value: "5k",
      label: "per 5k",
    });
  }

  if (state.context.meters < 5000) {
    options.push({
      value: "400m",
      label: "per 400m",
    });
  }
  return (
    <div className="h-screen bg-white flex w-full">
      <div className="bg-gray-100 pt-12 sm:pt-16 w-full">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl leading-9 font-extrabold text-gray-900 sm:text-4xl sm:leading-10">
              Running Pace Calculator
            </h2>
            <p className="mt-3 text-xl leading-7 text-gray-500 sm:mt-4">
              Whether you're chasing that elusive Boston qualifier or gunning
              for an Olympic trials mark, you'll find a pace for every level
              here. Be sure to check out our training plans!
            </p>
          </div>
        </div>
        <Calculator />
      </div>
    </div>
  );
};

export const Calculator = () => {
  const [state, send] = useMachine<ToggleContext, ToggleEvent, ToggleState>(
    toggleMachine,
    {
      context: {
        meters: 42195,
        distanceUnit: "km",
        distanceFactor: 1000,
        paceFactor: 1609.34,
        paceUnit: "miles",
        milliseconds: 7299 * 1000,
        activeTab: "boston",
      },
    }
  );

  const calcRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // console.log(state.value);
    // console.log(state.context.milliseconds);
  }, [state.context]);

  const options = [
    { value: "miles", label: "per mile" },
    { value: "km", label: "per km" },
  ];
  if (state.context.meters > 5000) {
    options.push({
      value: "5k",
      label: "per 5k",
    });
  }

  if (state.context.meters < 5000) {
    options.push({
      value: "400m",
      label: "per 400m",
    });
  }
  return (
    <div ref={calcRef} className="mt-10">
      <form onSubmit={(values) => console.log(values)}>
        <div className="relative">
          <div className="mx-auto">
            <div className="max-w-4xl mx-auto">
              <dl className="rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-3">
                <div className="flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r">
                  <dt>
                    <TextField
                      label="Distance"
                      onChange={(value) => {
                        send({ type: "DISTANCE", value });
                      }}
                      factor={state.context.distanceFactor}
                      value={state.context.meters}
                      name="distance"
                    />
                  </dt>
                  <dd className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                    <div className="flex justify-center items-center w-32 mx-auto">
                      <SelectField
                        name="distanceUnit"
                        label="Distance Unit"
                        onChange={(e) => {
                          const value = e.target.value;
                          const unit = DISTANCE_UNITS.find(
                            (unit) => unit === value
                          );
                          if (unit) {
                            send({
                              type: "DISTANCE_UNIT",
                              value: unit,
                            });
                          }
                        }}
                        value={state.context.distanceUnit}
                        options={[
                          { value: "miles", label: "Miles" },
                          { value: "km", label: "Kilometers" },
                        ]}
                      />
                    </div>
                  </dd>
                </div>
                <div className="flex flex-col border-t border-b border-gray-100 py-6 px-2 md:px-6 text-center sm:border-0 sm:border-l sm:border-r">
                  <dt className="">
                    <TimeField
                      label="Pace"
                      placeholder=""
                      onChange={(value) => {
                        send({ type: "PACE", value });
                      }}
                      value={
                        state.context.milliseconds /
                        (state.context.meters / state.context.paceFactor)
                      }
                      name="pace"
                    />
                  </dt>
                  <dd className="mt-2 text-lg leading-6 font-medium text-gray-500">
                    <div className="flex justify-center items-center w-32 mx-auto">
                      <SelectField
                        label="Pace Unit"
                        name="paceUnit"
                        onChange={(e) => {
                          const value = e.target.value;
                          const unit = PACE_UNITS.find(
                            (unit) => unit === value
                          );
                          if (unit) {
                            send({
                              type: "PACE_UNIT",
                              value: unit,
                            });
                          }
                        }}
                        value={state.context.paceUnit}
                        options={options}
                      />
                    </div>
                  </dd>
                </div>
                <div className="flex flex-col border-t border-gray-100 py-6 px-2 md:px-6 text-center sm:border-0 sm:border-l">
                  <dd className="">
                    <TimeField
                      label="Distance"
                      placeholder=""
                      onChange={(value) => {
                        send({ type: "DURATION", value });
                      }}
                      value={state.context.milliseconds}
                      name="distance"
                    />
                  </dd>
                  <dt className="mt-6 text-md leading-6 font-medium text-gray-500">
                    Total Time
                  </dt>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

interface ToggleStateSchema {
  states: {
    idle: {};
  };
}
type ToggleEvent =
  | { type: "DURATION"; value: number }
  | { type: "PACE"; value: number }
  | { type: "PACE_UNIT"; value: paceUnit }
  | { type: "DISTANCE"; value: number }
  | { type: "DISTANCE_UNIT"; value: distanceUnit }
  | { type: "TAB"; value: activeTab };

type ToggleState =
  | {
      value: "idle";
      context: any;
    }
  | {
      value: "calculating";
      context: any;
    };

const toggleMachine = Machine<ToggleContext, ToggleStateSchema, ToggleEvent>({
  id: "toggle",
  initial: "idle",
  states: {
    idle: {
      on: {
        DISTANCE_UNIT: {
          internal: true,
          actions: assign((_, event) => {
            switch (event.value) {
              case "km":
                return {
                  distanceUnit: event.value,
                  distanceFactor: 1000,
                };
              case "miles":
                return {
                  distanceUnit: event.value,
                  distanceFactor: 1609.34,
                };
              default:
                throw new Error(`Unknown distance unit ${event.value}`);
            }
          }),
        },
        PACE_UNIT: {
          internal: true,
          actions: assign((context, event) => {
            switch (event.value) {
              case "km":
                return {
                  paceUnit: event.value,
                  paceFactor: 1000,
                };
              case "5k":
                return {
                  paceUnit: event.value,
                  paceFactor: 5000,
                };
              case "400m":
                return {
                  paceUnit: event.value,
                  paceFactor: 400,
                };
              case "miles":
                return {
                  paceUnit: event.value,
                  paceFactor: 1609.34,
                };
              default:
                throw new Error(`Unknown pace unit ${event.value}`);
            }
          }),
        },
        DISTANCE: {
          internal: true,
          actions: assign((context, event) => {
            const currentSecondsForPace =
              context.milliseconds / (context.meters / context.paceFactor);

            const itemsInMeters = event.value / context.paceFactor;

            const rest: { [key: string]: string | number } = {};

            // Undo 5km at lower distances
            if (context.paceUnit === "5k" && event.value < 5000) {
              rest["paceUnit"] = "km";
              rest["paceFactor"] = 1000;
            }

            return {
              meters: event.value,
              milliseconds: itemsInMeters * currentSecondsForPace,
              ...rest,
            };
          }),
        },
        DURATION: {
          internal: true,
          actions: assign((context, event) => {
            return {
              milliseconds: event.value,
            };
          }),
        },
        PACE: {
          internal: true,
          actions: assign((context, event) => {
            const milliseconds =
              event.value * (context.meters / context.paceFactor);

            return {
              milliseconds,
            };
          }),
        },
        TAB: {
          internal: true,
          actions: assign((context, event) => {
            return { activeTab: event.value };
          }),
        },
      },
    },
  },
});

type distanceUnit = "miles" | "km";
type paceUnit = "miles" | "km" | "5k" | "400m";
type activeTab = "splits" | "boston" | "olympic" | "records";
type ToggleContext = {
  meters: number;
  distanceUnit: distanceUnit;
  distanceFactor: number;
  paceFactor: number;
  paceUnit: paceUnit;
  milliseconds: number;
  activeTab: activeTab;
};

const Splits = (p: ToggleContext) => {
  const props = useDebounce<ToggleContext>(p, 300);
  const [state, setState] = React.useState<{
    accum: { time: number; distance: number }[] | null;
    milliseconds: number | null;
    divider: number | null;
    message: string | null;
  }>({
    accum: null,
    milliseconds: null,
    divider: null,
    message: null,
  });

  const { accum, milliseconds, divider } = state;

  React.useEffect(() => {
    let intervals = props.meters / props.paceFactor;
    // Expensive, useless calculations are costly
    if (intervals > 100) {
      return;
    }

    const millisecondsPerInterval =
      props.milliseconds / (props.meters / props.paceFactor);
    let accum: { time: number; distance: number }[] = [];
    let meh = 0;
    let dist = 0;
    Array.from({ length: Math.floor(intervals) }, (x, i) => {
      meh += millisecondsPerInterval;
      dist += props.paceFactor;
      accum.push({ time: meh, distance: dist });
    });

    const divider = props.paceUnit === "miles" ? 1609.34 : 1000;
    const singles: { [key: string]: string } = {
      miles: "mile",
      km: "km",
      "5k": "km",
      m: "m",
    };
    const doubles: { [key: string]: string } = {
      miles: "miles",
      km: "km",
      "5k": "km",
      m: "m",
    };
    setState({
      // @ts-ignore
      intervals,
      milliseconds: props.milliseconds,
      accum,
      divider,
      singles,
      doubles,
    });
  }, [props]);

  if (!accum) {
    return <div />;
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-1">
        <nav className="overflow-scroll" style={{ height: "500px" }}>
          <ul className="overflow-hidden">
            {accum.map((interval, index) => {
              // @ts-ignore
              const displayUnit = Math.ceil(interval.distance / divider);
              return (
                <li key={interval.time} className="relative pb-6">
                  {/* Complete Step */}
                  <div className="-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-brand-600" />
                  <div className="relative flex items-center space-x-4 group focus:outline-none">
                    <div className="h-9 flex items-center">
                      <span className="text-white relative z-10 w-8 h-8 flex items-center justify-center bg-brand-600 rounded-full group-hover:bg-brand-800 group-focus:bg-brand-800 transition ease-in-out duration-150">
                        {displayUnit}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-xs leading-4 font-semibold uppercase tracking-wide">
                        {moment
                          .duration({ milliseconds: interval.time })
                          .format("h:mm:ss.SS")}
                      </h3>
                      {/* <p className="text-sm leading-5 text-gray-500"></p> */}
                    </div>
                  </div>
                </li>
              );
            })}
            <li className="relative pb-0">
              {/* Complete Step */}
              {/* <div className="-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-brand-600" /> */}
              <div className="relative flex items-center space-x-4 group focus:outline-none">
                <div className="h-9 flex items-center">
                  <span className="text-white relative z-10 w-8 h-8 flex items-center justify-center bg-brand-600 rounded-full group-hover:bg-brand-800 group-focus:bg-brand-800 transition ease-in-out duration-150">
                    F
                  </span>
                </div>
                <div className="min-w-0">
                  <h3 className="text-xs leading-4 font-semibold uppercase tracking-wide">
                    {/* @ts-ignore */}
                    {moment.duration({ milliseconds }).format("h:mm:ss.SS")}
                  </h3>
                  {/* <p className="text-sm leading-5 text-gray-500"></p> */}
                </div>
              </div>
            </li>
          </ul>
        </nav>
      </div>
      <div className="col-span-2">
        <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-8 bg-white sm:p-10 sm:pb-6">
            <div>
              <h3
                className="inline-flex px-4 py-1 rounded-full text-sm leading-5 font-semibold tracking-wide uppercase bg-indigo-100 text-steel-medium"
                id="tier-standard"
              >
                Standard
              </h3>
            </div>
            <div className="mt-4 flex items-baseline text-6xl leading-none font-extrabold">
              $49
              <span className="ml-1 text-2xl leading-8 font-medium text-gray-500">
                /mo
              </span>
            </div>
            <p className="mt-5 text-lg leading-7 text-gray-500">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            </p>
          </div>
          <div className="flex-1 flex flex-col justify-between px-6 pt-6 pb-8 bg-gray-50 space-y-6 sm:p-10 sm:pt-6">
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  {/* Heroicon name: check */}
                  <svg
                    className="h-6 w-6 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="ml-3 text-base leading-6 text-gray-700">
                  Pariatur quod similique
                </p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  {/* Heroicon name: check */}
                  <svg
                    className="h-6 w-6 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="ml-3 text-base leading-6 text-gray-700">
                  Sapiente libero doloribus modi nostrum
                </p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  {/* Heroicon name: check */}
                  <svg
                    className="h-6 w-6 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="ml-3 text-base leading-6 text-gray-700">
                  Vel ipsa esse repudiandae excepturi
                </p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  {/* Heroicon name: check */}
                  <svg
                    className="h-6 w-6 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="ml-3 text-base leading-6 text-gray-700">
                  Itaque cupiditate adipisci quibusdam
                </p>
              </li>
            </ul>
            <div className="rounded-md shadow">
              <a
                href="#"
                className="flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
                aria-describedby="tier-standard"
              >
                Get started
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// The hierarchical (recursive) schema for the states
interface LightStateSchema {
  states: {
    green: {};
    yellow: {};
    red: {
      states: {
        walk: {};
        wait: {};
        stop: {};
      };
    };
  };
}

// The events that the machine handles
type LightEvent =
  | { type: "TIMER" }
  | { type: "POWER_OUTAGE"; kind: "error" }
  | { type: "PED_COUNTDOWN"; duration: number };

// The context (extended state) of the machine
interface LightContext {
  elapsed: number;
}

const lightMachine = Machine<LightContext, LightStateSchema, LightEvent>({
  key: "light",
  initial: "green",
  context: { elapsed: 0 },
  states: {
    green: {
      on: {
        TIMER: "yellow",
        POWER_OUTAGE: "red",
      },
    },
    yellow: {
      on: {
        TIMER: "red",
        POWER_OUTAGE: "red",
      },
    },
    red: {
      on: {
        TIMER: "green",
        POWER_OUTAGE: "red",
      },
      initial: "walk",
      states: {
        walk: {
          on: {
            PED_COUNTDOWN: "wait",
          },
        },
        wait: {
          on: {
            PED_COUNTDOWN: {
              target: "stop",
              cond: (context, event) => {
                return event.duration === 0 && context.elapsed > 0;
              },
            },
          },
        },
        stop: {
          on: {
            // Transient transition
            "": { target: "#light.green" },
          },
        },
      },
    },
  },
});
