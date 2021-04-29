import Head from "next/head";
import React from "react";
import { Footer } from "../components/footer";

import { TinaCMS } from "tinacms";
import { TinaCloudAuthWall } from "tina-graphql-gateway";
import { createClient } from "../util/create-client";

const TinaComponent = ({ Component, pageProps }) => {
  const cms = new TinaCMS({
    apis: {
      tina: createClient(),
    },
    sidebar: {
      position: "displace",
    },
    enabled: true,
  });
  return (
    <TinaCloudAuthWall cms={cms}>
      <Head>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        <script src="https://js.stripe.com/v3/"></script>
      </Head>
      <Component {...pageProps} />
      <Footer />
    </TinaCloudAuthWall>
  );
};

export default TinaComponent;

// export default () => <div>Hi</div>;
