import React from "react";
import { EffortDot } from "./simple-list";
import type { DataT } from "./simple-list";
import { drawLineChart } from "../d3/chart";

export const Article = (props: DataT) => {
  React.useEffect(() => {
    const run = async () => {
      await drawLineChart();
    };
    run();
  }, []);
  return (
    <article className="min-h-screen bg-gray-100">
      {/* Profile header */}
      <div className="">
        <div>
          {/* <div>
          <svg
            width={"100%"}
            height={"100%"}
            viewBox="0 0 678 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width={"100%"} height={"100%"} fill="#DDDDDD" />
            <path d="M678 0H0V200H678V0Z" fill="#DBC0C6" />
            <path d="M678 93H0V97H678V93Z" fill="#AC4B54" />
            <path d="M440 200H0V93L440 200Z" fill="#96898C" />
            <path d="M678 0H0V93H678V0Z" fill="#F0DFE3" />
            <path
              d="M597 6.83C597 34.6265 619.534 57.16 647.33 57.16C658.873 57.16 669.509 53.274 678 46.7388V0H597.46C597.157 2.23345 597 4.51345 597 6.83Z"
              fill="#DBBFC6"
            />
          </svg>
        </div> */}
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-end sm:space-x-5">
              {/* <div className="flex">
              <img
                className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
                src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80"
                alt=""
              />
            </div> */}
              <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                <div className="sm:hidden 2xl:block mt-6 min-w-0 flex-1">
                  <h1 className="text-2xl font-bold text-gray-900 truncate">
                    {props.Title}
                  </h1>
                </div>
                <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                  >
                    {/* Heroicon name: mail */}
                    <svg
                      className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <span>Message</span>
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                  >
                    {/* Heroicon name: phone */}
                    <svg
                      className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    <span>Call</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="hidden sm:block 2xl:hidden mt-6 min-w-0 flex-1">
              <h1 className="text-2xl font-bold text-gray-900 truncate">
                Ricardo Cooper
              </h1>
            </div>
          </div>
        </div>
        {/* Tabs */}

        {/* Description list */}
        <div className="mt-6 my-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Intensity</dt>
              {/* <dd className="mt-1 text-sm text-gray-900"></dd> */}
              <div className="mt-1 min-w-0 space-y-3">
                <div className="flex items-center space-x-3">
                  <EffortDot effort={props.Notes} />
                  <span className="block">
                    <h2 className="text-sm font-medium capitalize">
                      <a href="#">
                        <span className="absolute inset-0" aria-hidden="true" />
                        {props.Notes}
                      </a>
                    </h2>
                  </span>
                </div>
              </div>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Day</dt>
              <dd className="mt-1 text-sm text-gray-900">{props.Day} of 40</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Description</dt>
              <dd className="mt-1 max-w-prose text-sm text-gray-900">
                <p>{props.Description}</p>
              </dd>
            </div>
          </dl>
        </div>
        <div className="my-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-white overflow-hidden shadow py-4">
            <div className="px-6">
              <h3 className="text-lg font-medium">
                <a href="#" className="focus:outline-none">
                  {/* Extend touch target to entire panel */}
                  <span className="absolute inset-0" aria-hidden="true" />
                  This week
                </a>
              </h3>
            </div>
            <div className="w-full mx-auto py-8">
              <div className="w-96 mx-auto ">
                <svg
                  width={"100%"}
                  height={"100%"}
                  viewBox="0 0 397 144"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* <rect width={49} height={110} rx={2} fill="#C4C4C4" /> */}
                  {/* <Bar effort="easy" /> */}
                  <Bar x={116} y={73} effort="easy" />
                  {/* <rect
                    x={116}
                    y={73}
                    width={49}
                    height={37}
                    rx={2}
                    fill="#C4C4C4"
                  /> */}
                  <rect
                    x={58}
                    y={37}
                    width={49}
                    height={73}
                    rx={2}
                    fill="#C4C4C4"
                  />
                  <rect x={174} width={49} height={110} rx={2} fill="#C4C4C4" />
                  <rect
                    x={290}
                    y={73}
                    width={49}
                    height={37}
                    rx={2}
                    fill="#C4C4C4"
                  />
                  <rect
                    x={348}
                    y={73}
                    width={49}
                    height={37}
                    rx={2}
                    fill="#C4C4C4"
                  />
                  <rect
                    x={232}
                    y={37}
                    width={49}
                    height={73}
                    rx={2}
                    fill="#C4C4C4"
                  />
                  <path
                    d="M23.0718 143L20.8818 135.288H20.8159C20.9185 136.601 20.9697 137.622 20.9697 138.349V143H18.4062V132.292H22.2588L24.4927 139.895H24.5513L26.7412 132.292H30.6011V143H27.9424V138.305C27.9424 138.061 27.9448 137.79 27.9497 137.492C27.9595 137.194 27.9937 136.464 28.0522 135.302H27.9863L25.8257 143H23.0718Z"
                    fill="#C4C4C4"
                  />
                  <path
                    d="M84.9502 143H82.0571V134.658H79.4424V132.292H87.5576V134.658H84.9502V143Z"
                    fill="#C4C4C4"
                  />
                  <path
                    d="M147.929 143H144.509L143.483 138.334C143.435 138.139 143.356 137.751 143.249 137.17C143.146 136.589 143.071 136.103 143.022 135.712C142.983 136.03 142.919 136.425 142.832 136.899C142.744 137.368 142.656 137.8 142.568 138.195C142.485 138.591 142.131 140.192 141.506 143H138.085L135.434 132.292H138.225L139.389 137.661C139.653 138.847 139.833 139.792 139.931 140.495C139.995 139.997 140.107 139.321 140.268 138.466C140.434 137.612 140.588 136.904 140.729 136.342L141.674 132.292H144.355L145.271 136.342C145.427 136.992 145.585 137.741 145.747 138.591C145.908 139.44 146.015 140.075 146.069 140.495C146.132 139.953 146.306 139.013 146.589 137.675L147.775 132.292H150.566L147.929 143Z"
                    fill="#C4C4C4"
                  />
                  <path
                    d="M203.95 143H201.057V134.658H198.442V132.292H206.558V134.658H203.95V143Z"
                    fill="#C4C4C4"
                  />
                  <path
                    d="M258.463 143H255.614V132.292H261.942V134.614H258.463V136.657H261.671V138.979H258.463V143Z"
                    fill="#C4C4C4"
                  />
                  <path
                    d="M318.331 139.748C318.331 140.412 318.162 141.003 317.825 141.521C317.488 142.033 317.002 142.434 316.368 142.722C315.733 143.005 314.988 143.146 314.134 143.146C313.421 143.146 312.823 143.098 312.339 143C311.856 142.897 311.353 142.722 310.831 142.473V139.895C311.382 140.178 311.956 140.4 312.552 140.561C313.147 140.717 313.694 140.795 314.192 140.795C314.622 140.795 314.937 140.722 315.137 140.576C315.337 140.424 315.438 140.231 315.438 139.997C315.438 139.851 315.396 139.724 315.313 139.616C315.235 139.504 315.105 139.392 314.925 139.279C314.749 139.167 314.275 138.938 313.504 138.591C312.806 138.273 312.281 137.966 311.929 137.668C311.583 137.37 311.324 137.028 311.153 136.643C310.987 136.257 310.904 135.8 310.904 135.273C310.904 134.287 311.263 133.518 311.98 132.966C312.698 132.414 313.685 132.138 314.939 132.138C316.048 132.138 317.178 132.395 318.331 132.907L317.444 135.141C316.443 134.682 315.579 134.453 314.852 134.453C314.476 134.453 314.202 134.519 314.031 134.65C313.86 134.782 313.775 134.946 313.775 135.141C313.775 135.351 313.882 135.539 314.097 135.705C314.317 135.871 314.908 136.174 315.87 136.613C316.792 137.028 317.432 137.475 317.789 137.954C318.15 138.427 318.331 139.025 318.331 139.748Z"
                    fill="#C4C4C4"
                  />
                  <path
                    d="M374.331 139.748C374.331 140.412 374.162 141.003 373.825 141.521C373.488 142.033 373.002 142.434 372.368 142.722C371.733 143.005 370.988 143.146 370.134 143.146C369.421 143.146 368.823 143.098 368.339 143C367.856 142.897 367.353 142.722 366.831 142.473V139.895C367.382 140.178 367.956 140.4 368.552 140.561C369.147 140.717 369.694 140.795 370.192 140.795C370.622 140.795 370.937 140.722 371.137 140.576C371.337 140.424 371.438 140.231 371.438 139.997C371.438 139.851 371.396 139.724 371.313 139.616C371.235 139.504 371.105 139.392 370.925 139.279C370.749 139.167 370.275 138.938 369.504 138.591C368.806 138.273 368.281 137.966 367.929 137.668C367.583 137.37 367.324 137.028 367.153 136.643C366.987 136.257 366.904 135.8 366.904 135.273C366.904 134.287 367.263 133.518 367.98 132.966C368.698 132.414 369.685 132.138 370.939 132.138C372.048 132.138 373.178 132.395 374.331 132.907L373.444 135.141C372.443 134.682 371.579 134.453 370.852 134.453C370.476 134.453 370.202 134.519 370.031 134.65C369.86 134.782 369.775 134.946 369.775 135.141C369.775 135.351 369.882 135.539 370.097 135.705C370.317 135.871 370.908 136.174 371.87 136.613C372.792 137.028 373.432 137.475 373.789 137.954C374.15 138.427 374.331 139.025 374.331 139.748Z"
                    fill="#C4C4C4"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        {/* Team member list */}
        <div className="my-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Info />
        </div>
      </div>
    </article>
  );
};

const Info = () => {
  return (
    <div className="rounded-lg bg-gray-200 overflow-hidden shadow divide-y divide-gray-200 sm:divide-y-0 sm:grid sm:grid-cols-2 sm:gap-px">
      <div className="rounded-tl-lg rounded-tr-lg sm:rounded-tr-none relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-steel-light">
        <div>
          <span className="rounded-lg inline-flex p-3 bg-teal-50 text-teal-700 ring-4 ring-white">
            {/* Heroicon name: clock */}
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </span>
        </div>
        <div className="mt-8">
          <h3 className="text-lg font-medium">
            <a href="#" className="focus:outline-none">
              {/* Extend touch target to entire panel */}
              <span className="absolute inset-0" aria-hidden="true" />
              Did you know?
            </a>
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Doloribus dolores nostrum quia qui natus officia quod et dolorem.
            Sit repellendus qui ut at blanditiis et quo et molestiae.
          </p>
        </div>
        <span
          className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
          aria-hidden="true"
        >
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
          </svg>
        </span>
      </div>
      <div className="sm:rounded-tr-lg relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-steel-light">
        <div>
          <span className="rounded-lg inline-flex p-3 bg-purple-50 text-purple-700 ring-4 ring-white">
            {/* Heroicon name: badge-check */}
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              />
            </svg>
          </span>
        </div>
        <div className="mt-8">
          <h3 className="text-lg font-medium">
            <a href="#" className="focus:outline-none">
              {/* Extend touch target to entire panel */}
              <span className="absolute inset-0" aria-hidden="true" />
              Recovery Day
            </a>
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Recovery days play an important role in training. Without proper
            recovery you'll actually start to reverse your fitness, and hard
            work becomes harmful.
          </p>
        </div>
        <span
          className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
          aria-hidden="true"
        >
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
          </svg>
        </span>
      </div>
      <div className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-steel-light">
        <div>
          <span className="rounded-lg inline-flex p-3 bg-light-blue-50 text-light-blue-700 ring-4 ring-white">
            {/* Heroicon name: users */}
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </span>
        </div>
        <div className="mt-8">
          <h3 className="text-lg font-medium">
            <a href="#" className="focus:outline-none">
              {/* Extend touch target to entire panel */}
              <span className="absolute inset-0" aria-hidden="true" />
              Stretch it out
            </a>
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Check out tips on relaxing those tight muscles by watching our
            Youtube vidoes
          </p>
        </div>
        <span
          className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
          aria-hidden="true"
        >
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
          </svg>
        </span>
      </div>
      <div className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-steel-light">
        <div>
          <span className="rounded-lg inline-flex p-3 bg-yellow-50 text-yellow-700 ring-4 ring-white">
            {/* Heroicon name: cash */}
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </span>
        </div>
        <div className="mt-8">
          <h3 className="text-lg font-medium">
            <a href="#" className="focus:outline-none">
              {/* Extend touch target to entire panel */}
              <span className="absolute inset-0" aria-hidden="true" />
              Nutrition tip of the week
            </a>
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Jen's gluten-free brownies are a must! Check out her recipe and
            guide for making them yourself here
          </p>
        </div>
        <span
          className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
          aria-hidden="true"
        >
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
          </svg>
        </span>
      </div>
      <div className="sm:rounded-bl-lg relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-steel-light">
        <div>
          <span className="rounded-lg inline-flex p-3 bg-rose-50 text-rose-700 ring-4 ring-white">
            {/* Heroicon name: receipt-refund */}
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z"
              />
            </svg>
          </span>
        </div>
        <div className="mt-8">
          <h3 className="text-lg font-medium">
            <a href="#" className="focus:outline-none">
              {/* Extend touch target to entire panel */}
              <span className="absolute inset-0" aria-hidden="true" />
              Submit an expense
            </a>
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Doloribus dolores nostrum quia qui natus officia quod et dolorem.
            Sit repellendus qui ut at blanditiis et quo et molestiae.
          </p>
        </div>
        <span
          className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
          aria-hidden="true"
        >
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
          </svg>
        </span>
      </div>
      <div className="rounded-bl-lg rounded-br-lg sm:rounded-bl-none relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-steel-light">
        <div>
          <span className="rounded-lg inline-flex p-3 bg-indigo-50 text-steel-dark ring-4 ring-white">
            {/* Heroicon name: academic-cap */}
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
              <path
                fill="#fff"
                d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
              />
            </svg>
          </span>
        </div>
        <div className="mt-8">
          <h3 className="text-lg font-medium">
            <a href="#" className="focus:outline-none">
              {/* Extend touch target to entire panel */}
              <span className="absolute inset-0" aria-hidden="true" />
              Training
            </a>
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            This is your 3rd week, it's common to feel a little fatigue during
            this time. Be sure to eat right and take plenty of rest, you got
            this!
          </p>
        </div>
        <span
          className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
          aria-hidden="true"
        >
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
          </svg>
        </span>
      </div>
    </div>
  );
};

const Bar = (props: {
  x: number;
  y: number;
  effort: "easy" | "medium" | "hard";
}) => {
  let height;
  switch (props.effort) {
    case "easy":
      height = 110;
      break;
    case "medium":
      height = 73;
      break;
    case "hard":
      height = 37;
      break;
  }
  return (
    <rect
      x={props.y}
      y={props.y}
      width={49}
      height={height}
      rx={2}
      fill="#C4C4C4"
    />
  );
};
