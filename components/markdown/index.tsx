import React from "react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export const Markdown = ({ content }) => {
  return <TinaMarkdown content={content} />;
};
