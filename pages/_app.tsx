import dynamic from "next/dynamic";
import "../styles/globals.css";
import { TinaEditProvider } from "tinacms/dist/edit-state";
import { RouteMappingPlugin } from "tinacms";
// @ts-ignore FIXME: default export needs to be 'ComponentType<{}>
const TinaCMS = dynamic(() => import("tinacms"), { ssr: false });

const NEXT_PUBLIC_TINA_CLIENT_ID = process.env.NEXT_PUBLIC_TINA_CLIENT_ID;
const NEXT_PUBLIC_USE_LOCAL_CLIENT =
  process.env.NEXT_PUBLIC_USE_LOCAL_CLIENT || true;

const App = ({ Component, pageProps }) => {
  return (
    <>
      <TinaEditProvider
        showEditButton={false}
        editMode={
          <TinaCMS
            branch="main"
            clientId={NEXT_PUBLIC_TINA_CLIENT_ID}
            formifyCallback={({ createForm, formConfig, createGlobalForm }) => {
              if (formConfig.id === "getNavDocument") {
                return createGlobalForm(formConfig);
              }
              return createForm(formConfig);
            }}
            isLocalClient={Boolean(Number(NEXT_PUBLIC_USE_LOCAL_CLIENT))}
            // mediaStore={async () => {
            //   const pack = await import("next-tinacms-cloudinary");
            //   return pack.TinaCloudCloudinaryMediaStore;
            // }}
            cmsCallback={(cms) => {
              // import("react-tinacms-editor").then(({ MarkdownFieldPlugin }) => {
              //   cms.plugins.add(MarkdownFieldPlugin);
              // });
              cms.flags.set("branch-switcher", true);

              /**
               * Enables `tina-admin` specific features in the Tina Sidebar
               */
              cms.flags.set("tina-admin", true);

              /**
               * An example of a RouteMapping plugin for TinaAdmin
               */
              const RouteMapping = new RouteMappingPlugin(
                (collection, document) => {
                  if (["authors", "global"].includes(collection.name)) {
                    return undefined;
                  }
                  if (["pages"].includes(collection.name)) {
                    if (document.sys.filename === "home") {
                      return `/`;
                    }
                    if (document.sys.filename === "about") {
                      return `/about`;
                    }
                    return undefined;
                  }
                  return `/${collection.name}/${document.sys.filename}`;
                }
              );
              cms.plugins.add(RouteMapping);
            }}
            documentCreatorCallback={{
              /**
               * After a new document is created, redirect to its location
               */
              onNewDocument: ({ collection: { slug }, breadcrumbs }) => {
                const relativeUrl = `/${slug}/${breadcrumbs.join("/")}`;
                return (window.location.href = relativeUrl);
              },
              /**
               * Only allows documents to be created to the `Blog Posts` Collection
               */
              filterCollections: (options) => {
                return options.filter(
                  (option) => option.label === "Blog Posts"
                );
              },
            }}
            // formifyCallback={({ formConfig, createForm, createGlobalForm }) => {
            //   if (formConfig.id === "getGlobalDocument") {
            //     return createGlobalForm(formConfig, { layout: "fullscreen" });
            //   }

            //   return createForm(formConfig);
            // }}
            {...pageProps}
          >
            {(livePageProps) => <Component {...livePageProps} />}
          </TinaCMS>
        }
      >
        <Component {...pageProps} />
      </TinaEditProvider>
    </>
  );
};

export default App;
