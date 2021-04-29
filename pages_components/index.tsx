import React from "react";
import Head from "next/head";
import { Header2 } from "../components/header";
import { Markdown } from "../components/markdown";
import { News } from "../components/post/news";
import { Sponsors } from "../components/sponsors";
import { Home } from "../components/hero/home";
import { Img } from "../components/image";

import { useGraphqlForms } from "tina-graphql-gateway";
import { createClient } from "../util/create-client";
import { sdk, AsyncReturnType } from "../.tina/sdk";
import type * as Tina from "../.tina/sdk";
import { TinaCMS, useCMS } from "tinacms";

const localSdk = sdk(createClient());

export async function serverSideProps() {
  return {
    props: await localSdk.BaseAuthorList({variables: {}}),
  };
}
export async function staticProps() {
  return {
    props: await localSdk.BaseAuthorList({variables: {}}),
  };
}

const Seo = (props: { image: string; title: string; description: string }) => {
  const [url, setUrl] = React.useState("");
  React.useEffect(() => {
    const urlObject = new URL(window.location.toString());
    setUrl(urlObject.href);
  }, []);
  return (
    <Head>
      <title>{props.title}</title>
      <meta name="title" content={props.title} />
      <meta name="description" content={props.description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={props.title} />
      <meta property="og:description" content={props.description} />
      <meta property="og:image" content={props.image} />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={props.title} />
      <meta property="twitter:description" content={props.description} />
      <meta property="twitter:image" content={props.image}></meta>
    </Head>
  );
};
const HeadWrap = (props: {
  image: string;
  title: string;
  description: string;
}) => {
  const [url, setUrl] = React.useState("");
  React.useEffect(() => {
    const urlObject = new URL(window.location.toString());
    setUrl(urlObject.href);
  }, []);
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <>
      <Seo {...props} />
      <div className="absolute top-3 right-6 z-50 bg-white shadow-lg rounded-md">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="mt-4 py-3 px-6 max-w-md text-xs text-gray-400 font-bold tracking-wide uppercase"
          type="button"
        >
          View SEO
        </button>
      </div>
      {isOpen && (
        <div className="absolute top-20 right-6 z-50 bg-white shadow-lg rounded-md">
          <div className="bg-gray-50 sm:rounded-lg">
            <div className="max-w-md p-3">
              <Img width={500} src={props.image} />
              <div className="py-3">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {props.title}
                </h3>
                <div className="mt-2 max-w-md text-sm text-gray-500">
                  <p>{props.description}</p>
                </div>
                <div className="mt-4 max-w-md text-xs text-gray-400 font-bold tracking-wide uppercase">
                  <a href={url}>{url}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

type LayerType = Tina.BaseAuthorListQuery["page"]["data"]["layers"][0];
type PitchLayer = Tina.FilterByTypename<LayerType, "LayerDarkFeature_Data">;
type CtaLayer = Tina.FilterByTypename<LayerType, "LayerCta_Data">;
type LeadershipLayer = Tina.FilterByTypename<LayerType, "LayerLeadership_Data">;

export function Dynamic() {
  const { query, variables } = localSdk.BaseAuthorListString({
    variables: {},
  });
  const [data, isLoading] = useGraphqlForms<AsyncReturnType<typeof localSdk.BaseAuthorList>>({
    query,
    variables,
  });

  // TODO: it'd be nice to popup the SEO widget on SEO focus
  // const pageForm = forms.find((form) => form.name === "page");

  // if (pageForm) {
  //   const seoField = pageForm.fields.find((field) => field.name === "seo");
  //   console.log(seoField);
  // }

  return (
    <>
      <HeadWrap
        image={data.page.data.seo.image}
        title={data.page.data.seo.title}
        description={data.page.data.seo.description}
      />
      <Static {...data} />
    </>
  );
}
export const Static = (props: Tina.BaseAuthorListQuery) => {
  const { getNavDocument, page } = props;
  return (
    <>
      <Seo
        image={page.data.seo.image}
        title={page.data.seo.title}
        description={page.data.seo.description}
      />
      <Header2 {...getNavDocument} />

      {page.data.layers.map((layer) => {
        switch (layer.__typename) {
          case "LayerPostList_Data":
            return <Home />;
          case "LayerCta_Data":
            return <Screenshot {...layer} />;
          case "LayerDarkFeature_Data":
            return <Pitch {...layer} />;
          case "LayerSponsors_Data":
            return <Sponsors {...layer} />;
          case "LayerLeadership_Data":
            return <LeadershipLayer {...layer} />;
          case "CuratedCollection_Data":
            return <News {...layer} />;
          default:
            console.warn(`Unable to find layer of type: ${layer.__typename}`);
            return null;
        }
      })}
    </>
  );
};

const LeadershipLayer = (layer: LeadershipLayer) => {
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
            {layer.title}
          </h2>

          <ul className="space-y-12 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8 lg:gap-y-12 lg:space-y-0">
            {layer.leaders?.map((leader) => (
              <Leadership {...leader} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const Leadership = (props: Tina.BaseAuthorFragment) => {
  switch (props.data.__typename) {
    case "Author_Doc_Data":
      return (
        <li className="mb-10">
          <div className="space-y-4 sm:grid sm:grid-cols-3 sm:gap-6 sm:space-y-0 lg:gap-8">
            <div className="h-0 aspect-w-3 aspect-h-2 sm:aspect-w-3 sm:aspect-h-4">
              <Img
                className="object-cover shadow-lg rounded-lg"
                width={200}
                quality={90}
                src={props.data.image}
                alt=""
              />
            </div>
            <div className="sm:col-span-2">
              <div className="space-y-4">
                <div className="text-lg leading-6 font-medium space-y-1">
                  <h3>{props.data.name}</h3>
                  <p className="text-steel-medium">{props.data.role}</p>
                </div>
                <div className="text-lg">
                  <Markdown
                    classNames={{
                      p: "text-gray-500 line-clamp-2",
                    }}
                    content={props.data.description}
                  />
                  <div className="mt-6 text-sm font-medium">
                    <a
                      href={`/team/${props.sys.filename}`}
                      className="text-steel-medium hover:text-steel-dark"
                    >
                      {/* <a href="" style={{ color: "#437598" }} className=""> */}
                      Work with {props.data.name.split(" ")[0]}{" "}
                      <span aria-hidden="true">→</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
      );

    default:
      throw new Error("Expected author type for leadership container");
  }
};

const Pitch = (props: PitchLayer) => {
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

const Screenshot = (props: CtaLayer) => {
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
                  <Markdown
                    content={props.description}
                    classNames={{
                      h2:
                        "text-3xl font-extrabold text-white tracking-tight sm:text-4xl",
                      p: "mt-6 mx-auto max-w-2xl text-lg text-amber-50",
                    }}
                  />
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
