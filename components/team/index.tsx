import React from "react";
import * as Tina from "../../.tina/types";
import { Markdown } from "../markdown";

export const Team = (props: Tina.LayerTeam_Data) => {
  return (
    <div className="bg-white">
      <div className="mx-auto py-12 px-4 max-w-screen-xl sm:px-6 lg:px-8 lg:py-24">
        <div className="space-y-12 lg:grid lg:grid-cols-3 lg:gap-8 lg:space-y-0">
          <div className="space-y-5 sm:space-y-4">
            <Markdown
              classNames={{
                root: "space-y-5 sm:space-y-4",
                h2:
                  "text-3xl leading-9 font-extrabold tracking-tight sm:text-4xl",
                p: "text-xl leading-7 text-gray-500",
              }}
              content={props.description}
            />
          </div>
          <div className="lg:col-span-2">
            <ul className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:gap-x-8">
              {props.members?.map((member) => {
                return (
                  <li key={member?.filename}>
                    <div className="space-y-4">
                      <div className="relative pb-2/3">
                        <img
                          className="absolute object-cover h-full w-full shadow-lg rounded-lg"
                          src={member?.node?.data?.image || ""}
                          alt=""
                        />
                      </div>
                      <div className="text-lg leading-6 font-medium space-y-1">
                        <a href={`/team/${member?.filename}`}>
                          <h4>{member?.node?.data?.name}</h4>
                        </a>
                        <p className="text-steel-medium">
                          {member?.node?.data?.role}
                        </p>
                      </div>
                      <Markdown
                        content={member?.node?.data?.description}
                        classNames={{
                          root: "text-lg leading-7",
                          p: "text-gray-500",
                          link: "text-steel-medium font-regular",
                        }}
                      />
                      <ul className="flex space-x-5">
                        <li>
                          <a
                            href="#"
                            className="text-gray-400 hover:text-gray-500 transition ease-in-out duration-150"
                          >
                            <span className="sr-only">Twitter</span>
                            <svg
                              className="w-5 h-5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                            </svg>
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="text-gray-400 hover:text-gray-500 transition ease-in-out duration-150"
                          >
                            <span className="sr-only">LinkedIn</span>
                            <svg
                              className="w-5 h-5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li>
                );
              })}
            </ul>
            <h2 className="text-3xl my-8 leading-9 font-extrabold tracking-tight sm:text-4xl">
              Athletes
            </h2>
            <ul className="mx-auto grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 md:gap-x-6 lg:max-w-5xl lg:gap-x-8 lg:gap-y-12 xl:grid-cols-6">
              <li>
                <div className="space-y-4">
                  <img
                    className="mx-auto h-20 w-20 rounded-full lg:w-24 lg:h-24"
                    src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80"
                    alt=""
                  />
                  <div className="space-y-2">
                    <div className="text-xs leading-4 font-medium lg:text-sm lg:leading-5">
                      <h4>Michael Foster</h4>
                      <p className="text-steel-medium">Co-Founder / CTO</p>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
