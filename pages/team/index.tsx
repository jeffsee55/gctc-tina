import React from "react";
import { Header2 } from "../../components/header";
import { Img } from "../../components/image";

import { createLocalClient } from "../../util/create-client";

import { sdk, AsyncReturnType } from "../../.tina/sdk";
import type * as Tina from "../../.tina/sdk";

const localSdk = sdk(createLocalClient());

export async function getStaticProps(props) {
  return {
    props: {
      ...localSdk.BaseAuthorListString({variables: {}}),
      data: await localSdk.BaseAuthorList({}),
      preview: !!props.preview
    }
  }
}

type MemberDataType = Tina.BaseAuthorListQuery["chris"];

export const Static = (
  props: {data: AsyncReturnType<typeof localSdk.BaseAuthorList>}
) => {
  const {
    getNavDocument,
    page,
    ...athletes
  } = props.data;
  return (
    <>
      <Header2 {...getNavDocument} />
      <div>
        <div className="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
          <div className="space-y-12 lg:grid lg:grid-cols-3 lg:gap-8 lg:space-y-0">
            <div className="space-y-5 sm:space-y-4">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                Our Pros
              </h2>
              <p className="text-xl text-gray-500">
                Spanning from all across the globe, the GCTC Pros have come from
                everywhere to work with the group, get to know them!
              </p>
            </div>
            <div className="lg:col-span-2">
              <ul className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:gap-x-8">
                {Object.values(athletes).map((item: MemberDataType) => {
                  switch (item.data.__typename) {
                    case "Athlete_Doc_Data":
                      return (
                        <li key={item.id}>
                          <div className="space-y-4">
                            <div className="aspect-w-3 aspect-h-2">
                              <Img
                                className="object-cover shadow-lg rounded-lg"
                                width={300}
                                quality={90}
                                src={item.data.image}
                                alt=""
                              />
                            </div>
                            <div className="text-lg leading-6 font-medium space-y-1">
                              <div className="flex justify-between mb-2">
                                <h3>{item.data.name}</h3>
                                <div className="text-gray-400">
                                  {item.data.country}
                                </div>
                              </div>
                              <p className="text-md text-steel-medium">
                                {item.data.personal_bests
                                  ?.map((pb) => {
                                    return `${pb.event} - ${pb.time}`;
                                  })
                                  .join(" • ")}
                              </p>
                            </div>
                            <ul className="flex space-x-5">
                              {item.data.social_media?.map((social) => {
                                return (
                                  <li key={social.handle}>
                                    <a
                                      href={social.handle}
                                      className="text-gray-400 hover:text-gray-500"
                                    >
                                      <span className="sr-only">
                                        {social.handle}
                                      </span>
                                      <svg
                                        className="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 16 16"
                                        aria-hidden="true"
                                      >
                                        {/* @ts-ignore FIXME: need to use enums in gql */}
                                        <SocialIcon source={social.source} />
                                      </svg>
                                    </a>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        </li>
                      );
                      break;
                    default:
                      break;
                  }
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Static

const SocialIcon = (props: { source: "twitter" | "instagram" }) => {
  switch (props.source) {
    case "twitter":
      return (
        <g>
          <path d="M16,3c-0.6,0.3-1.2,0.4-1.9,0.5c0.7-0.4,1.2-1,1.4-1.8c-0.6,0.4-1.3,0.6-2.1,0.8c-0.6-0.6-1.5-1-2.4-1 C9.3,1.5,7.8,3,7.8,4.8c0,0.3,0,0.5,0.1,0.7C5.2,5.4,2.7,4.1,1.1,2.1c-0.3,0.5-0.4,1-0.4,1.7c0,1.1,0.6,2.1,1.5,2.7 c-0.5,0-1-0.2-1.5-0.4c0,0,0,0,0,0c0,1.6,1.1,2.9,2.6,3.2C3,9.4,2.7,9.4,2.4,9.4c-0.2,0-0.4,0-0.6-0.1c0.4,1.3,1.6,2.3,3.1,2.3 c-1.1,0.9-2.5,1.4-4.1,1.4c-0.3,0-0.5,0-0.8,0c1.5,0.9,3.2,1.5,5,1.5c6,0,9.3-5,9.3-9.3c0-0.1,0-0.3,0-0.4C15,4.3,15.6,3.7,16,3z" />
        </g>
      );
    case "instagram":
      return (
        <g>
          <circle cx="12.145" cy="3.892" r="0.96" />
          <path d="M8,12c-2.206,0-4-1.794-4-4s1.794-4,4-4s4,1.794,4,4S10.206,12,8,12z M8,6C6.897,6,6,6.897,6,8 s0.897,2,2,2s2-0.897,2-2S9.103,6,8,6z" />
          <path d="M12,16H4c-2.056,0-4-1.944-4-4V4c0-2.056,1.944-4,4-4h8c2.056,0,4,1.944,4,4v8C16,14.056,14.056,16,12,16z M4,2C3.065,2,2,3.065,2,4v8c0,0.953,1.047,2,2,2h8c0.935,0,2-1.065,2-2V4c0-0.935-1.065-2-2-2H4z" />
        </g>
      );
    default:
      return null;
  }
};
