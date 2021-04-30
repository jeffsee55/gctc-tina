import React from "react";
import { Header2 } from "../components/header";
import { createLocalClient } from "../util/create-client";
import { sdk, AsyncReturnType } from "../.tina/sdk";

const localSdk = sdk(createLocalClient());
export async function getStaticProps(props) {
  return {
    props: {
      preview: !!props.preview,
      data: await localSdk.BaseAuthorList({}),
      ...localSdk.BaseAuthorListString({ variables: {} }),
    },
  };
}

export const Static = (props: {
  data: AsyncReturnType<typeof localSdk.BaseAuthorList>;
}) => {
  const { getNavDocument } = props.data;
  return (
    <div>
      <Header2 {...getNavDocument} />
      <Hero />
    </div>
  );
};
export default Static;

const Hero = () => {
  return (
    <div className="relative bg-gray-50">
      <main className="lg:relative">
        <div className="mx-auto max-w-7xl w-full pt-16 pb-20 text-center lg:py-48 lg:text-left">
          <div className="px-4 lg:w-1/2 sm:px-8 xl:pr-16">
            <div className="bg-gray-900 p-2 inline-block">
              <div className="text-md tracking-wider leading-10 font-mono text-white sm:text-lg sm:leading-none uppercase">
                Success
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl tracking-tight leading-10 font-extrabold text-gray-900 sm:leading-none mt-4">
              Thanks for your order
            </h1>

            <p className="mt-3 max-w-md mx-auto text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
              If you didn't receive an email please check your spam folder or
              contact us at info@goldencoasttrackclub.com
            </p>
            <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
              <a
                href="https://www.facebook.com/Golden-Coast-Track-Club-109893913927297"
                // className="w-76 flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-steel-medium hover:bg-steel-light focus:outline-none focus:border-steel-dark focus:shadow-outline-indigo transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10"
                style={{ backgroundColor: "#437598" }}
                className="w-76 flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white focus:outline-none transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10"
              >
                <span className="">Join our Facebook Group</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-4 h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div
          style={{ minHeight: "38rem" }}
          className="relative w-full h-80 sm:h-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 lg:h-full"
        >
          <img
            className="absolute inset-0 w-full h-full object-cover object-top"
            // src={props.bio_image}
            src="https://lh3.googleusercontent.com/pw/ACtC-3fPQ55l3DAr-Ypz0dmxE86eKrnWV22BIAEVUDkvUK5QOHuj8rYg-nx4-s61PYceBvA-LP7lBh6J8SwKJA7IpK5sdSRnbXQlbx6K6eooh1GR5fVe7tA8HXAVPyAPOs15KC_KiBvPADKGgNbBqNmqzlFM=w2976-h1972-no?authuser=0"
            alt=""
          />
        </div>
      </main>
    </div>
  );
};
