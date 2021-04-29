import React from "react";
import Cookies from "cookies";
import type * as Strava from "../../strava/types";

const secret = "c59cb40de83f45ab7624369122b86857e900ee28";
const api_url = "https://www.strava.com/api/v3";
const id = "51600";
const accessToken = "d5ea17e2142c46994055b3e03acc0d5a0d6a95ac";
const scopes = [
  // Read public segments, public routes, public profile data, public posts, public events, club feeds, and leaderboards
  "read",
  // Read private routes, private segments, and private events for the user
  "read_all",
  // Read all profile information even if the user has set their profile visibility to Followers or Only You
  "profile:read_all",
  // Update the user's weight and Functional Threshold Power (FTP), and access to star or unstar segments on their behalf
  "profile:write",
  // Read the user's activity data for activities that are visible to Everyone and Followers, excluding privacy zone data
  "activity:read",
  // The same access as activity:read, plus privacy zone data and access to read the user's activities with visibility set to Only You
  "activity:read_all",
  // Access to create manual activities and uploads, and access to edit any activities that are visible to the app, based on activity read access level
  "activity:write",
];
const oauthPage =
  "https://www.strava.com/oauth/authorize?client_id=51600&response_type=code&redirect_uri=http://localhost:2999/auth/strava-approval&approval_prompt=force&scope=profile:read_all,activity:read";

export const handleStrava = async (params) => {
  const cookies = new Cookies(params.req, params.res);
  const accessToken = cookies.get("strava-access");
  if (!accessToken) {
    return {
      redirect: {
        destination: `/auth/strava-login`,
        permanent: false,
      },
    };
  } else {
    const whoami = await fetch(`${api_url}/athlete`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const body = await whoami.json();

    return { athlete: body, accessToken };
  }
};

export const getServerSideProps = async (params) => {
  const { athlete } = await handleStrava(params);

  return { props: { athlete } };
};

export default function AuthStrava(props: { athlete: Strava.SummaryAthlete }) {
  return (
    <div>
      <div className="h-screen bg-white overflow-hidden flex">
        {/* Off-canvas menu for mobile, show/hide based on off-canvas menu state. */}
        <div className="md:hidden">
          <div className="fixed inset-0 z-40 flex">
            {/*
  Off-canvas menu overlay, show/hide based on off-canvas menu state.

  Entering: "transition-opacity ease-linear duration-300"
    From: "opacity-0"
    To: "opacity-100"
  Leaving: "transition-opacity ease-linear duration-300"
    From: "opacity-100"
    To: "opacity-0"
*/}
            <div className="fixed inset-0" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-600 opacity-75" />
            </div>
            {/*
  Off-canvas menu, show/hide based on off-canvas menu state.

  Entering: "transition ease-in-out duration-300 transform"
    From: "-translate-x-full"
    To: "translate-x-0"
  Leaving: "transition ease-in-out duration-300 transform"
    From: "translate-x-0"
    To: "-translate-x-full"
*/}
            <div className="relative max-w-xs w-full bg-white pt-5 pb-4 flex-1 flex flex-col">
              <div className="absolute top-0 right-0 -mr-14 p-1">
                <button className="h-12 w-12 rounded-full flex items-center justify-center focus:outline-none focus:bg-gray-600">
                  {/* Heroicon name: x */}
                  <svg
                    className="h-6 w-6 text-white"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  <span className="sr-only">Close sidebar</span>
                </button>
              </div>
              <div className="flex-shrink-0 px-4 flex items-center">
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/easywire-logo-purple-600-mark-gray-900-text.svg"
                  alt="Easywire"
                />
              </div>
              <div className="mt-5 flex-1 h-0 overflow-y-auto">
                <nav className="h-full flex flex-col">
                  <div className="space-y-1">
                    <a
                      href="/dashboard/dynamic"
                      className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group rounded-md py-2 px-4 flex items-center text-base font-medium"
                    >
                      {/* Heroicon name: home */}
                      <svg
                        className="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-500"
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
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        />
                      </svg>
                      Home
                    </a>
                    <a
                      href="#"
                      className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group rounded-md py-2 px-4 flex items-center text-base font-medium"
                    >
                      {/* Heroicon name: briefcase */}
                      <svg
                        className="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-500"
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
                          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      Jobs
                    </a>
                    <a
                      href="#"
                      className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group rounded-md py-2 px-4 flex items-center text-base font-medium"
                    >
                      {/* Heroicon name: document-search */}
                      <svg
                        className="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-500"
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
                          d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z"
                        />
                      </svg>
                      Applications
                    </a>
                    <a
                      href="#"
                      className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group rounded-md py-2 px-4 flex items-center text-base font-medium"
                    >
                      {/* Heroicon name: chat */}
                      <svg
                        className="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-500"
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
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                      Messages
                    </a>
                    <a
                      href="#"
                      className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group rounded-md py-2 px-4 flex items-center text-base font-medium"
                    >
                      {/* Heroicon name: users */}
                      <svg
                        className="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-500"
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
                      Team
                    </a>
                    {/* Current: "bg-purple-50 border-purple-600 text-purple-600", Default: "text-gray-600 hover:bg-gray-50 hover:text-gray-900" */}
                    <a
                      href="#"
                      className="bg-purple-50 border-purple-600 text-purple-600 group border-l-4 py-2 px-3 flex items-center text-sm font-medium"
                    >
                      {/* Heroicon name: cog */}
                      <svg
                        className="mr-3 h-6 w-6 text-purple-500"
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
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      Settings
                    </a>
                  </div>
                  <div className="mt-auto pt-10 space-y-1">
                    <a
                      href="#"
                      className="group rounded-md py-2 px-4 flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    >
                      {/* Heroicon name: question-mark-circle */}
                      <svg
                        className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500"
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
                          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Help
                    </a>
                    <a
                      href="#"
                      className="group rounded-md py-2 px-4 flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    >
                      {/* Heroicon name: cog */}
                      <svg
                        className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500"
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
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      Logout
                    </a>
                  </div>
                </nav>
              </div>
            </div>
            <div className="flex-shrink-0 w-14" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </div>
        </div>
        {/* Static sidebar for desktop */}
        <div className="hidden md:flex md:flex-shrink-0">
          <div className="w-64 flex flex-col">
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <nav className="bg-gray-50 border-r border-gray-200 pt-5 pb-4 flex flex-col flex-grow overflow-y-auto">
              <div className="flex-shrink-0 px-4 flex items-center">
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/easywire-logo-purple-600-mark-gray-900-text.svg"
                  alt="Easywire"
                />
              </div>
              <div className="flex-grow mt-5 flex flex-col">
                <div className="flex-1 space-y-1">
                  <a
                    href="/dashboard/dynamic"
                    className="border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50 group border-l-4 py-2 px-3 flex items-center text-sm font-medium"
                  >
                    {/* Heroicon name: home */}
                    <svg
                      className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500"
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
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                    Home
                  </a>
                  <a
                    href="#"
                    className="border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50 group border-l-4 py-2 px-3 flex items-center text-sm font-medium"
                  >
                    {/* Heroicon name: briefcase */}
                    <svg
                      className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500"
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
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    Jobs
                  </a>
                  <a
                    href="#"
                    className="border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50 group border-l-4 py-2 px-3 flex items-center text-sm font-medium"
                  >
                    {/* Heroicon name: document-search */}
                    <svg
                      className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500"
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
                        d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z"
                      />
                    </svg>
                    Applications
                  </a>
                  <a
                    href="#"
                    className="border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50 group border-l-4 py-2 px-3 flex items-center text-sm font-medium"
                  >
                    {/* Heroicon name: chat */}
                    <svg
                      className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500"
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
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    Messages
                  </a>
                  <a
                    href="#"
                    className="border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50 group border-l-4 py-2 px-3 flex items-center text-sm font-medium"
                  >
                    {/* Heroicon name: users */}
                    <svg
                      className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500"
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
                    Team
                  </a>
                  {/* Current: "bg-purple-50 border-purple-600 text-purple-600", Default: "border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50" */}
                  <a
                    href="#"
                    className="bg-purple-50 border-purple-600 text-purple-600 group border-l-4 flex items-center py-2 px-3 text-sm font-medium"
                    aria-current="page"
                  >
                    {/* Current: "text-purple-500", Default: "text-gray-400 group-hover:text-gray-500" */}
                    {/* Heroicon name: cog */}
                    <svg
                      className="text-purple-500 mr-3 h-6 w-6"
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
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Settings
                  </a>
                </div>
              </div>
              <div className="flex-shrink-0 block w-full">
                <a
                  href="#"
                  className="group py-2 px-4 flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                >
                  {/* Heroicon name: question-mark-circle */}
                  <svg
                    className="text-gray-400 group-hover:text-gray-500 mr-3 h-6 w-6"
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
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Help
                </a>
                <a
                  href="#"
                  className="group py-2 px-4 flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                >
                  {/* Heroicon name: cog */}
                  <svg
                    className="text-gray-400 group-hover:text-gray-500 mr-3 h-6 w-6"
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
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Logout
                </a>
              </div>
            </nav>
          </div>
        </div>
        {/* Content area */}
        <div className="flex-1 flex flex-col">
          <div className="w-full max-w-4xl mx-auto md:px-8 xl:px-0">
            <div className="relative z-10 flex-shrink-0 h-16 bg-white border-b border-gray-200 flex">
              <button className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 md:hidden">
                <span className="sr-only">Open sidebar</span>
                {/* Heroicon name: menu-alt-2 */}
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
                    d="M4 6h16M4 12h16M4 18h7"
                  />
                </svg>
              </button>
              <div className="flex-1 flex justify-between px-4 md:px-0">
                <div className="flex-1 flex">
                  <form className="w-full flex md:ml-0" action="#" method="GET">
                    <label htmlFor="search_field" className="sr-only">
                      Search
                    </label>
                    <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                        {/* Heroicon name: search */}
                        <svg
                          className="flex-shrink-0 h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <input
                        name="search_field"
                        id="search_field"
                        className="h-full w-full border-transparent py-2 pl-8 pr-3 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent focus:placeholder-gray-400 sm:hidden"
                        placeholder="Search"
                        type="search"
                      />
                      <input
                        name="search_field"
                        id="search_field"
                        className="hidden h-full w-full border-transparent py-2 pl-8 pr-3 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent focus:placeholder-gray-400 sm:block"
                        placeholder="Search jobs, applicants, and more"
                        type="search"
                      />
                    </div>
                  </form>
                </div>
                <div className="ml-4 flex items-center md:ml-6">
                  <button className="bg-white rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                    {/* Heroicon name: bell */}
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
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      />
                    </svg>
                    <span className="sr-only">View notifications</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <main
            className="flex-1 overflow-y-auto focus:outline-none"
            tabIndex={0}
          >
            <div className="relative max-w-4xl mx-auto md:px-8 xl:px-0">
              <div className="pt-10 pb-16">
                <div className="px-4 sm:px-6 md:px-0">
                  <h1 className="text-3xl font-extrabold text-gray-900">
                    Settings
                  </h1>
                </div>
                <div className="px-4 sm:px-6 md:px-0">
                  <div className="py-6">
                    {/* Tabs */}
                    <div className="lg:hidden">
                      <label htmlFor="selected-tab" className="sr-only">
                        Select a tab
                      </label>
                      <select
                        id="selected-tab"
                        name="selected-tab"
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
                      >
                        <option selected>General</option>
                        <option>Password</option>
                        <option>Notifications</option>
                        <option>Plan</option>
                        <option>Billing</option>
                        <option>Team Members</option>
                      </select>
                    </div>
                    <div className="hidden lg:block">
                      <div className="border-b border-gray-200">
                        <nav className="-mb-px flex">
                          {/* Current: "border-purple-500 text-purple-600", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                          <a
                            href="#"
                            className="border-purple-500 text-purple-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                          >
                            General
                          </a>
                          <a
                            href="#"
                            className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 whitespace-nowrap ml-8 py-4 px-1 border-b-2 font-medium text-sm"
                          >
                            Password
                          </a>
                          <a
                            href="#"
                            className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 whitespace-nowrap ml-8 py-4 px-1 border-b-2 font-medium text-sm"
                          >
                            Notifications
                          </a>
                          <a
                            href="#"
                            className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 whitespace-nowrap ml-8 py-4 px-1 border-b-2 font-medium text-sm"
                          >
                            Plan
                          </a>
                          <a
                            href="#"
                            className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 whitespace-nowrap ml-8 py-4 px-1 border-b-2 font-medium text-sm"
                          >
                            Billing
                          </a>
                          <a
                            href="#"
                            className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 whitespace-nowrap ml-8 py-4 px-1 border-b-2 font-medium text-sm"
                          >
                            Team Members
                          </a>
                        </nav>
                      </div>
                    </div>
                    {/* Description list with inline editing */}
                    <div className="mt-10 divide-y divide-gray-200">
                      <div className="space-y-1">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                          Strava Profile Information
                        </h3>
                        <p className="max-w-2xl text-sm text-gray-500">
                          This information has been obtained from Strava, edits
                          to your Strava account will be reflected here.
                        </p>
                      </div>
                      <div className="mt-6">
                        <dl className="divide-y divide-gray-200">
                          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                            <dt className="text-sm font-medium text-gray-500">
                              Name
                            </dt>
                            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                              <span className="flex-grow">
                                {props.athlete.firstname}{" "}
                                {props.athlete.lastname}
                              </span>
                              <span className="ml-4 flex-shrink-0">
                                <button
                                  type="button"
                                  className="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                >
                                  Update
                                </button>
                              </span>
                            </dd>
                          </div>
                          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
                            <dt className="text-sm font-medium text-gray-500">
                              Photo
                            </dt>
                            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                              <span className="flex-grow">
                                <img
                                  className="h-8 w-8 rounded-full"
                                  src={props.athlete.profile_medium}
                                  alt=""
                                />
                              </span>
                              <span className="ml-4 flex-shrink-0 flex items-start space-x-4">
                                <a
                                  href="https://www.strava.com/settings/profile"
                                  className="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                >
                                  Update
                                </a>
                              </span>
                            </dd>
                          </div>
                          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
                            <dt className="text-sm font-medium text-gray-500">
                              Strava ID
                            </dt>
                            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                              <span className="flex-grow">
                                {props.athlete.id}
                              </span>
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                    <div className="mt-10 divide-y divide-gray-200">
                      <div className="space-y-1">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                          Account
                        </h3>
                        <p className="max-w-2xl text-sm text-gray-500">
                          Manage how information is displayed on your account.
                        </p>
                      </div>
                      <div className="mt-6">
                        <dl className="divide-y divide-gray-200">
                          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                            <dt className="text-sm font-medium text-gray-500">
                              Preferred unit of measurement
                            </dt>
                            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                              <span className="flex-grow capitalize">
                                {props.athlete.measurement_preference}
                              </span>
                              <span className="ml-4 flex-shrink-0">
                                <a
                                  href="https://www.strava.com/settings/display"
                                  className="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                >
                                  Update
                                </a>
                              </span>
                            </dd>
                          </div>
                          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
                            <dt className="text-sm font-medium text-gray-500">
                              Date format
                            </dt>
                            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                              <span className="flex-grow">
                                {props.athlete.date_preference}
                              </span>
                              <span className="ml-4 flex-shrink-0 flex items-start space-x-4">
                                <a
                                  href=""
                                  className="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                >
                                  Update
                                </a>
                              </span>
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
