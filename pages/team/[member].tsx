import React from "react";
import { Header2 } from "../../components/header";
import { Footer } from "../../components/footer";
import { ThumbnailList } from "../../components/post/list";
import {
  Hero,
  Story,
  Ebook,
  CoachingForm,
  Stats,
} from "../../components/team/member";

import { ExperimentalGetTinaClient } from "../../.tina/__generated__/types";
const client = ExperimentalGetTinaClient();

type Res = Awaited<ReturnType<typeof getStaticProps>>["props"];
export const getStaticProps = async ({ params, preview }) => {
  const variables = { relativePath: `${params.member}.md` };
  const tinaProps = await client.getAuthorWithNav(variables);
  return {
    props: {
      ...tinaProps,
    },
  };
};

export const getStaticPaths = async () => {
  return {
    paths: [
      {
        params: { member: "jen" },
      },
      {
        params: { member: "terrence" },
      },
    ],
    fallback: false,
  };
};

export type MemberHero = Res["data"]["getAuthorsDocument"]["data"];
export const Static = (props: Res) => {
  const { getAuthorsDocument, getNavDocument } = props.data;
  const { data } = getAuthorsDocument;

  switch (data.__typename) {
    case "AuthorsAthlete":
      return <pre>{JSON.stringify(data)}</pre>;
    case "AuthorsAuthor":
      return (
        <div>
          <Header2 {...getNavDocument} />
          <Hero {...data} />
          {data.accolades?.length > 0 && <Stats {...data} />}
          {data.posts_collection?.length > 0 && (
            <ThumbnailList
              title={`${data.name.split(" ")[0]}'s Featured Articles`}
              description={``}
              posts={data.posts_collection}
            />
          )}
          <Story {...data} />
          {/* {data.form && <CoachingForm {...data?.form?.data} />} */}
          {data.ebook && <Ebook {...data.ebook} />}
          <Footer {...getNavDocument} />
        </div>
      );
  }
};
export default Static;
