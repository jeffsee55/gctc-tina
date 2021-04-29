import { defineSchema } from "tina-graphql-gateway-cli";
import { Athlete, Author } from "./schema/author";
import { Form } from "./schema/form";
import { Nav } from "./schema/nav";
import { Page } from "./schema/pages";
import { Post, Curated } from "./schema/post";

export default defineSchema({
  collections: [
    {
      label: "Posts",
      name: "posts",
      path: "content/posts",
      templates: [Post],
    },
    {
      label: "Pages",
      name: "pages",
      path: "content/pages",
      templates: [Page],
    },
    {
      label: "Forms",
      name: "forms",
      path: "content/forms",
      templates: [Form],
    },
    {
      label: "Curated",
      name: "curated",
      path: "content/curated",
      templates: [Curated],
    },
    {
      label: "Authors",
      name: "authors",
      path: "content/authors",
      templates: [Author, Athlete],
    },
    {
      label: "Nav",
      name: "nav",
      path: "content/nav",
      templates: [Nav],
    },
  ],
});
