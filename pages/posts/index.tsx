import React from "react";
import { Markdown } from "../../components/markdown";
import { Snippet } from "../../components/author/snippet";
import { createLocalClient } from "../../util/create-client";
import { Header2 } from "../../components/header";
import { Footer } from "../../components/footer";
import { Img } from "../../components/image";

import { ExperimentalGetTinaClient } from "../../.tina/__generated__/types";
const client = ExperimentalGetTinaClient();

type Res = Awaited<ReturnType<typeof getStaticProps>>["props"];
export async function getStaticProps() {
  const tinaProps = await client.getCuratedPostAndNavDocument({
    relativePath: "posts.md",
  });

  return {
    props: {
      ...tinaProps,
    },
  };
}

export const Static = (props: Res) => {
  const { getCuratedDocument } = props.data;
  const rest = getCuratedDocument;

  return (
    <>
      {/* <Header2 {...getNavDocument} /> */}
      {rest.data.curations?.map((curation) => {
        switch (curation?.__typename) {
          case "CuratedCuratedCurationsCuratedHero":
            return <HeroPost {...curation} />;
          case "CuratedCuratedCurationsCuratedCollection":
            return <FeatureList {...curation} />;
        }
      })}
      {/* <div>
        <NewsletterCta />
      </div> */}
      {/* <Footer {...getNavDocument} /> */}
    </>
  );
};
export default Static;

type HeroPostProps = Extract<
  Res["data"]["getCuratedDocument"]["data"]["curations"][number],
  { __typename: "CuratedCuratedCurationsCuratedHero" }
>;
export const HeroPost = (props: HeroPostProps) => {
  const post = props.hero_post;
  return (
    <div className="relative mb-24">
      <div className="relative overflow-hidden">
        <div
          // style={{ filter: "blur(40px)" }}
          className="form absolute -top-24 -bottom-24 -right-24 -left-24 pointer-events-none"
        >
          <div className="relative transform -translate-y-1/2 top-1/2 scale-">
            <Img src={post.data?.image || ""} width={2000} />
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
                {post.data?.title}
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
                  content={post.data?.preface}
                  classNames={{
                    p:
                      "line-clamp-3 text-base leading-6 text-gray-500 undefined",
                  }}
                />
                <div className="flex justify-between items-center mt-8">
                  <Snippet className="" {...post.data?.author} />
                  <a
                    href={`${
                      post.sys?.collection?.slug
                    }/${post.sys?.breadcrumbs?.join("/")}`}
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

type FeatureListProps = Extract<
  Res["data"]["getCuratedDocument"]["data"]["curations"][number],
  { __typename: "CuratedCuratedCurationsCuratedCollection" }
>;
export const FeatureList = (props: FeatureListProps) => {
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
          {props.posts_collection?.map((p) => {
            const post = p.reference;
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
