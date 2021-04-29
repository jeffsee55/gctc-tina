import Head from "next/head";
import { Footer } from "../components/footer";

import { TinaProvider, TinaCMS } from "tinacms";
import { TinaCloudProvider } from "tina-graphql-gateway";
import { createClient } from "../util/create-client";

const TinaComponent = ({ Component, pageProps }) => {
  const cms = new TinaCMS({
    apis: {
      tina: createClient(),
    },
    sidebar: {
      position: "displace",
      // position: "overlay",
    },
    enabled: true,
  });
  return (
    <TinaProvider cms={cms}>
      <TinaCloudProvider onLogin={(token) => token} onLogout={() => {}}>
        <Head>
          <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
          <script src="https://js.stripe.com/v3/"></script>
        </Head>
        <Component {...pageProps} />
        <Footer />
      </TinaCloudProvider>
    </TinaProvider>
  );
};

export default TinaComponent;

// export default () => <div>Hi</div>;
