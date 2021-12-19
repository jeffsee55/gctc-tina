import { defineSchema } from "@tinacms/cli";
import { Athlete, Author } from "./schema/author";
import { Form } from "./schema/form";
import { Nav } from "./schema/nav";
import { Training } from "./schema/training";
import { Page, TrainingPage } from "./schema/pages";
import { Post, Curated } from "./schema/post";

export default defineSchema({
  collections: [
    {
      label: "Training",
      name: "training",
      path: "content/training",
      templates: [Training],
    },
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
      templates: [Page, TrainingPage],
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
