import "../styles/globals.css";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import dynamic from "next/dynamic";

function MyApp({ Component, pageProps }) {
  const { route } = useRouter();
  if (pageProps.preview) {
    const TinaWrapper = dynamic(() => import("../components/tina-wrapper"));
    return (
      <>
        <Head>
          {route.startsWith("/training-plans") && (
            <script src="https://js.stripe.com/v3/"></script>
          )}
        </Head>
        <TinaWrapper {...pageProps}>
          {(props) => <Component {...props} />}
        </TinaWrapper>
        <EditToggle isInEditMode={true} />
      </>
    );
  }
  return (
    <>
      <Head>
        {route.startsWith("/training-plans") && (
          <script src="https://js.stripe.com/v3/"></script>
        )}
      </Head>
      <Component {...pageProps} />
      <EditToggle isInEditMode={false} />
    </>
  );
}

export default MyApp;

const EditToggle = ({ isInEditMode }: { isInEditMode: boolean }) => {
  return (
    <div className="absolute top-6 right-4 z-50">
      <Link href={`/api/preview`}>
        <a className="cursor-pointer relative bg-steel-medium text-white rounded-lg shadow-md p-4">
          {isInEditMode ? "Exit edit mode" : "Enter edit mode"}
        </a>
      </Link>
    </div>
  );
};