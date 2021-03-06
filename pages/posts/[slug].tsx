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
  const posts = await client.getPostListWithSys();
  return {
    paths: posts.data.getPostsList.edges.map((doc) => ({
      params: { slug: doc.node.sys.filename },
    })),
    fallback: false,
  };
};

export type NavData = Res["data"]["getNavDocument"];

export const Static = (props: Res) => {
  const { getPostsDocument, getNavDocument } = props.data;

  const { data } = getPostsDocument;

  return (
    <>
      <Header2 {...getNavDocument} />
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
          <p className="mt-1 text-md text-gray-500 line-clamp-3">
            {data.preface}
          </p>
          <div>
            <Snippet center={true} className="my-8" {...data?.author} />
          </div>
        </div>
        <Img className={"mx-auto"} width={2000} quality={80} src={data.image} />
        <div className="my-12">
          <div className="max-w-prose prose mx-auto text-gray-500">
            <Markdown content={data?._body} />
          </div>
        </div>
      </div>
      <Footer {...getNavDocument} />
    </>
  );
};
export default Static;

export const FooterCaption = (props: { currentView: { credit?: string } }) => {
  const { currentView } = props;

  return <span>{currentView.credit}</span>;
};
