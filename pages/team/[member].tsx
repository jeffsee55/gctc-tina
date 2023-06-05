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

import { ExperimentalGetTinaClient } from "../../tina/__generated__/types";
import { useTina } from "tinacms/dist/react";
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
  const { data } = useTina(props);
  const { authors, nav } = data;
  switch (authors.__typename) {
    case "AuthorsAthlete":
      return <pre>{JSON.stringify(authors)}</pre>;
    case "AuthorsAuthor":
      return (
        <div>
          <Header2 {...nav} />
          <Hero {...authors} />
          {authors.accolades?.length > 0 && <Stats {...authors} />}
          {authors.posts_collection?.length > 0 && (
            <ThumbnailList
              title={`${authors.name.split(" ")[0]}'s Featured Articles`}
              description={``}
              posts={authors.posts_collection}
            />
          )}
          <Story {...authors} />
          {/* {data.form && <CoachingForm {...data?.form?.data} />} */}
          {authors.ebook && <Ebook {...authors.ebook} />}
          <Footer {...nav} />
        </div>
      );
  }
};
export default Static;
