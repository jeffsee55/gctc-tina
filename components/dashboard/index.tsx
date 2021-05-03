import React, { Fragment, useState } from "react";
import * as Strava from "../../lib/strava/types";
import { useRouter } from "next/router";
import { ActivitiesApi } from "../../lib/strava/types";
import { Label, Textarea, Text } from "../form";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  ArchiveIcon as ArchiveIconSolid,
  ChevronDownIcon,
  ChevronUpIcon,
  DotsVerticalIcon,
  FolderDownloadIcon,
  PencilIcon,
  ReplyIcon,
  SearchIcon,
  UserAddIcon,
} from "@heroicons/react/solid";
import {
  ArchiveIcon as ArchiveIconOutline,
  BanIcon,
  BellIcon,
  FlagIcon,
  InboxIcon,
  MenuIcon,
  PencilAltIcon,
  UserCircleIcon,
  XIcon,
} from "@heroicons/react/outline";

const user = {
  name: "Whitney Francis",
  email: "whitneyfrancis@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [
  {
    name: "Inboxes",
    href: "#",
    children: [
      { name: "Technical Support", href: "#" },
      { name: "Sales", href: "#" },
      { name: "General", href: "#" },
    ],
  },
  { name: "Reporting", href: "#", children: [] },
  { name: "Settings", href: "#", children: [] },
];
const sidebarNavigation = [
  { name: "Open", href: "#", icon: InboxIcon, current: true },
  { name: "Archive", href: "#", icon: ArchiveIconOutline, current: false },
  { name: "Customers", href: "#", icon: UserCircleIcon, current: false },
  { name: "Flagged", href: "#", icon: FlagIcon, current: false },
  { name: "Spam", href: "#", icon: BanIcon, current: false },
  { name: "Drafts", href: "#", icon: PencilAltIcon, current: false },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Sign out", href: "#" },
];
const messages = [
  {
    id: 1,
    subject: "Velit placeat sit ducimus non sed",
    sender: "Gloria Roberston",
    href: "#",
    date: "1d ago",
    datetime: "2021-01-27T16:35",
    preview:
      "Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.",
  },
  {
    id: 2,
    subject:
      "Nemo mollitia repudiandae adipisci explicabo optio consequatur tempora ut nihil",
    sender: "Virginia Abshire",
    href: "#",
    date: "1d ago",
    datetime: "2021-01-27T16:35",
    preview:
      "Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.",
  },
  {
    id: 3,
    subject:
      "Doloremque reprehenderit et harum quas explicabo nulla architecto dicta voluptatibus",
    sender: "Kyle Gulgowski",
    href: "#",
    date: "1d ago",
    datetime: "2021-01-27T16:35",
    preview:
      "Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.",
  },
  {
    id: 4,
    subject: "Eos sequi et aut ex impedit",
    sender: "Hattie Haag",
    href: "#",
    date: "1d ago",
    datetime: "2021-01-27T16:35",
    preview:
      "Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.",
  },
  {
    id: 5,
    subject: "Quisquam veniam explicabo",
    sender: "Wilma Glover",
    href: "#",
    date: "1d ago",
    datetime: "2021-01-27T16:35",
    preview:
      "Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.",
  },
  {
    id: 6,
    subject:
      "Est ratione molestiae modi maiores consequatur eligendi et excepturi magni",
    sender: "Dolores Morissette",
    href: "#",
    date: "1d ago",
    datetime: "2021-01-27T16:35",
    preview:
      "Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.",
  },
  {
    id: 7,
    subject: "Commodi deserunt aut veniam rem ipsam",
    sender: "Guadalupe Walsh",
    href: "#",
    date: "1d ago",
    datetime: "2021-01-27T16:35",
    preview:
      "Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.",
  },
  {
    id: 8,
    subject: "Illo illum aut debitis earum",
    sender: "Jasmine Hansen",
    href: "#",
    date: "1d ago",
    datetime: "2021-01-27T16:35",
    preview:
      "Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.",
  },
  {
    id: 9,
    subject: "Qui dolore iste ut est cumque sed",
    sender: "Ian Volkman",
    href: "#",
    date: "1d ago",
    datetime: "2021-01-27T16:35",
    preview:
      "Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.",
  },
  {
    id: 10,
    subject: "Aut sed aut illum delectus maiores laboriosam ex",
    sender: "Rafael Klocko",
    href: "#",
    date: "1d ago",
    datetime: "2021-01-27T16:35",
    preview:
      "Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.",
  },
];
const message = {
  subject: "Re: New pricing for existing customers",
  sender: "joearmstrong@example.com",
  status: "Open",
  items: [
    {
      id: 1,
      author: "Joe Armstrong",
      date: "Yesterday at 7:24am",
      datetime: "2021-01-28T19:24",
      body: "<p>Thanks so much! Can't wait to try it out.</p>",
    },
    {
      id: 2,
      author: "Monica White",
      date: "Wednesday at 4:35pm",
      datetime: "2021-01-27T16:35",
      body:
        '\n            <p>\n              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Malesuada at ultricies tincidunt elit et, enim. Habitant nunc, adipiscing non fermentum, sed est a, aliquet. Lorem in vel libero vel augue aliquet dui commodo.\n            </p>\n            <p>\n              Nec malesuada sed sit ut aliquet. Cras ac pharetra, sapien purus vitae vestibulum auctor faucibus ullamcorper. Leo quam tincidunt porttitor neque, velit sed. Tortor mauris ornare ut tellus sed aliquet amet venenatis condimentum. Convallis accumsan et nunc eleifend.\n            </p>\n            <p>\n              <strong style="font-weight: 600;">Monica White</strong><br/>\n              Customer Service\n            </p>\n          ',
    },
    {
      id: 3,
      author: "Joe Armstrong",
      date: "Wednesday at 4:09pm",
      datetime: "2021-01-27T16:09",
      body:
        "\n            <p>\n              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Malesuada at ultricies tincidunt elit et, enim. Habitant nunc, adipiscing non fermentum, sed est a, aliquet. Lorem in vel libero vel augue aliquet dui commodo.\n            </p>\n            <p>\n              Nec malesuada sed sit ut aliquet. Cras ac pharetra, sapien purus vitae vestibulum auctor faucibus ullamcorper. Leo quam tincidunt porttitor neque, velit sed. Tortor mauris ornare ut tellus sed aliquet amet venenatis condimentum. Convallis accumsan et nunc eleifend.\n            </p>\n            <p>\n              – Joe\n            </p>\n          ",
    },
  ],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

import addDays from "date-fns/addDays";
import subDays from "date-fns/subDays";
import differenceInDays from "date-fns/differenceInDays";

export const Dashboard = (props) => {
  const startDate = new Date(2021, 2, 24);
  const router = useRouter();
  const now = new Date();
  const today = differenceInDays(now, startDate);
  const { query } = router;
  const [activeDay, setActiveDay] = React.useState({});
  const activeWorkoutRef = React.useRef(null);
  React.useEffect(() => {
    if (activeWorkoutRef.current) {
      activeWorkoutRef.current.scrollIntoView();
    }
  }, [activeWorkoutRef.current]);
  React.useEffect(() => {
    if (query.day) {
      const activeDay = props.data.getTrainingDocument.data.workouts.find(
        (data) => {
          return data.Day.toString() === query.day;
        }
      );
      setActiveDay(activeDay);
    }
  }, [query.day]);
  const [open, setOpen] = useState(false);

  return (
    <div className="h-screen overflow-hidden bg-gray-100 flex flex-col">
      {/* Top nav*/}
      <header className="flex-shrink-0 relative h-16 bg-white flex items-center">
        {/* Logo area */}
        <div className="absolute inset-y-0 left-0 lg:static lg:flex-shrink-0">
          <a
            href="#"
            className="flex items-center justify-center h-16 w-16 bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600 lg:w-20"
          >
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white"
              alt="Workflow"
            />
          </a>
        </div>

        {/* Picker area */}
        <div className="mx-auto lg:hidden">
          <div className="relative">
            <label htmlFor="inbox-select" className="sr-only">
              Choose inbox
            </label>
            <select
              id="inbox-select"
              className="rounded-md border-0 bg-none pl-3 pr-8 text-base font-medium text-gray-900 focus:ring-2 focus:ring-blue-600"
            >
              <option value="/open">Open</option>
              <option value="/archived">Archived</option>
              <option value="/assigned">Assigned</option>
              <option value="/flagged">Flagged</option>
              <option value="/spam">Spam</option>
              <option value="/drafts">Drafts</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center pr-2">
              <ChevronDownIcon
                className="h-5 w-5 text-gray-500"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        {/* Menu button area */}
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center sm:pr-6 lg:hidden">
          {/* Mobile menu button */}
          <button
            type="button"
            className="-mr-2 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600"
            onClick={() => setOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <MenuIcon className="block h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {/* Desktop nav area */}
        <div className="hidden lg:min-w-0 lg:flex-1 lg:flex lg:items-center lg:justify-between">
          <div className="min-w-0 flex-1">
            <div className="max-w-2xl relative text-gray-400 focus-within:text-gray-500">
              <label htmlFor="search" className="sr-only">
                Search all inboxes
              </label>
              <input
                id="search"
                type="search"
                placeholder="Search all inboxes"
                className="block w-full border-transparent pl-12 placeholder-gray-500 focus:border-transparent sm:text-sm focus:ring-0"
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-4">
                <SearchIcon className="h-5 w-5" aria-hidden="true" />
              </div>
            </div>
          </div>
          <div className="ml-10 pr-4 flex-shrink-0 flex items-center space-x-10">
            <nav aria-label="Global" className="flex space-x-10">
              {navigation.map((item) =>
                item.children.length ? (
                  <Menu key={item.name} as="div" className="relative text-left">
                    {({ open }) => (
                      <>
                        <Menu.Button className="flex items-center text-sm font-medium text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600">
                          <span>{item.name}</span>
                          <ChevronDownIcon
                            className="ml-1 h-5 w-5 text-gray-500"
                            aria-hidden="true"
                          />
                        </Menu.Button>

                        <Transition
                          show={open}
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items
                            static
                            className="origin-top-right absolute z-30 right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                          >
                            <div className="py-1">
                              {item.children.map((child) => (
                                <Menu.Item key={child.name}>
                                  {({ active }) => (
                                    <a
                                      href={child.href}
                                      className={classNames(
                                        active ? "bg-gray-100" : "",
                                        "block px-4 py-2 text-sm text-gray-700"
                                      )}
                                    >
                                      {child.name}
                                    </a>
                                  )}
                                </Menu.Item>
                              ))}
                            </div>
                          </Menu.Items>
                        </Transition>
                      </>
                    )}
                  </Menu>
                ) : (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-sm font-medium text-gray-900"
                  >
                    {item.name}
                  </a>
                )
              )}
            </nav>
            <div className="flex items-center space-x-8">
              <span className="inline-flex">
                <a
                  href="#"
                  className="-mx-1 bg-white p-1 rounded-full text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </a>
              </span>

              <Menu as="div" className="relative inline-block text-left">
                {({ open }) => (
                  <>
                    <Menu.Button className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={user.imageUrl}
                        alt=""
                      />
                    </Menu.Button>

                    <Transition
                      show={open}
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items
                        static
                        className="origin-top-right absolute z-30 right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                      >
                        <div className="py-1">
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Your Profile
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Sign Out
                              </a>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </>
                )}
              </Menu>
            </div>
          </div>
        </div>

        {/* Mobile menu, show/hide this `div` based on menu open/closed state */}
        <Transition.Root show={open} as={Fragment}>
          <Dialog
            as="div"
            static
            className="fixed inset-0 z-40 lg:hidden"
            open={open}
            onClose={setOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="hidden sm:block sm:fixed sm:inset-0 sm:bg-gray-600 sm:bg-opacity-75" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="transition ease-out duration-150 sm:ease-in-out sm:duration-300"
              enterFrom="transform opacity-0 scale-110 sm:translate-x-full sm:scale-100 sm:opacity-100"
              enterTo="transform opacity-100 scale-100 sm:translate-x-0 sm:scale-100 sm:opacity-100"
              leave="transition ease-in duration-150 sm:ease-in-out sm:duration-300"
              leaveFrom="transform opacity-100 scale-100 sm:translate-x-0 sm:scale-100 sm:opacity-100"
              leaveTo="transform opacity-0 scale-110 sm:translate-x-full sm:scale-100 sm:opacity-100"
            >
              <nav
                className="fixed z-40 inset-0 h-full w-full bg-white sm:inset-y-0 sm:left-auto sm:right-0 sm:max-w-sm sm:w-full sm:shadow-lg"
                aria-label="Global"
              >
                <div className="h-16 flex items-center justify-between px-4 sm:px-6">
                  <a href="#">
                    <img
                      className="block h-8 w-auto"
                      src="https://tailwindui.com/img/logos/workflow-mark.svg?color=cyan&shade=400"
                      alt="Workflow"
                    />
                  </a>
                  <button
                    type="button"
                    className="-mr-2 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close main menu</span>
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-2 max-w-8xl mx-auto px-4 sm:px-6">
                  <div className="relative text-gray-400 focus-within:text-gray-500">
                    <label htmlFor="search" className="sr-only">
                      Search all inboxes
                    </label>
                    <input
                      id="search"
                      type="search"
                      placeholder="Search all inboxes"
                      className="block w-full border-gray-300 rounded-md pl-10 placeholder-gray-500 focus:border-blue-600 focus:ring-blue-600"
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center justify-center pl-3">
                      <SearchIcon className="h-5 w-5" aria-hidden="true" />
                    </div>
                  </div>
                </div>
                <div className="max-w-8xl mx-auto py-3 px-2 sm:px-4">
                  {navigation.map((item) => (
                    <Fragment key={item.name}>
                      <a
                        href={item.href}
                        className="block rounded-md py-2 px-3 text-base font-medium text-gray-900 hover:bg-gray-100"
                      >
                        {item.name}
                      </a>
                      {item.children.map((child) => (
                        <a
                          key={child.name}
                          href={child.href}
                          className="block rounded-md py-2 pl-5 pr-3 text-base font-medium text-gray-500 hover:bg-gray-100"
                        >
                          {child.name}
                        </a>
                      ))}
                    </Fragment>
                  ))}
                </div>
                <div className="border-t border-gray-200 pt-4 pb-3">
                  <div className="max-w-8xl mx-auto px-4 flex items-center sm:px-6">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={user.imageUrl}
                        alt=""
                      />
                    </div>
                    <div className="ml-3 min-w-0 flex-1">
                      <div className="text-base font-medium text-gray-800 truncate">
                        {user.name}
                      </div>
                      <div className="text-sm font-medium text-gray-500 truncate">
                        {user.email}
                      </div>
                    </div>
                    <a
                      href="#"
                      className="ml-auto flex-shrink-0 bg-white p-2 text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </a>
                  </div>
                  <div className="mt-3 max-w-8xl mx-auto px-2 space-y-1 sm:px-4">
                    {userNavigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="block rounded-md py-2 px-3 text-base font-medium text-gray-900 hover:bg-gray-50"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </nav>
            </Transition.Child>
          </Dialog>
        </Transition.Root>
      </header>

      {/* Bottom section */}
      <div className="min-h-0 flex-1 flex overflow-hidden">
        {/* Narrow sidebar*/}
        <nav
          aria-label="Sidebar"
          className="hidden lg:block lg:flex-shrink-0 lg:bg-gray-800 lg:overflow-y-auto"
        >
          <div className="relative w-20 flex flex-col p-3 space-y-3">
            {sidebarNavigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={classNames(
                  item.current
                    ? "bg-gray-900 text-white"
                    : "text-gray-400 hover:bg-gray-700",
                  "flex-shrink-0 inline-flex items-center justify-center h-14 w-14 rounded-lg"
                )}
              >
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </a>
            ))}
          </div>
        </nav>

        {/* Main area */}
        <main className="min-w-0 flex-1 border-t border-gray-200 xl:flex">
          <section
            aria-labelledby="message-heading"
            className="min-w-0 flex-1 h-full flex flex-col overflow-hidden xl:order-last"
          >
            {/* Top section */}
            <div className="flex-shrink-0 bg-white border-b border-gray-200">
              {/* Toolbar*/}
              <div className="h-16 flex flex-col justify-center">
                <div className="px-4 sm:px-6 lg:px-8">
                  <div className="py-3 flex justify-between">
                    {/* Left buttons */}
                    <div>
                      <span className="relative z-0 inline-flex shadow-sm rounded-md sm:shadow-none sm:space-x-3">
                        <span className="inline-flex sm:shadow-sm">
                          <button
                            type="button"
                            className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                          >
                            <ReplyIcon
                              className="mr-2.5 h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                            <span>View Full Week</span>
                          </button>
                          <button
                            type="button"
                            className="hidden sm:inline-flex -ml-px relative items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                            onClick={() => {
                              router.push(
                                `/app/${query.event}/${query.category}/${query.time}?day=${today}`,
                                undefined,
                                { shallow: true }
                              );
                            }}
                          >
                            <UserAddIcon
                              className="mr-2.5 h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                            <span>Jump to today</span>
                          </button>
                        </span>

                        <Menu
                          as="span"
                          className="-ml-px relative block sm:shadow-sm lg:hidden"
                        >
                          {({ open }) => (
                            <>
                              <div>
                                <Menu.Button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 sm:rounded-md sm:px-3">
                                  <span className="sr-only sm:hidden">
                                    More
                                  </span>
                                  <span className="hidden sm:inline">More</span>
                                  <ChevronDownIcon
                                    className="h-5 w-5 text-gray-400 sm:ml-2 sm:-mr-1"
                                    aria-hidden="true"
                                  />
                                </Menu.Button>
                              </div>

                              <Transition
                                show={open}
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                              >
                                <Menu.Items
                                  static
                                  className="origin-top-right absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                                >
                                  <div className="py-1">
                                    <Menu.Item>
                                      {({ active }) => (
                                        <a
                                          href="#"
                                          className={classNames(
                                            active
                                              ? "bg-gray-100 text-gray-900"
                                              : "text-gray-700",
                                            "block sm:hidden px-4 py-2 text-sm"
                                          )}
                                        >
                                          Note
                                        </a>
                                      )}
                                    </Menu.Item>
                                    <Menu.Item>
                                      {({ active }) => (
                                        <a
                                          href="#"
                                          className={classNames(
                                            active
                                              ? "bg-gray-100 text-gray-900"
                                              : "text-gray-700",
                                            "block sm:hidden px-4 py-2 text-sm"
                                          )}
                                        >
                                          Assign
                                        </a>
                                      )}
                                    </Menu.Item>
                                    <Menu.Item>
                                      {({ active }) => (
                                        <a
                                          href="#"
                                          className={classNames(
                                            active
                                              ? "bg-gray-100 text-gray-900"
                                              : "text-gray-700",
                                            "block px-4 py-2 text-sm"
                                          )}
                                        >
                                          Archive
                                        </a>
                                      )}
                                    </Menu.Item>
                                    <Menu.Item>
                                      {({ active }) => (
                                        <a
                                          href="#"
                                          className={classNames(
                                            active
                                              ? "bg-gray-100 text-gray-900"
                                              : "text-gray-700",
                                            "block px-4 py-2 text-sm"
                                          )}
                                        >
                                          Move
                                        </a>
                                      )}
                                    </Menu.Item>
                                  </div>
                                </Menu.Items>
                              </Transition>
                            </>
                          )}
                        </Menu>
                      </span>
                    </div>

                    {/* Right buttons */}
                    <nav aria-label="Pagination">
                      <span className="relative z-0 inline-flex shadow-sm rounded-md">
                        <button
                          onClick={() => {
                            router.push(
                              `/app/${query.event}/${query.category}/${
                                query.time
                              }?day=${parseInt(query.day) - 1}`,
                              undefined,
                              { shallow: true }
                            );
                          }}
                          className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                        >
                          <span className="sr-only">Next</span>
                          <ChevronUpIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </button>
                        <button
                          onClick={() => {
                            router.push(
                              `/app/${query.event}/${query.category}/${
                                query.time
                              }?day=${parseInt(query.day) + 1}`,
                              undefined,
                              { shallow: true }
                            );
                          }}
                          className="-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                        >
                          <span className="sr-only">Previous</span>
                          <ChevronDownIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </button>
                      </span>
                    </nav>
                  </div>
                </div>
              </div>
              {/* Message header */}
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto">
              <div className="bg-white pt-5 pb-6 shadow">
                <div className="px-4 sm:flex sm:justify-between sm:items-baseline sm:px-6 lg:px-8">
                  <div className="sm:w-0 sm:flex-1">
                    <h1
                      id="message-heading"
                      className="text-lg font-medium text-gray-900"
                    >
                      {activeDay.Title}
                    </h1>
                    <p className="mt-1 text-sm text-gray-500 truncate">
                      {activeDay.Description}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:justify-start">
                    <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-cyan-100 text-cyan-800">
                      {activeDay.Category}
                    </span>
                    <Menu
                      as="div"
                      className="ml-3 relative inline-block text-left"
                    >
                      {({ open }) => (
                        <>
                          <div>
                            <Menu.Button className="-my-2 p-2 rounded-full bg-white flex items-center text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600">
                              <span className="sr-only">Open options</span>
                              <DotsVerticalIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </Menu.Button>
                          </div>

                          <Transition
                            show={open}
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items
                              static
                              className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                            >
                              <div className="py-1">
                                <Menu.Item>
                                  {({ active }) => (
                                    <button
                                      type="button"
                                      className={classNames(
                                        active
                                          ? "bg-gray-100 text-gray-900"
                                          : "text-gray-700",
                                        "w-full flex justify-between px-4 py-2 text-sm"
                                      )}
                                    >
                                      <span>Copy email address</span>
                                    </button>
                                  )}
                                </Menu.Item>
                                <Menu.Item>
                                  {({ active }) => (
                                    <a
                                      href="#"
                                      className={classNames(
                                        active
                                          ? "bg-gray-100 text-gray-900"
                                          : "text-gray-700",
                                        "flex justify-between px-4 py-2 text-sm"
                                      )}
                                    >
                                      <span>Previous conversations</span>
                                    </a>
                                  )}
                                </Menu.Item>
                                <Menu.Item>
                                  {({ active }) => (
                                    <a
                                      href="#"
                                      className={classNames(
                                        active
                                          ? "bg-gray-100 text-gray-900"
                                          : "text-gray-700",
                                        "flex justify-between px-4 py-2 text-sm"
                                      )}
                                    >
                                      <span>View original</span>
                                    </a>
                                  )}
                                </Menu.Item>
                              </div>
                            </Menu.Items>
                          </Transition>
                        </>
                      )}
                    </Menu>
                  </div>
                </div>
              </div>
              {activeDay.Title && (
                <Training startDate={startDate} activeDay={activeDay} />
              )}
            </div>
          </section>

          {/* Message list*/}
          <aside className="hidden xl:block xl:flex-shrink-0 xl:order-first">
            <div className="h-full relative flex flex-col w-96 border-r border-gray-200 bg-gray-100">
              <div className="flex-shrink-0">
                <div className="h-16 bg-white px-6 flex flex-col justify-center ">
                  <div className="flex justify-between w-full">
                    <div className="flex items-baseline space-x-3">
                      <h2 className="text-lg font-medium text-gray-900">
                        Start:
                      </h2>
                      <p className="text-sm font-medium text-gray-500">
                        {startDate.toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <a
                        href="#"
                        className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
                      >
                        Reset
                      </a>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-200 bg-gray-50 " />
              </div>
              <nav
                aria-label="Message list"
                className="min-h-0 flex-1 overflow-y-auto"
              >
                <ul className="border-b border-gray-200 divide-y divide-gray-200">
                  {props.data.getTrainingDocument.data.workouts.map(
                    (workout) => (
                      <li
                        key={workout.Day}
                        className="relative bg-white py-5 px-6 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600"
                      >
                        <div className="flex justify-between space-x-3">
                          <div className="min-w-0 flex-1">
                            <a
                              // href={`?day=${workout.Day}`}
                              onClick={() =>
                                router.push(
                                  `/app/${query.event}/${query.category}/${query.time}?day=${workout.Day}`,
                                  undefined,
                                  { shallow: true }
                                )
                              }
                              className="block focus:outline-none"
                            >
                              <span
                                className="absolute inset-0"
                                aria-hidden="true"
                              />
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {workout.Title}
                              </p>
                            </a>
                          </div>
                          <div className="flex-shrink-0 whitespace-nowrap text-sm text-gray-500">
                            {workout.Category}
                          </div>
                        </div>
                        <div className="mt-1">
                          <p className="line-clamp-2 text-sm text-gray-600 whitespace-pre-wrap">
                            {workout.Description}
                          </p>
                        </div>
                      </li>
                    )
                  )}
                </ul>
              </nav>
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
};

/* This example requires Tailwind CSS v2.0+ */
import { CheckIcon, ThumbUpIcon, UserIcon } from "@heroicons/react/solid";

const timeline = [
  {
    id: 1,
    content: "Applied to",
    target: "Front End Developer",
    href: "#",
    date: "Sep 20",
    datetime: "2020-09-20",
    icon: UserIcon,
    iconBackground: "bg-gray-400",
  },
  {
    id: 2,
    content: "Advanced to phone screening by",
    target: "Bethany Blake",
    href: "#",
    date: "Sep 22",
    datetime: "2020-09-22",
    icon: ThumbUpIcon,
    iconBackground: "bg-blue-500",
  },
  {
    id: 3,
    content: "Completed phone screening with",
    target: "Martha Gardner",
    href: "#",
    date: "Sep 28",
    datetime: "2020-09-28",
    icon: CheckIcon,
    iconBackground: "bg-green-500",
  },
  {
    id: 4,
    content: "Advanced to interview by",
    target: "Bethany Blake",
    href: "#",
    date: "Sep 30",
    datetime: "2020-09-30",
    icon: ThumbUpIcon,
    iconBackground: "bg-blue-500",
  },
  {
    id: 5,
    content: "Completed interview with",
    target: "Katherine Snyder",
    href: "#",
    date: "Oct 4",
    datetime: "2020-10-04",
    icon: CheckIcon,
    iconBackground: "bg-green-500",
  },
];

export default function StravaActivity() {
  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {timeline.map((event, eventIdx) => (
          <li key={event.id}>
            <div className="relative pb-8">
              {eventIdx !== timeline.length - 1 ? (
                <span
                  className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                />
              ) : null}
              <div className="relative flex space-x-3">
                <div>
                  <span
                    className={classNames(
                      event.iconBackground,
                      "h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white"
                    )}
                  >
                    <event.icon
                      className="h-5 w-5 text-white"
                      aria-hidden="true"
                    />
                  </span>
                </div>
                <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                  <div>
                    <p className="text-sm text-gray-500">
                      {event.content}{" "}
                      <a
                        href={event.href}
                        className="font-medium text-gray-900"
                      >
                        {event.target}
                      </a>
                    </p>
                  </div>
                  <div className="text-right text-sm whitespace-nowrap text-gray-500">
                    <time dateTime={event.datetime}>{event.date}</time>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* This example requires Tailwind CSS v2.0+ */
const people = [
  {
    name: "Easy Run",
    handle: "May 3rd, 2021",
    imageUrl:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Floyd Miles",
    handle: "floydmiles",
    imageUrl:
      "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Emily Selman",
    handle: "emilyselman",
    imageUrl:
      "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Kristin Watson",
    handle: "kristinwatson",
    imageUrl:
      "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];

export function StravaActivity2(props) {
  // console.log("strava", props.startDate.getTime());
  const [activities, setActivities] = React.useState<Strava.SummaryActivity[]>(
    []
  );
  const [shouldSync, setShouldSync] = React.useState(false);
  React.useEffect(() => {
    const run = async () => {
      const res = await fetch(
        `/api/strava/recentActivities/${props.startDate.getTime()}`
      );
      setActivities(await res.json());
    };
    if (shouldSync) {
      run();
    }
  }, [shouldSync]);

  return (
    <div>
      {activities.length === 0 ? (
        <button
          type="button"
          onClick={() => setShouldSync(true)}
          className={`w-full items-center justify-center mb-8 py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-steel-medium hover:bg-steel-light focus:outline-none focus:border-steel-dark focus:shadow-outline-indigo active:bg-steel-dark transition duration-150 ease-in-out`}
        >
          {shouldSync && activities.length === 0 ? (
            <div className="w-full flex justify-center items-center">
              <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
          ) : (
            "View recent Strava activity"
          )}
        </button>
      ) : (
        <span />
      )}
      <ul className="-my-5 divide-y divide-gray-200">
        {activities.map((activity) => (
          <li key={activity.id} className="py-4">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-gray-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {activity.name}
                </p>
                <p className="text-sm text-gray-500 truncate">
                  {activity.distance}
                </p>
              </div>
              <div>
                <button
                  onClick={() => props.onSync(activity)}
                  className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
                >
                  Sync
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

import {
  useField,
  Form,
  FormikProps,
  Formik,
  validateYupSchema,
  yupToFormErrors,
  FormikHelpers,
} from "formik";
import * as yup from "yup";

const Training = (props: { activeDay: object }) => {
  const { activeDay } = props;
  const [stravaActivity, setStravaActivity] = React.useState(null);
  console.log(stravaActivity);
  const notes: {
    day: string;
    title: string;
    description: string;
    time: string;
    distance: string;
  } = stravaActivity
    ? {
        day: activeDay.Day,
        title: stravaActivity?.name,
        description: "",
        time: stravaActivity?.moving_time,
        distance: "",
      }
    : {
        day: activeDay.Day,
        title: activeDay.Title,
        description: activeDay.Description,
        time: "",
        distance: "",
      };

  return (
    <div className="py-4 sm:px-6 space-y-2 lg:space-y-0 lg:px-8 grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
      {/* Left column */}
      <div className="grid grid-cols-1 gap-4 lg:col-span-2">
        {/* Welcome panel */}
        <section aria-labelledby="profile-overview-title">
          <div className="rounded-lg bg-white overflow-hidden shadow">
            <Formik
              key={stravaActivity?.id || activeDay.Day}
              initialValues={notes}
              // validationSchema={schema}
              onSubmit={(values, actions) => {
                console.log("get it", values);
              }}
            >
              {(props: FormikProps<T>) => (
                <Form>
                  <div className="shadow sm:rounded-md sm:overflow-hidden">
                    <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                      <div className="grid grid-cols-9 gap-6">
                        <div className="col-span-9 md:col-span-5">
                          <Text
                            label="Title"
                            name="title"
                            placeholder="What did you do today?"
                          />
                        </div>
                        <div className="col-span-4 md:col-span-2">
                          <Text
                            label="Distance"
                            name="distance"
                            placeholder="10k"
                          />
                        </div>

                        <div className="col-span-5 md:col-span-2">
                          <Text label="Time" name="time" placeholder="40:00" />
                        </div>
                      </div>

                      <div>
                        <div className="mt-1">
                          <Textarea label="Notes" name="description" />
                        </div>
                        <p className="mt-2 text-sm text-gray-500">
                          Brief description for your profile. URLs are
                          hyperlinked.
                        </p>
                      </div>
                      <Effort />
                    </div>
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                      <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Save to Strava
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </section>

        {/* Actions panel */}
        <section aria-labelledby="quick-links-title">
          <div className="rounded-lg bg-gray-200 overflow-hidden shadow divide-y divide-gray-200 sm:divide-y-0 sm:grid sm:grid-cols-2 sm:gap-px">
            <h2 className="sr-only" id="quick-links-title">
              Quick links
            </h2>
          </div>
        </section>
      </div>

      {/* Right column */}
      <div className="grid grid-cols-1 gap-4">
        {/* Announcements */}
        <section aria-labelledby="announcements-title">
          <div className="rounded-lg bg-white overflow-hidden shadow">
            <div className="p-6">
              <div className="flex items-center justify-start">
                <svg
                  width="94"
                  height="20"
                  viewBox="0 0 94 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.446999 15.846L3.42 12.288C5.24 13.674 7.312 14.258 9.266 14.258C10.268 14.258 10.703 13.991 10.703 13.54V13.49C10.703 13.006 10.185 12.755 8.398 12.388C4.656 11.62 1.366 10.551 1.366 7.026V6.976C1.366 3.802 3.838 1.346 8.448 1.346C11.672 1.346 14.044 2.114 15.981 3.634L13.241 7.409C11.7808 6.35704 10.0296 5.78499 8.23 5.772C7.395 5.772 7.01 6.056 7.01 6.457V6.507C7.01 6.957 7.46 7.242 9.232 7.577C13.508 8.362 16.364 9.597 16.364 12.972V13.005C16.364 16.513 13.464 18.651 8.998 18.651C5.608 18.668 2.568 17.716 0.445999 15.845L0.446999 15.846ZM21.927 6.392H17.017V1.665H32.417V6.392H27.507V18.352H21.927V6.392ZM46.264 12.672C48.284 11.686 49.554 9.999 49.554 7.577V7.527C49.554 5.807 49.036 4.57 48.034 3.567C46.864 2.397 44.977 1.663 42.021 1.663H33.871V18.35H39.451V13.59H40.637L43.777 18.35H50.141L46.264 12.672ZM43.992 7.978C43.992 8.998 43.174 9.598 41.854 9.598H39.45V6.341H41.89C43.176 6.341 44.01 6.859 44.01 7.945V7.978H43.992ZM58.09 0.962L49.087 18.352H55.067L58.09 12.272L61.113 18.352H67.093L58.09 0.962ZM84.55 0.962L75.547 18.352H81.527L84.55 12.272L87.573 18.352H93.553L84.55 0.962ZM71.32 19.037L80.34 1.647H74.36L71.337 7.727L68.297 1.647H62.317L71.32 19.037Z"
                    fill="#FC6100"
                  />
                </svg>
              </div>
              <p className="mt-4 text-sm text-gray-500">
                If you've already recorded your workout in Strava, you can sync
                it here.
              </p>
              <div className="flow-root mt-6">
                <StravaActivity2
                  startDate={props.startDate}
                  onSync={(data) => setStravaActivity(data)}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

/*
  This example requires Tailwind CSS v2.0+

  This example requires some changes to your config:

  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ]
  }
  ```
*/
import { RadioGroup } from "@headlessui/react";

const settings = [
  {
    name: "Disaster",
    description:
      "At no point were you even remotely close to doing anything that resembled the designed workout",
  },
  {
    name: "Not too hot",
    description: "You struggled to complete the session as designed",
  },
  {
    name: "Good",
    description: "Not showing off, just getting it done",
  },
  {
    name: "Excellent",
    description: "When's the next Olympics?",
  },
];

export function Effort() {
  const [selected, setSelected] = useState(settings[2]);

  return (
    <>
      <RadioGroup value={selected} onChange={setSelected}>
        <Label label="How'd you feel?" />
        <RadioGroup.Label className="sr-only">Privacy setting</RadioGroup.Label>
        <div className="bg-white rounded-md -space-y-px">
          {settings.map((setting, settingIdx) => (
            <RadioGroup.Option
              key={setting.name}
              value={setting}
              className={({ checked }) =>
                classNames(
                  settingIdx === 0 ? "rounded-tl-md rounded-tr-md" : "",
                  settingIdx === settings.length - 1
                    ? "rounded-bl-md rounded-br-md"
                    : "",
                  checked
                    ? "bg-indigo-50 border-indigo-200 z-10"
                    : "border-gray-200",
                  "relative border p-4 flex cursor-pointer focus:outline-none"
                )
              }
            >
              {({ active, checked }) => (
                <>
                  <span
                    className={classNames(
                      checked
                        ? "bg-indigo-600 border-transparent"
                        : "bg-white border-gray-300",
                      active ? "ring-2 ring-offset-2 ring-indigo-500" : "",
                      "h-4 w-4 mt-0.5 cursor-pointer rounded-full border flex items-center justify-center"
                    )}
                    aria-hidden="true"
                  >
                    <span className="rounded-full bg-white w-1.5 h-1.5" />
                  </span>
                  <div className="ml-3 flex flex-col">
                    <RadioGroup.Label
                      as="span"
                      className={classNames(
                        checked ? "text-indigo-900" : "text-gray-900",
                        "block text-sm font-medium"
                      )}
                    >
                      {setting.name}
                    </RadioGroup.Label>
                    <RadioGroup.Description
                      as="span"
                      className={classNames(
                        checked ? "text-indigo-700" : "text-gray-500",
                        "block text-sm"
                      )}
                    >
                      {setting.description}
                    </RadioGroup.Description>
                  </div>
                </>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </>
  );
}
