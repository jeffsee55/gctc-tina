import "../styles/globals.css";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import { Footer } from "../components/footer";
import dynamic from "next/dynamic";

function MyApp({ Component, pageProps }) {
  if (pageProps.preview) {
    const TinaWrapper = dynamic(() => import("../components/tina-wrapper"));
    return (
      <>
        <TinaWrapper {...pageProps}>
          {(props) => <Component {...props} />}
        </TinaWrapper>
        <Footer />
        <EditToggle isInEditMode={true} />
      </>
    );
  }
  return (
    <>
      <Head>
        {/* {route.startsWith("/training-plans") && (
          <script src="https://js.stripe.com/v3/"></script>
        )} */}
      </Head>
      <Component {...pageProps} />
      <Footer />
      <EditToggle isInEditMode={true} />
    </>
  );
}

export default MyApp;

const EditToggle = (isInEditMode) => {
  return (
    <>
      <Link href={`/api/preview`}>
        <a className="editLink">
          {isInEditMode ? "Exit edit mode" : "Enter edit mode"}
        </a>
      </Link>
    </>
  );
};
