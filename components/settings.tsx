import React from "react";
import { NavLink, useParams, useLocation } from "react-router-dom";
import { Logo } from "../components/logo";

type IconName = "cog" | "briefcase" | "calendar" | "calculator";
type LinkT = { icon: IconName; label: string; value: string };

export const Dashboard = ({
  links,
  children,
}: {
  links: LinkT[];
  children: React.ReactNode;
}) => {
  return (
    <div className="h-screen bg-white overflow-hidden flex">
      <MobileNav links={links} />
      <Nav links={links} />
      {children}
    </div>
  );
};

const MobileNav = ({ links }: { links: LinkT[] }) => {
  return (
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
        <div className="fixed inset-0">
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
              <svg
                className="h-6 w-6 text-white"
                stroke="currentColor"
                viewBox="0 0 24 24"
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
              src="https://tailwindui.com/img/logos/easywire-logo-purple-600-gray-900.svg"
              alt="Easywire"
            />
          </div>
          <div className="mt-5 flex-1 h-0 overflow-y-auto">
            <nav className="h-full flex flex-col">
              <div className="space-y-1">
                <a
                  href="#"
                  className="group rounded-md py-2 px-4 flex items-center text-base leading-6 font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-100 transition ease-in-out duration-150"
                >
                  {/* Heroicon name: home */}
                  <svg
                    className="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
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
                  className="group rounded-md py-2 px-4 flex items-center text-base leading-6 font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-100 transition ease-in-out duration-150"
                >
                  {/* Heroicon name: briefcase */}
                  <svg
                    className="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
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
                  className="group rounded-md py-2 px-4 flex items-center text-base leading-6 font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-100 transition ease-in-out duration-150"
                >
                  {/* Heroicon name: document-search */}
                  <svg
                    className="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
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
                  className="group rounded-md py-2 px-4 flex items-center text-base leading-6 font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-100 transition ease-in-out duration-150"
                >
                  {/* Heroicon name: chat */}
                  Messages
                </a>
                <a
                  href="#"
                  className="group rounded-md py-2 px-4 flex items-center text-base leading-6 font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-100 transition ease-in-out duration-150"
                >
                  {/* Heroicon name: users */}
                  <svg
                    className="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
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
                <a
                  href="#"
                  className="group flex items-center py-2 px-3 text-sm leading-5 font-medium text-purple-600 bg-purple-50 border-l-4 border-purple-600 focus:outline-none focus:bg-purple-100 transition ease-in-out duration-150"
                >
                  {/* Heroicon name: cog */}
                  <svg
                    className="mr-3 h-6 w-6 text-purple-500 transition ease-in-out duration-150"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
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
                  className="group rounded-md py-2 px-4 flex items-center text-sm leading-5 font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition ease-in-out duration-150"
                >
                  {/* Heroicon name: question-mark-circle */}
                  <svg
                    className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
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
                  className="group rounded-md py-2 px-4 flex items-center text-sm leading-5 font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition ease-in-out duration-150"
                >
                  {/* Heroicon name: cog */}
                  <svg
                    className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
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
        <div className="flex-shrink-0 w-14">
          {/* Dummy element to force sidebar to shrink to fit close icon */}
        </div>
      </div>
    </div>
  );
};

const Nav = ({ links }: { links: LinkT[] }) => {
  const l = useLocation();
  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="w-64 flex flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <nav className="bg-gray-50 border-r border-gray-200 pt-5 pb-4 flex flex-col flex-grow overflow-y-auto">
          <div className="flex-shrink-0 px-4 flex items-center">
            <a href="/">
              <Logo />
            </a>
          </div>
          <div className="flex-grow mt-5 flex flex-col">
            <div className="flex-1 space-y-1">
              {links.map((link) => {
                const className = "mr-3 h-6 w-6";
                const navClassName =
                  "group flex items-center py-2 px-4 text-sm leading-5 font-medium text-gray-600 border-l-4 border-transparent hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition ease-in-out duration-150";
                const activeNavClassName =
                  "text-purple-600 bg-purple-50 border-l-4 border-purple-600 focus:outline-none focus:bg-purple-100 transition ease-in-out duration-150 hover:text-gray-900 hover:bg-purple-50 focus:outline-none focus:text-purple-900 focus:bg-purple-50";

                return (
                  <NavLink
                    to={link.value}
                    className={navClassName}
                    activeClassName={activeNavClassName}
                  >
                    <Icon className={className} name={link.icon} />
                    {link.label}
                  </NavLink>
                );
              })}
            </div>
          </div>
          <div className="flex-shrink-0 block w-full">
            <a
              href="#"
              className="group rounded-md py-2 px-4 flex items-center text-sm leading-5 font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition ease-in-out duration-150"
            >
              {/* Heroicon name: question-mark-circle */}
              <svg
                className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
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
              className="group rounded-md py-2 px-4 flex items-center text-sm leading-5 font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition ease-in-out duration-150"
            >
              {/* Heroicon name: cog */}
              <svg
                className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
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
  );
};

type SettingsLinkT = { label: string; value: string };

export const Settings = ({
  links,
  children,
}: {
  links: SettingsLinkT[];
  children: React.ReactNode;
}) => {
  return (
    <div className="flex-1 flex flex-col">
      <div className="w-full max-w-4xl mx-auto md:px-8 xl:px-0">
        <div className="relative z-10 flex-shrink-0 h-16 bg-white border-b border-gray-200 flex">
          <button
            className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:bg-gray-100 focus:text-gray-600 md:hidden"
            aria-label="Open sidebar"
          >
            <svg
              className="h-6 w-6"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
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
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    id="search_field"
                    className="h-full w-full rounded-md py-2 pl-8 pr-3 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 sm:hidden"
                    placeholder="Search"
                    type="search"
                  />
                  <input
                    id="search_field"
                    className="hidden h-full w-full rounded-md py-2 pl-8 pr-3 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 sm:block"
                    placeholder="Search jobs, applicants, and more"
                    type="search"
                  />
                </div>
              </form>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              <button className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:shadow-outline focus:text-gray-500">
                <svg
                  className="h-6 w-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <div className="sr-only">Notifications</div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <main className="flex-1 overflow-y-auto focus:outline-none" tabIndex={0}>
        <div className="relative max-w-4xl mx-auto md:px-8 xl:px-0">
          <div className="pt-10 pb-16">
            <div className="px-4 sm:px-6 md:px-0">
              <h1 className="text-3xl leading-9 font-extrabold text-gray-900">
                Settings
              </h1>
            </div>
            <div className="px-4 sm:px-6 md:px-0">
              <div className="py-6">
                {/* Tabs */}
                <div className="lg:hidden">
                  <select
                    aria-label="Selected tab"
                    className="mt-1 form-select block w-full pl-3 pr-10 py-2 text-base leading-6 border-gray-300 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 transition ease-in-out duration-150"
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
                      {links.map((link, index) => {
                        const linkClass = `whitespace-no-wrap ${
                          index !== 0 ? "ml-8" : ""
                        } py-4 px-1 border-b-2 border-transparent font-medium text-sm leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300`;
                        const activeLinkClass =
                          "whitespace-no-wrap py-4 px-1 border-b-2 border-purple-500 font-medium text-sm leading-5 text-purple-600 focus:outline-none focus:text-purple-800 focus:border-purple-700";
                        return (
                          <NavLink
                            to={link.value}
                            className={linkClass}
                            activeClassName={activeLinkClass}
                          >
                            {link.label}
                          </NavLink>
                        );
                      })}
                    </nav>
                  </div>
                </div>
                {children}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export const General = () => {
  return (
    <div>
      {/* Description list with inline editing */}
      <div className="mt-10 space-y-6 divide-y divide-gray-200">
        <div className="space-y-1">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Profile
          </h3>
          <p className="max-w-2xl text-sm leading-5 text-gray-500">
            This information will be displayed publicly so be careful what you
            share.
          </p>
        </div>
        <div>
          <dl className="divide-y divide-gray-200">
            <div className="py-4 space-y-1 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm leading-5 font-medium text-gray-500">
                Name
              </dt>
              <dd className="flex space-x-4 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                <span className="flex-grow">Chelsea Hagon</span>
                <span className="flex-shrink-0">
                  <button
                    type="button"
                    className="font-medium text-purple-600 hover:text-purple-500 transition duration-150 ease-in-out"
                  >
                    Update
                  </button>
                </span>
              </dd>
            </div>
            <div className="py-4 space-y-1 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
              <dt className="text-sm leading-5 font-medium text-gray-500">
                Photo
              </dt>
              <dd className="flex space-x-4 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                <span className="flex-grow">
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </span>
                <span className="flex-shrink-0 flex items-start space-x-4">
                  <button
                    type="button"
                    className="font-medium text-purple-600 hover:text-purple-500 transition duration-150 ease-in-out"
                  >
                    Update
                  </button>
                  <span className="text-gray-300" aria-hidden="true">
                    |
                  </span>
                  <button
                    type="button"
                    className="font-medium text-purple-600 hover:text-purple-500 transition duration-150 ease-in-out"
                  >
                    Remove
                  </button>
                </span>
              </dd>
            </div>
            <div className="py-4 space-y-1 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
              <dt className="text-sm leading-5 font-medium text-gray-500">
                Email
              </dt>
              <dd className="flex space-x-4 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                <span className="flex-grow">chelsea.hagon@example.com</span>
                <span className="flex-shrink-0">
                  <button
                    type="button"
                    className="font-medium text-purple-600 hover:text-purple-500 transition duration-150 ease-in-out"
                  >
                    Update
                  </button>
                </span>
              </dd>
            </div>
            <div className="py-4 space-y-1 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200">
              <dt className="text-sm leading-5 font-medium text-gray-500">
                Job title
              </dt>
              <dd className="flex space-x-4 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                <span className="flex-grow">Human Resources Manager</span>
                <span className="flex-shrink-0">
                  <button
                    type="button"
                    className="font-medium text-purple-600 hover:text-purple-500 transition duration-150 ease-in-out"
                  >
                    Update
                  </button>
                </span>
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="mt-10 space-y-6 divide-y divide-gray-200">
        <div className="space-y-1">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Account
          </h3>
          <p className="max-w-2xl text-sm leading-5 text-gray-500">
            Manage how information is displayed on your account.
          </p>
        </div>
        <div>
          <dl className="divide-y divide-gray-200">
            <div className="py-4 space-y-1 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm leading-5 font-medium text-gray-500">
                Language
              </dt>
              <dd className="flex space-x-4 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                <span className="flex-grow">English</span>
                <span className="flex-shrink-0">
                  <button
                    type="button"
                    className="font-medium text-purple-600 hover:text-purple-500 transition duration-150 ease-in-out"
                  >
                    Update
                  </button>
                </span>
              </dd>
            </div>
            <div className="py-4 space-y-1 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
              <dt className="text-sm leading-5 font-medium text-gray-500">
                Date format
              </dt>
              <dd className="flex space-x-4 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                <span className="flex-grow">DD-MM-YYYY</span>
                <span className="flex-shrink-0 flex items-start space-x-4">
                  <button
                    type="button"
                    className="font-medium text-purple-600 hover:text-purple-500 transition duration-150 ease-in-out"
                  >
                    Update
                  </button>
                  <span className="text-gray-300" aria-hidden="true">
                    |
                  </span>
                  <button
                    type="button"
                    className="font-medium text-purple-600 hover:text-purple-500 transition duration-150 ease-in-out"
                  >
                    Remove
                  </button>
                </span>
              </dd>
            </div>
            <div className="py-4 space-y-1 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
              <dt className="text-sm leading-5 font-medium text-gray-500">
                Automatic timezone
              </dt>
              <dd className="flex text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                {/* On: "bg-purple-600", Off: "bg-gray-200" */}
                <span
                  role="checkbox"
                  tabIndex={0}
                  aria-checked="true"
                  className="bg-gray-200 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:shadow-outline sm:ml-auto"
                >
                  {/* On: "translate-x-5", Off: "translate-x-0" */}
                  <span
                    aria-hidden="true"
                    className="translate-x-0 inline-block h-5 w-5 rounded-full bg-white shadow transform transition ease-in-out duration-200"
                  />
                </span>
              </dd>
            </div>
            <div className="py-4 space-y-1 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200">
              <dt className="text-sm leading-5 font-medium text-gray-500">
                Auto-update applicant data
              </dt>
              <dd className="flex text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                {/* On: "bg-purple-600", Off: "bg-gray-200" */}
                <span
                  role="checkbox"
                  tabIndex={0}
                  aria-checked="false"
                  className="bg-gray-200 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:shadow-outline sm:ml-auto"
                >
                  {/* On: "translate-x-5", Off: "translate-x-0" */}
                  <span
                    aria-hidden="true"
                    className="translate-x-0 inline-block h-5 w-5 rounded-full bg-white shadow transform transition ease-in-out duration-200"
                  />
                </span>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

const Icon = ({ className, name }: { className: string; name: IconName }) => {
  switch (name) {
    case "cog":
      return (
        <svg
          className={className}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
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
      );
    case "calculator":
      return (
        <svg
          className={className}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      );
    case "calendar":
      return (
        <svg
          className={className}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      );
    case "briefcase":
      return (
        <svg
          className={className}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
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
      );
  }
};
