import React from "react";
// import * as Tina from "../../tina/sdk";
import { Img } from "../image";

export const Snippet = (
  props: {
    short?: boolean;
    center?: boolean;
    className?: string;
  } & Tina.AuthorSnippetFragment
) => {
  const justifyClass = props.center ? "justify-center" : "";
  return (
    <div className={props.className}>
      <div className={`flex ${justifyClass} items-center`}>
        <div className="flex-shrink-0">
          <a href={`/team/${props._sys.filename}`}>
            <Img
              className="h-10 w-10 rounded-full"
              src={props.image || ""}
              width={75}
              quality={90}
              alt=""
            />
          </a>
        </div>
        <div className="ml-3">
          <p className="text-sm leading-5 font-medium text-gray-900">
            <a
              href={`/team/${props._sys.filename}`}
              className="hover:underline"
            >
              {props.name}
            </a>
          </p>
          {!props.short && (
            <div className="flex text-sm leading-5 text-gray-500">
              <time dateTime="2020-03-16">Mar 16, 2020</time>
              <span className="mx-1">·</span>
              <span>6 min read</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
