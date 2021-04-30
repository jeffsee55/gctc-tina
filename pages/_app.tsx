import "../styles/globals.css";
import Head from "next/head";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

import { EditProvider, useEditState } from "../util/edit-state";

function InnerApp({ Component, pageProps }) {
  const { edit } = useEditState();
  if (edit) {
    const TinaWrapper = dynamic(() => import("../components/tina-wrapper"));
    return (
      <TinaWrapper {...pageProps}>
        {(props) => <Component {...props} />}
      </TinaWrapper>
    );
  }
  return <Component {...pageProps} />;
}

function App(props) {
  const { route } = useRouter();
  return (
    <EditProvider>
      <Head>
        {route.startsWith("/training-plans") && (
          <script src="https://js.stripe.com/v3/"></script>
        )}
      </Head>
      <InnerApp {...props} />
    </EditProvider>
  );
}

export default App;
