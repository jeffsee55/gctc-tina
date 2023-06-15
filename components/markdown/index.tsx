import React from "react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export const Markdown = ({
  classNames = {},
  content,
}: {
  classNames?: { p?: string };
  content: any;
}) => {
  return (
    <TinaMarkdown
      components={{
        p: (props) => <p className={classNames["p"] || ""} {...props} />,
      }}
      content={content}
    />
  );
};
