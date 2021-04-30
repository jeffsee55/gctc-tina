import React from "react";
import { Markdown } from "../../components/markdown";
import { Snippet } from "../../components/author/snippet";
import { createLocalClient } from "../../util/create-client";
import { useGraphqlForms } from "tina-graphql-gateway";
import PGallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import { Header2 } from "../../components/header";
import { Img } from "../../components/image";

import { sdk, AsyncReturnType } from "../../.tina/sdk";

const localSdk = sdk(createLocalClient());

export async function staticProps({ params }) {
  const relativePath = `${params.slug}.md`;

  return {
    props: {
      variables: { relativePath },
      data: await localSdk.PostQuery({
        variables: { relativePath },
      }),
    },
  };
}
export const staticPaths = async () => {
  const result = await localSdk.StaticPostsPaths({});
  return {
    paths: result.getCollection.documents.map((doc) => ({
      params: { slug: doc.sys.filename },
    })),
    fallback: false,
  };
};

export const Dynamic = (props: {
  variables: { relativePath: string };
  data: AsyncReturnType<typeof localSdk.PostQuery>;
}) => {
  const [data, isLoading] = useGraphqlForms<
    AsyncReturnType<typeof localSdk.PostQuery>
  >(
    localSdk.PostQueryString({
      variables: props.variables,
    })
  );

  return isLoading ? <Static data={props.data} /> : <Static data={data} />;
};

export const Static = (props: {
  data: AsyncReturnType<typeof localSdk.PostQuery>;
}) => {
  const { getNavDocument, getPostsDocument } = props.data;

  const { data } = getPostsDocument;

  return (
    <div>
      <Header2 {...getNavDocument} />
      <div className="h-12 md:h-32" />
      <div className="relative px-4 sm:px-6 lg:px-8">
        <div className="text-lg max-w-prose mx-auto mb-6 md:mb-24">
          {data.tags?.length > 0 && (
            <p className="text-base text-center leading-6 text-steel-medium font-semibold tracking-wide uppercase">
              {data.tags.join(", ")}
            </p>
          )}
          <div className="relative">
            <h1 className="mt-2 mb-8 text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
              {data.title}
            </h1>
          </div>
          <Markdown content={data?.preface} classNames={{ root: "prose" }} />
          <div>
            <Snippet center={true} className="my-8" {...data?.author} />
          </div>
        </div>
        <Img className={"mx-auto"} width={2000} quality={80} src={data.image} />
        <div className="my-12">
          <Markdown
            content={data?._body}
            classNames={{
              root: "max-w-prose prose mx-auto text-gray-500 ",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export const FooterCaption = (props: { currentView: { credit?: string } }) => {
  const { currentView } = props;

  return <span>{currentView.credit}</span>;
};

type BlockQuoteType = {
  children: React.ReactNode;
  avatar: string;
  title: string;
  name: string;
};
const BlockQuote = (props: BlockQuoteType) => {
  return (
    <div
      style={{ width: "500px" }}
      className="max-w-full relative text-base mx-auto lg:max-w-none w-64"
    >
      <blockquote className="relative bg-white rounded-lg shadow-lg">
        <div className="rounded-t-lg px-6 py-8 sm:px-10 sm:pt-10 sm:pb-8">
          <img
            src="https://tailwindui.com/img/logos/workcation-logo-steel-medium-mark-gray-800-and-steel-medium-text.svg"
            alt="Workcation"
            className="h-8"
          />
          <div className="relative text-lg text-gray-700 font-medium mt-8">
            <svg
              className="absolute top-0 left-0 transform -translate-x-3 -translate-y-2 h-8 w-8 text-gray-200"
              fill="currentColor"
              viewBox="0 0 32 32"
              aria-hidden="true"
            >
              <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
            </svg>

            <div className="relative">{props.children}</div>
          </div>
        </div>
        <cite className="relative flex items-center sm:items-start bg-steel-medium rounded-b-lg not-italic py-5 px-6 sm:py-5 sm:pl-12 sm:pr-10 sm:mt-10">
          <div className="relative rounded-full border-2 border-white sm:absolute sm:top-0 sm:transform sm:-translate-y-1/2">
            <img
              className="w-12 h-12 sm:w-20 sm:h-20 rounded-full bg-indigo-300"
              src="https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2.5&w=160&h=160&q=80"
              alt=""
            />
          </div>
          <span className="relative ml-4 text-indigo-300 font-semibold leading-6 sm:ml-24 sm:pl-1">
            <p className="text-white font-semibold sm:inline">{props.title}</p>
            <p className="sm:inline">CEO at Workcation</p>
          </span>
        </cite>
      </blockquote>
    </div>
  );
};

const Embed = (props: { children: React.ReactNode[] }) => {
  return (
    <div className="max-w-prose mx-auto lg:grid lg:grid-cols-2 lg:gap-8 lg:items-start">
      <div className="relative z-10 mb-12 lg:mb-0">{props.children[0]}</div>
      <div className="relative">{props.children[1]}</div>
    </div>
  );
};

const Testimonial = (props: BlockQuoteType) => {
  return (
    <div>
      <BlockQuote {...props} />
    </div>
  );
};

// This is only being used for MDX composability when placed in a Gallery, it's not actually used by it
const Image = (props: { src: string }) => {
  const [currentImage, setCurrentImage] = React.useState(0);
  const [viewerIsOpen, setViewerIsOpen] = React.useState(false);

  const openLightbox = React.useCallback(() => {
    setCurrentImage(0);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  return (
    <div className="mx-auto flex items-center justify-center">
      <button onClick={() => openLightbox()}>
        <img className="w-full h-full object-cover" src={props.src} />
      </button>
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={0}
              // @ts-ignore react images types are wonky
              components={{ FooterCaption }}
              views={[{ ...props, source: { regular: props.src } }]}
              formatters={{
                getAltText: (props) => {
                  return "";
                },
              }}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    </div>
  );
};

const Gallery = (props: {
  children: {
    props: { ast: { attributes: { name: string; value: string }[] } };
  }[];
}) => {
  const [photos, setPhotos] = React.useState<
    {
      src: string;
      credit?: string;
      creditSrc?: string;
      width: number;
      height: number;
    }[]
  >([]);
  React.useEffect(() => {
    const photos = props.children.map((child) => {
      const props: { [key: string]: string } = {};
      child.props.ast.attributes.map((item) => {
        props[item.name] = item.value;
      });
      return {
        ...props,
        src: props.src,
        credit: props.credit,
        creditSrc: props.creditSrc,
        width: parseInt(props.width),
        height: parseInt(props.height),
      };
    });

    setPhotos(photos);
  }, []);
  const [currentImage, setCurrentImage] = React.useState(0);
  const [viewerIsOpen, setViewerIsOpen] = React.useState(false);

  const openLightbox = React.useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  return (
    <div className="w-full mb-12">
      {photos.length && (
        <PGallery
          photos={photos}
          onClick={openLightbox}
          margin={3}
          renderImage={(props) => {
            const photo = photos[props.index];
            return (
              <button
                key={props.photo.src}
                onClick={(event) =>
                  props.onClick && props.onClick(event, { index: props.index })
                }
                style={{
                  height: props.photo.height,
                  width: props.photo.width,
                  margin: props.margin,
                }}
                className="relative"
              >
                <div className="absolute inset-0 opacity-0 hover:opacity-100 transition duration-500 ease-in-out">
                  <div className="z-10 absolute bottom-2 right-4 flex items-center text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      className="h-4 w-4"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {photo.creditSrc ? (
                      <a
                        href={photo.creditSrc}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <h6 className="ml-2 font-medium tracking-wider text-sm hover:underline">
                          {photo.credit || "unknown"}
                        </h6>
                      </a>
                    ) : (
                      <h6 className="ml-2 font-medium tracking-wider text-sm">
                        {photo.credit || "unknown"}
                      </h6>
                    )}
                  </div>
                </div>
                <img
                  className="w-full h-full object-cover"
                  src={props.photo.src}
                />
              </button>
            );
          }}
        />
      )}
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            {/* @ts-ignore react-images types suck */}
            <Carousel currentIndex={currentImage} views={photos} />
          </Modal>
        ) : null}
      </ModalGateway>
    </div>
  );
};
