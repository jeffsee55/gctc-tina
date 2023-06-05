import React from "react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import type { LayerPostListProps } from "../page";
import { Markdown } from "../markdown";
import { tinaField } from "tinacms/dist/react";

export const ThumbnailList = (props: LayerPostListProps) => {
  const colors = {
    base: "#e1e1db",
    first: "#e3d6b9",
    second: "#e4bc91",
    third: "#d8aa50",
    fourth: "#df8449",
  };
  return (
    <div
      // style={{ backgroundColor: colors.base }}
      className="relative pt-16 pb-64 px-4 sm:px-6 lg:pt-24 lg:pb-36 lg:px-8 bg-white overflow-hidden"
    >
      <div className="absolute bottom-0 righ-0 left-0">
        <svg
          width={2807}
          height={253}
          viewBox="0 0 2807 253"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx={149} cy={45} r={45} fill={colors.fourth} />
          <path
            d="M1 61.0029L476.04 69.7176L843.631 52.2882H1256.46L1850.26 15.9769L2353.58 0L2806 26.8703V252H1V61.0029Z"
            fill={colors.first}
            stroke="#DCD1C1"
          />
          <path
            d="M1.01073 110.157L0.5 110.146V110.657V252V252.5H1H2806H2806.5V252V110.657V110.141L2805.98 110.157L2511.93 119.628L2511.91 119.629L2116.09 98.5007L2116.07 98.4998L2116.05 98.5L1584.46 105.057L1584.46 105.057L1115.09 115.985L1115.07 115.986L662.683 98.5004L662.662 98.4996L662.641 98.5005L272.446 115.985L1.01073 110.157Z"
            fill={colors.second}
            stroke="#DCD1C1"
          />
          <path
            d="M1.00825 162.691L0.5 162.683V163.191V252V252.5H1H2806H2806.5V252V163.191V162.685L2805.99 162.691L2461.02 167.059L1895.52 152.5L1895.51 152.5L1895.49 152.5L1290.38 167.059L775.782 152.5L775.762 152.5L775.742 152.501L442.1 169.97L1.00825 162.691Z"
            fill={colors.third}
            stroke="#DCD1C1"
          />
          <path
            d="M1 205.528H0.5V206.028V252V252.5H1H2806H2806.5V252V206.028V205.528H2806H2404.48L1895.51 200.5L1895.5 200.5L1460.05 205.528L1460.04 205.528L1081.15 212.711H583.49L227.22 205.528H227.21H1ZM1895.51 200.997V201V200.997Z"
            fill={colors.fourth}
            stroke="#DCD1C1"
          />
        </svg>
      </div>
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center">
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4 prose" data-tina-field={tinaField(props,'postListDescription')}>
            <TinaMarkdown content={props.postListDescription} />
          </p>
        </div>
        <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
          {props.posts?.map((reference) => {
            const post = reference.reference
            if(!post) {
              return null
            }
            switch (post.__typename) {
              case "PostsPost":
                return (
              <div data-tina-field={tinaField(reference)} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                <div className="flex-shrink-0">
                  <img
                    className="h-48 w-full object-cover"
                    src={post.image}
                    alt=""
                  />
                </div>
                <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-steel-medium">
                      {post.tags?.join(", ")}
                    </p>
                    <a
                      href={`/posts/${post._sys.filename}`}
                      className="block mt-2"
                    >
                      <p className="text-xl font-semibold text-gray-900">
                        {post.title}
                      </p>
                      <p className="mt-3 text-base text-gray-500 line-clamp-3">
                        {post.preface}
                      </p>
                      <div className="mt-6 text-base font-medium">
                        <a
                          href={`/posts/${post._sys.filename}`}
                          className="text-steel-medium hover:text-steel-light"
                        >
                          Read
                        </a>
                      </div>
                    </a>
                  </div>
                </div>
              </div>

                )
              default:
                throw new Error(`Unexpected post type ${post.__typename}`)
                break;
            }
          })}
        </div>
      </div>
    </div>
  );
};
