import { defineConfig } from "tinacms";
import { Athlete, Author } from "./schema/author";
import { Form } from "./schema/form";
import { Nav } from "./schema/nav";
import { Training } from "./schema/training";
import { Page, TrainingPage } from "./schema/pages";
import { Post, Curated } from "./schema/post";

export default defineConfig({
  branch: process.env.VERCEL_GIT_COMMIT_REF,
  clientId: process.env.TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    publicFolder: "public",
    outputFolder: "admin",
  },
  media: {
    loadCustomStore: async () => {
      const pack = await import("next-tinacms-cloudinary");
      const store = pack.TinaCloudCloudinaryMediaStore;
      console.log(store);
      return store;
    },
  },
  schema: {
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
        label: "Training Plans",
        name: "trainingPlans",
        format: "json",
        path: "content/training-2",
        fields: [
          {
            label: "Event",
            name: "event",
            type: "string",
          },
          {
            label: "Category",
            name: "category",
            type: "string",
          },
          {
            label: "Time",
            name: "time",
            type: "string",
          },
          {
            label: "Workouts",
            name: "workouts",
            type: "object",
            list: true,
            fields: [
              {
                label: "Day",
                name: "Day",
                type: "number",
              },
              {
                label: "Notes",
                name: "Notes",
                type: "string",
                options: ["easy", "medium", "hard"],
              },
              {
                label: "Title",
                name: "Title",
                type: "string",
              },
              {
                label: "Description",
                name: "Description",
                type: "string",
              },
            ],
          },
        ],
      },
      {
        label: "Nav",
        name: "nav",
        path: "content/nav",
        templates: [Nav],
      },
    ],
  },
  cmsCallback: (cms) => {
    console.log(cms.media);
    return cms;
  },
});
