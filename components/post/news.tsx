import React from "react";
import type * as Tina from "../../tina/sdk";
import { Markdown } from "../markdown";

export const News = (props: Tina.CuratedCollectionFragment) => {
  return (
    <div className="md:pt-36 bg-steel-xdark pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
      <div className="relative max-w-lg mx-auto divide-y-2 divide-gray-200 lg:max-w-7xl">
        <div>
          <Markdown
            content={props.description}
            classNames={{
              root: "text-gray-200",
              h2:
                "text-3xl tracking-tight font-extrabold text-gray-100 sm:text-4xl",
              p: "text-xl mt-3",
            }}
          />
        </div>
        <div className="mt-6 pt-10 grid gap-16 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-12">
          {props.posts_collection.map((post) => {
            return <Story {...post} />;
          })}
        </div>
      </div>
    </div>
  );
};

type StoryType = Tina.CuratedCollectionFragment["posts_collection"][0];

const Story = (props: StoryType) => {
  return (
    <div>
      <a href={`/posts/${props.sys.breadcrumbs.join("/")}`} className="mt-2 block">
        <p className="text-xl font-semibold text-gray-100">
          {props.data.title}
        </p>
        <Markdown
          content={props.data.preface}
          classNames={{
            root: "mt-3 text-base text-gray-200",
            p: "line-clamp-3",
          }}
        />
      </a>
      <div className="mt-3">
        <a
          href={`/posts/${props.sys.breadcrumbs.join("/")}`}
          className="text-base font-semibold text-steel-xlight hover:text-steel-light"
        >
          Read full story
        </a>
      </div>
    </div>
  );
};
