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
  const relativePath = `${params.plan}.json`;
  const tinaProps = await client.getTrainingPlansDocument({
    relativePath,
  });

  return {
    props: {
      ...tinaProps,
    },
  };
}

export const getStaticPaths = async () => {
  const posts = await client.getTrainingPlansList();
  return {
    paths: posts.data.getTrainingPlansList.edges.map((doc) => ({
      params: { plan: doc.node.sys.filename },
    })),
    fallback: false,
  };
};
export default function Page(props) {
  return <pre>{JSON.stringify(props, null, 2)}</pre>;
}
