import React from "react";
import { Header2 } from "../header";
import { Markdown } from "../markdown";
import { News } from "../post/news";
import { Sponsors } from "../sponsors";
import { Home } from "../hero/home";
import { Img } from "../image";
import { Footer } from "../footer";

import { ExperimentalGetTinaClient } from "../../.tina/__generated__/types";
import { ThumbnailList } from "../post/list";

const client = ExperimentalGetTinaClient();

export type Awaited<T> = T extends PromiseLike<infer U>
  ? { 0: Awaited<U>; 1: U }[U extends PromiseLike<any> ? 0 : 1]
  : T;

type Res = Awaited<ReturnType<typeof getStaticPropsForPage>>["props"];
export async function getStaticPropsForPage({
  relativePath,
}: {
  relativePath: string;
}) {
  const tinaProps = await client.getPagesAndNavDocument({
    relativePath,
  });
  return {
    props: {
      ...tinaProps,
    },
  };
}

export const Static = (props: Res) => {
  const { getNavDocument, getPagesDocument } = props.data;
  return (
    <>
      <Header2 {...getNavDocument} />
      <Switch {...getPagesDocument} />
      <Footer {...getNavDocument} />
    </>
  );
};

type Switch = Res["data"]["getPagesDocument"];

const Switch = (props: Switch) => {
  switch (props.__typename) {
    case "PagesDocument":
      return <Page {...props} />;

    default:
      break;
  }
  return <pre>{JSON.stringify(props, null, 2)}</pre>;
};

type Page = Extract<Switch, { __typename?: "PagesDocument" }>;
const Page = (props: Page) => {
  switch (props.data.__typename) {
    case "PagesPage":
      return <PagesPage {...props.data} />;
    default:
      return <pre>{JSON.stringify(props, null, 2)}</pre>;
  }
};
type PagesPageProps = Extract<Page["data"], { __typename?: "PagesPage" }>;
const PagesPage = (props: PagesPageProps) => {
  return (
    <>
      {props.layers.map((layer) => {
        switch (layer.__typename) {
          case "PagesPageLayersLayerHero":
            return <Home {...layer} />;
          case "PagesPageLayersLayerCta":
            return <LayerCta {...layer} />;
          case "PagesPageLayersLayerDarkFeature":
            return <LayerDarkFeatures {...layer} />;
          case "PagesPageLayersLayerLeadership":
            return <LayerLeadership {...layer} />;
          case "PagesPageLayersLayerPostList":
            return <LayerPostList {...layer} />;
          case "PagesPageLayersLayerSponsors":
            return <LayerSponsors {...layer} />;
          case "PagesPageLayersLayerTeam":
            return <LayerTeam {...layer} />;
          case "PagesPageLayersCuratedCollection":
            return <LayerCuratedCollections {...layer} />;
          default:
            return <pre>{JSON.stringify(props, null, 2)}</pre>;
        }
      })}
    </>
  );
};

const Pre = ({ data }) => {
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

type ExtractLayer<
  T extends PagesPageProps["layers"][number]["__typename"]
> = Extract<PagesPageProps["layers"][number], { __typename: T }>;

export type LayerCtaProps = ExtractLayer<"PagesPageLayersLayerCta">;
export type LayerCuratedCollectionProps = ExtractLayer<
  "PagesPageLayersCuratedCollection"
>;
export type LayerDarkFeatureProps = ExtractLayer<
  "PagesPageLayersLayerDarkFeature"
>;
export type LayerLeadershipProps = ExtractLayer<
  "PagesPageLayersLayerLeadership"
>;
export type LayerPostListProps = ExtractLayer<"PagesPageLayersLayerPostList">;
export type LayerSponsorsProps = ExtractLayer<"PagesPageLayersLayerSponsors">;
export type LayerTeamProps = ExtractLayer<"PagesPageLayersLayerTeam">;

const LayerCta = (props: LayerCtaProps) => {
  return <Screenshot {...props} />;
};
const LayerCuratedCollections = (props: LayerCuratedCollectionProps) => {
  return (
    <div>
      LayerCuratedCollections
      <Pre data={props} />
    </div>
  );
};

const LayerDarkFeatures = (props: LayerDarkFeatureProps) => {
  return <Pitch {...props} />;
};

const LayerLeadership = (props: LayerLeadershipProps) => {
  return <LeadershipLayer {...props} />;
};

const LayerPostList = (props: LayerPostListProps) => {
  return <ThumbnailList {...props} />;
};

const LayerSponsors = (props: LayerSponsorsProps) => {
  return <Sponsors {...props} />;
};

const LayerTeam = (props: LayerTeamProps) => {
  return <TeamMembers {...props} />;
};

export default Static;

// type LayerType = Tina.BaseAuthorListQuery["page"]["data"]["layers"][0];
// type PitchLayer = Tina.FilterByTypename<LayerType, "LayerDarkFeature_Data">;
// type CtaLayer = Tina.FilterByTypename<LayerType, "LayerCta_Data">;
// type LeadershipLayer = Tina.FilterByTypename<LayerType, "LayerLeadership_Data">;

const LeadershipLayer = (props: LayerLeadershipProps) => {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-y-0 h-full w-full" aria-hidden="true">
        <div className="relative h-full">
          <svg
            className="absolute right-full transform translate-y-1/3 translate-x-1/4 md:translate-y-1/3 sm:translate-x-1/2 lg:translate-x-full"
            width={404}
            height={784}
            fill="none"
            viewBox="0 0 404 784"
          >
            <defs>
              <pattern
                id="e229dbec-10e9-49ee-8ec3-0286ca089edf"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x={0}
                  y={0}
                  width={4}
                  height={4}
                  className="text-gray-200"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width={404}
              height={784}
              fill="url(#e229dbec-10e9-49ee-8ec3-0286ca089edf)"
            />
          </svg>
          <svg
            className="absolute left-full transform -translate-y-3/4 -translate-x-1/4 sm:-translate-x-1/2 md:-translate-y-1/2 lg:-translate-x-3/4"
            width={404}
            height={784}
            fill="none"
            viewBox="0 0 404 784"
          >
            <defs>
              <pattern
                id="d2a68204-c383-44b1-b99f-42ccff4e5365"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x={0}
                  y={0}
                  width={4}
                  height={4}
                  className="text-gray-200"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width={404}
              height={784}
              fill="url(#d2a68204-c383-44b1-b99f-42ccff4e5365)"
            />
          </svg>
        </div>
      </div>

      <div className="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24 relative z-10">
        <div className="space-y-12">
          <h2 className="text-3xl text-steel-xdark font-extrabold tracking-tight sm:text-4xl">
            {props.title}
          </h2>

          <ul className="space-y-12 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8 lg:gap-y-12 lg:space-y-0">
            {props.leaders?.map((leader) => (
              <Leadership {...leader} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

type LeadershipProps = LayerLeadershipProps["leaders"][number];
const Leadership = (props: LeadershipProps) => {
  const leader = props.reference;
  switch (leader.__typename) {
    case "AuthorsDocument":
      if (leader.data.__typename === "AuthorsAuthor") {
        return (
          <li className="mb-10">
            <div className="space-y-4 sm:grid sm:grid-cols-3 sm:gap-6 sm:space-y-0 lg:gap-8">
              <div className="h-0 aspect-w-3 aspect-h-2 sm:aspect-w-3 sm:aspect-h-4">
                <Img
                  className="object-cover shadow-lg rounded-lg"
                  width={200}
                  quality={90}
                  src={leader.data.image}
                  alt=""
                />
              </div>
              <div className="sm:col-span-2">
                <div className="space-y-4">
                  <div className="text-lg leading-6 font-medium space-y-1">
                    <h3>{leader.data.name}</h3>
                    <p className="text-steel-medium">{leader.data.role}</p>
                  </div>
                  <div className="text-lg">
                    <Markdown
                      classNames={{
                        p: "text-gray-500 line-clamp-2",
                      }}
                      content={leader.data.description}
                    />
                    <div className="mt-6 text-sm font-medium">
                      <a
                        href={`/team/${leader.sys.filename}`}
                        className="text-steel-medium hover:text-steel-dark"
                      >
                        {/* <a href="" style={{ color: "#437598" }} className=""> */}
                        Work with {leader.data.name.split(" ")[0]}{" "}
                        <span aria-hidden="true">→</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        );
      } else {
        return <div>HI?/</div>;
      }

    default:
      throw new Error(`Expected type for ${leader.__typename}`);
  }
};

const Pitch = (props: LayerDarkFeatureProps) => {
  return (
    <div className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <svg
            className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>
          {/* FIXME: some sort of auto-height bug without this */}
          <div style={{ height: "1px" }} />

          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <div className="bg-steel-xdark p-3 inline-block">
                <div className="text-md tracking-wider leading-10 font-mono text-white sm:text-lg sm:leading-none uppercase">
                  {props?.title}
                </div>
              </div>
              <Markdown
                content={props?.description}
                classNames={{
                  p:
                    "mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-base lg:mx-0",
                }}
              />
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <Img
          width={800}
          quality={90}
          className="h-56 w-full object-bottom object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src="https://res.cloudinary.com/deuzrsg3m/image/upload/v1613613908/ACtC-3fPQ55l3DAr-Ypz0dmxE86eKrnWV22BIAEVUDkvUK5QOHuj8rYg-nx4-s61PYceBvA-LP7lBh6J8SwKJA7IpK5sdSRnbXQlbx6K6eooh1GR5fVe7tA8HXAVPyAPOs15KC_KiBvPADKGgNbBqNmqzlFM_w2976-h1972-no_morjm9.jpg"
          alt=""
        />
      </div>
    </div>
  );
};

const Screenshot = (props: LayerCtaProps) => {
  return (
    <div>
      {/* pb-16  lg:pb-0 lg:z-10 lg:relative */}
      <div className="relative sm:py-16">
        <div aria-hidden="true" className="hidden sm:block">
          <div className="absolute inset-0 bg-gray-100" />
          <svg
            className="absolute top-8 left-1/2 -ml-3"
            width={404}
            height={392}
            fill="none"
            viewBox="0 0 404 392"
          >
            <defs>
              <pattern
                id="8228f071-bcee-4ec8-905a-2a059a2cc4fb"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x={0}
                  y={0}
                  width={4}
                  height={4}
                  className="text-gray-200"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width={404}
              height={392}
              fill="url(#8228f071-bcee-4ec8-905a-2a059a2cc4fb)"
            />
          </svg>
        </div>
        <div className="mx-auto max-w-md py-8 px-4 sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
          {/* <div className="relative rounded-2xl px-6 py-10 bg-amber-300 overflow-hidden shadow-xl sm:px-12 sm:py-20"> */}
          <div
            // style={{ backgroundColor: "rgb(250 202 143)" }}
            className="bg-bronze-medium relative rounded-2xl px-6 py-10 overflow-hidden shadow-xl lg:px-12 lg:py-20"
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 -mt-72 sm:-mt-32 md:mt-0"
            >
              <svg
                className="absolute inset-0 h-full w-full"
                preserveAspectRatio="xMidYMid slice"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 1463 360"
              >
                <path
                  className="text-mustard-medium text-opacity-40"
                  // style={{ color: "rgb(190 115 59 / 40%)" }}
                  fill="currentColor"
                  d="M-82.673 72l1761.849 472.086-134.327 501.315-1761.85-472.086z"
                />
                <path
                  // style={{ color: "rgb(190 115 59 / 40%)" }}
                  className="text-mustard-medium text-opacity-40"
                  fill="currentColor"
                  d="M-217.088 544.086L1544.761 72l134.327 501.316-1761.849 472.086z"
                />
              </svg>
            </div>
            <div className="lg:grid lg:grid-cols-2 lg:gap-4">
              <div className="lg:flex lg:justify-end">
                <div className="mx-auto lg:self-center max-w-xl relative z-10">
                  <div className="prose text-white prose-headings:text-white">
                    <Markdown content={props.ctaDescription} />
                  </div>
                  <a
                    href={props.cta_link}
                    className={`inline-block
                      mt-6
                      rounded-md
                      border
                      border-transparent px-5 py-3
                      bg-steel-xdark
                      text-base
                      font-medium
                      text-white
                      shadow
                      hover:bg-steel-dark
                      focus:outline-none
                      focus:ring-2
                      focus:ring-steel-xlight
                      focus:ring-offset-2
                      focus:ring-offset-steel-light
                      sm:px-10`}
                  >
                    {props.cta_text}
                  </a>
                </div>
              </div>
              <div className="relative pb-3/5 lg:-mt-24 md:pb-1/2">
                <Img
                  className="absolute shadow-2xl inset-0 w-96 h-full transform translate-x-6 translate-y-6 rounded-md object-cover object-left-top sm:translate-x-16 lg:translate-y-20"
                  width={400}
                  quality={90}
                  src={props.cta_image}
                  alt="App screenshot"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TeamMembers = (props: LayerTeamProps) => {
  return (
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
              {Object.values(props.members).map((m) => {
                const item = m.reference;
                switch (item.data.__typename) {
                  case "AuthorsAthlete":
                    return (
                      <li key={item.id}>
                        <div className="space-y-4">
                          <div className="aspect-w-2 aspect-h-2">
                            <Img
                              className="object-cover shadow-lg rounded-lg"
                              width={500}
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
                  default:
                    break;
                }
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

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
