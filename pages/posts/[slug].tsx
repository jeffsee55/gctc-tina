import React from "react";
import { Markdown } from "../../components/markdown";
import { Snippet } from "../../components/author/snippet";
import { createLocalClient } from "../../util/create-client";
import { Header2 } from "../../components/header";
import { Img } from "../../components/image";
import { Footer } from "../../components/footer";

import { ExperimentalGetTinaClient } from "../../.tina/__generated__/types";
const client = ExperimentalGetTinaClient();

type Res = Awaited<ReturnType<typeof getStaticProps>>["props"];

export async function getStaticProps({ params, preview }) {
  const relativePath = `${params.slug}.md`;
  const tinaProps = await client.getPostAndNav({
    relativePath,
  });

  return {
    props: {
      ...tinaProps,
    },
  };
}

export const getStaticPaths = async () => {
  return {
    paths: [{ sys: { filename: "fall-training-1" } }].map((doc) => ({
      params: { slug: doc.sys.filename },
    })),
    fallback: false,
  };
};

export const Static = (props: Res) => {
  const { getPostsDocument } = props.data;

  const { data } = getPostsDocument;

  return (
    <>
      {/* <Header2 {...getNavDocument} /> */}
      <div className="h-12 md:h-32" />
      <div className="relative px-4 sm:px-6 lg:px-8">
        <div className="text-lg max-w-prose mx-auto mb-6 md:mb-24">
          {data.tags?.length > 0 && (
            <p className="text-base text-center leading-6 text-steel-medium font-semibold tracking-wide uppercase">
              {data.tags.join(", ")}
            </p>
          )}
          <div className="relative">
            <h1 className="mt-2 mb-8 text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
              {data.title}
            </h1>
          </div>
          <Markdown content={data?.preface} classNames={{ root: "prose" }} />
          <div>
            <Snippet center={true} className="my-8" {...data?.author} />
          </div>
        </div>
        <Img className={"mx-auto"} width={2000} quality={80} src={data.image} />
        <div className="my-12">
          <Markdown
            content={data?._body}
            classNames={{
              root: "max-w-prose prose mx-auto text-gray-500 ",
            }}
          />
        </div>
      </div>
      {/* <Footer {...getNavDocument} /> */}
    </>
  );
};
export default Static;

export const FooterCaption = (props: { currentView: { credit?: string } }) => {
  const { currentView } = props;

  return <span>{currentView.credit}</span>;
};

type BlockQuoteType = {
  children: React.ReactNode;
  avatar: string;
  title: string;
  name: string;
};
const BlockQuote = (props: BlockQuoteType) => {
  return (
    <div
      style={{ width: "500px" }}
      className="max-w-full relative text-base mx-auto lg:max-w-none w-64"
    >
      <blockquote className="relative bg-white rounded-lg shadow-lg">
        <div className="rounded-t-lg px-6 py-8 sm:px-10 sm:pt-10 sm:pb-8">
          <img
            src="https://tailwindui.com/img/logos/workcation-logo-steel-medium-mark-gray-800-and-steel-medium-text.svg"
            alt="Workcation"
            className="h-8"
          />
          <div className="relative text-lg text-gray-700 font-medium mt-8">
            <svg
              className="absolute top-0 left-0 transform -translate-x-3 -translate-y-2 h-8 w-8 text-gray-200"
              fill="currentColor"
              viewBox="0 0 32 32"
              aria-hidden="true"
            >
              <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
            </svg>

            <div className="relative">{props.children}</div>
          </div>
        </div>
        <cite className="relative flex items-center sm:items-start bg-steel-medium rounded-b-lg not-italic py-5 px-6 sm:py-5 sm:pl-12 sm:pr-10 sm:mt-10">
          <div className="relative rounded-full border-2 border-white sm:absolute sm:top-0 sm:transform sm:-translate-y-1/2">
            <img
              className="w-12 h-12 sm:w-20 sm:h-20 rounded-full bg-indigo-300"
              src="https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2.5&w=160&h=160&q=80"
              alt=""
            />
          </div>
          <span className="relative ml-4 text-indigo-300 font-semibold leading-6 sm:ml-24 sm:pl-1">
            <p className="text-white font-semibold sm:inline">{props.title}</p>
            <p className="sm:inline">CEO at Workcation</p>
          </span>
        </cite>
      </blockquote>
    </div>
  );
};
