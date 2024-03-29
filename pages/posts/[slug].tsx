import React from "react";
import { Markdown } from "../../components/markdown";
import { Snippet } from "../../components/author/snippet";
import { createLocalClient } from "../../util/create-client";
import { Header2 } from "../../components/header";
import { Img } from "../../components/image";
import { Footer } from "../../components/footer";

import { client } from "../../tina/__generated__/client";
import { tinaField, useTina } from "tinacms/dist/react";

type Res = Awaited<ReturnType<typeof getStaticProps>>["props"];

export async function getStaticProps({ params, preview }) {
  const relativePath = `${params.slug}.md`;
  const tinaProps = await client.queries.getPostAndNav({
    relativePath,
  });

  return {
    props: {
      ...tinaProps,
    },
  };
}

export const getStaticPaths = async () => {
  const posts = await client.queries.getPostListWithSys();
  return {
    paths: posts.data.postsConnection.edges.map((doc) => ({
      params: { slug: doc.node._sys.filename },
    })),
    fallback: false,
  };
};

export type NavData = Res["data"]["nav"];

export const Static = (props: Res) => {
  const { data } = useTina(props);
  const { posts, nav } = data;

  return (
    <>
      <Header2 {...nav} />
      <div className="h-12 md:h-32" />
      <div className="relative px-4 sm:px-6 lg:px-8">
        <div className="text-lg max-w-prose mx-auto mb-6 md:mb-24">
          {posts.tags?.length > 0 && (
            <p
              data-tina-field={tinaField(posts, "tags")}
              className="text-base text-center leading-6 text-steel-medium font-semibold tracking-wide uppercase"
            >
              {posts.tags.join(", ")}
            </p>
          )}
          <div className="relative">
            <h1
              data-tina-field={tinaField(posts, "title")}
              className="mt-2 mb-8 text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10"
            >
              {posts.title}
            </h1>
          </div>
          <p
            className="mt-1 text-md text-gray-500 line-clamp-3"
            data-tina-field={tinaField(posts, "preface")}
          >
            {posts.preface}
          </p>
          <div data-tina-field={tinaField(posts, "author")}>
            <Snippet center={true} className="my-8" {...posts?.author} />
          </div>
        </div>
        <div className={"mx-auto"} data-tina-field={tinaField(posts, "image")}>
          <Img width={2000} quality={80} src={posts.image} />
        </div>
        <div className="my-12">
          <div
            className="max-w-prose prose mx-auto text-gray-500"
            data-tina-field={tinaField(posts, "_body")}
          >
            <Markdown content={posts?._body} />
          </div>
        </div>
      </div>
      <Footer {...nav} />
    </>
  );
};
export default Static;

export const FooterCaption = (props: { currentView: { credit?: string } }) => {
  const { currentView } = props;

  return <span>{currentView.credit}</span>;
};
