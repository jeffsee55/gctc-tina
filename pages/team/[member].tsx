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
import { createLocalClient } from "../../util/create-client";

import { sdk, AsyncReturnType } from "../../.tina/sdk";

const localSdk = sdk(createLocalClient());

export const getStaticProps = async ({ params, preview }) => {
  const localSdk = sdk(createLocalClient());
  const variables = { relativePath: `${params.member}.md` };

  return {
    props: {
      preview: !!preview,
      data: await localSdk.Member({ variables }),
      ...localSdk.MemberString({ variables }),
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

export const Static = (props: {
  data: AsyncReturnType<typeof localSdk.Member>;
}) => {
  const { getAuthorsDocument, getNavDocument } = props.data;
  const { data } = getAuthorsDocument;

  switch (data.__typename) {
    case "Athlete_Doc_Data":
      return <pre>{JSON.stringify(data)}</pre>;
    case "Author_Doc_Data":
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
          {data.form && <CoachingForm {...data?.form?.data} />}
          {data.ebook && <Ebook {...data.ebook} />}
          <Footer {...getNavDocument} />
        </div>
      );
  }
};
export default Static;
