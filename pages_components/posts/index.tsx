import React from "react";
import { Markdown } from "../../components/markdown";
import { Snippet } from "../../components/author/snippet";
import { createClient } from "../../util/create-client";
import { useGraphqlForms } from "tina-graphql-gateway";
import { Header2 } from "../../components/header";
import { Img } from "../../components/image";

import { sdk, AsyncReturnType } from "../../.tina/sdk";
import type * as Tina from "../../.tina/sdk";

const localSdk = sdk(createClient());

export async function staticProps() {
  const relativePath = `posts.md`;

  return {
    props: {data: await localSdk.CuratedPosts({
      variables: { relativePath },
    })},
  };
}

export const Dynamic = (props: {data: AsyncReturnType<typeof localSdk.CuratedPosts>}) => {
  const [data, isLoading] = useGraphqlForms(localSdk.CuratedPostsString({
    variables: { relativePath: "posts.md" },
  }));

  return isLoading ? <Static data={props.data} /> : <Static data={data} />;
};

export const Static = (
  props: {data: AsyncReturnType<typeof localSdk.CuratedPosts>}
) => {
  const { getCuratedDocument, getNavDocument } = props.data
  const rest = getCuratedDocument;

  return (
    <div>
      <Header2 {...getNavDocument} />
      {rest.data.curations?.map((curation) => {
        switch (curation?.__typename) {
          case "CuratedHero_Data":
            return <HeroPost {...curation.hero_post} />;
          case "CuratedCollection_Data":
            return <FeatureList {...curation} />;
        }
      })}
      <div>
        <NewsletterCta />
      </div>
    </div>
  );
};

type CurationsType = Tina.CuratedPostsQuery["getCuratedDocument"]["data"]["curations"][0];

export const HeroPost = (
  props: Tina.FilterByTypename<CurationsType, "CuratedHero_Data">["hero_post"]
) => {
  return (
    <div className="relative mb-24">
      <div className="relative overflow-hidden">
        <div
          // style={{ filter: "blur(40px)" }}
          className="form absolute -top-24 -bottom-24 -right-24 -left-24 pointer-events-none"
        >
          <div className="relative transform -translate-y-1/2 top-1/2 scale-">
            <Img src={props.data?.image || ""} width={2000} />
          </div>
        </div>
        <div className="relative z-10 pointer-events-none">
          <div className="h-12 md:h-64" />
          <div className="max-w-prose mx-auto">
            <div className="px-4 sm:px-6 lg:px-0">
              <div className="bg-gray-900 p-2 inline-block">
                <div className="text-md tracking-wider leading-10 font-mono text-white sm:text-lg sm:leading-none uppercase">
                  Latest Post
                </div>
              </div>
              <h1 className="text-4xl tracking-tight leading-10 font-extrabold text-white sm:text-5xl sm:leading-none md:text-6xl">
                {props.data?.title}
              </h1>
            </div>
          </div>
          <div className="h-24 md:h-32" />
          <div className="h-24 md:h-24" />
        </div>
      </div>
      <div className="absolute inset-x-0">
        <div className="relative transform -translate-y-12">
          <div className="max-w-3xl mx-auto">
            <div className="relative transform -translate-y-24">
              <div className="bg-white p-8 rounded shadow-xl">
                <Markdown
                  content={props.data?.preface}
                  classNames={{
                    p:
                      "line-clamp-3 text-base leading-6 text-gray-500 undefined",
                  }}
                />
                <div className="flex justify-between items-center mt-8">
                  <Snippet className="" {...props.data?.author} />
                  <a
                    href={`${
                      props.sys?.collection?.slug
                    }/${props.sys?.breadcrumbs?.join("/")}`}
                    className="flex items-center justify-between text-base leading-6 font-semibold text-steel-medium hover:text-steel-light transition ease-in-out duration-150"
                  >
                    <span className="">Read full story</span>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export const FeatureList = (
  props: Tina.FilterByTypename<CurationsType, "CuratedCollection_Data">
) => {
  return (
    <div className="bg-white pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
      <div className="relative max-w-lg mx-auto lg:max-w-7xl">
        <div>
          <Markdown
            content={props.description}
            classNames={{
              h2:
                "text-3xl leading-9 tracking-tight font-extrabold text-gray-900 sm:text-4xl sm:leading-10",
              p: "mt-3 text-xl leading-7 text-gray-500 sm:mt-4",
            }}
          />
        </div>
        <div className="mt-12 grid gap-16 border-t-2 border-gray-100 pt-12 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-12">
          {props.posts_collection?.map((post) => {
            if (!post) {
              // FIXME this shouldn't be optional
              return <span />;
            }
            return (
              <div>
                <div>
                  <a href="#" className="inline-block">
                    <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium leading-5 bg-indigo-100 text-indigo-800">
                      Article
                    </span>
                  </a>
                </div>
                <a
                  href={`${
                    post.sys?.collection?.slug
                  }/${post.sys?.breadcrumbs?.join("/")}`}
                  className="block"
                >
                  <h3 className="mt-4 text-xl leading-7 font-semibold text-gray-900">
                    {post?.data?.title}
                  </h3>
                  <Markdown
                    content={post?.data?.preface}
                    classNames={{ p: "mt-3 text-base leading-6 text-gray-500" }}
                  />
                </a>
                <Snippet className="mt-6" {...post?.data?.author} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const NewsletterCta = () => {
  return (
    <div className="bg-white">
      <div className="max-w-screen-xl mx-auto px-4 py-12 md:px-6 lg:py-16 lg:px-6 xl:px-0">
        <div className="px-6 py-6 bg-steel-dark rounded-lg md:py-12 md:px-12 lg:py-16 lg:px-16 xl:flex xl:items-center">
          <div className="xl:w-0 xl:flex-1">
            <h2 className="text-2xl leading-8 font-extrabold tracking-tight text-white sm:text-3xl sm:leading-9">
              Want products news and updates?
            </h2>
            <p
              className="mt-3 max-w-3xl text-lg leading-6 text-steel-xlight"
              id="newsletter-headline"
            >
              Sign up for our newsletter to stay up to date.
            </p>
          </div>
          <div className="mt-8 sm:w-full sm:max-w-md xl:mt-0 xl:ml-8">
            <form className="sm:flex" aria-labelledby="newsletter-headline">
              <input
                aria-label="Email address"
                type="email"
                required
                className="appearance-none w-full px-5 py-3 border border-transparent text-base leading-6 rounded-md text-gray-900 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 transition duration-150 ease-in-out"
                placeholder="Enter your email"
              />
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                <button className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-steel-light hover:bg-indigo-400 focus:outline-none focus:bg-indigo-400 transition duration-150 ease-in-out">
                  Notify me
                </button>
              </div>
            </form>
            <p className="mt-3 text-sm leading-5 text-steel-xlight">
              We care about the protection of your data. Read our
              <a href="#" className="text-white font-medium underline">
                Privacy Policy.
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
