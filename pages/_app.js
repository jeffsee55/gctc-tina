import "../styles/globals.css";
import Head from "next/head";
import { useRouter } from "next/router";
import { Footer } from "../components/footer";
import dynamic from "next/dynamic";

const TinaComponent = dynamic(() => import("../pages_components/_app"));

function MyApp({ Component, pageProps }) {
  const { route } = useRouter();

  if (route.startsWith("/admin")) {
    return <TinaComponent Component={Component} pageProps={pageProps} />;
  }
  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        {route.startsWith("/training-plans") && (
          <script src="https://js.stripe.com/v3/"></script>
        )}
      </Head>
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
