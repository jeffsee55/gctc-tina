import type { TinaTemplate } from "@tinacms/cli";

export const CuratedCollection: TinaTemplate = {
  name: "curatedCollection",
  label: "Curated Collection",
  fields: [
    {
      label: "Description",
      name: "description",
      type: "string",
    },
    {
      label: "Collection Curations",
      name: "posts_collection",
      type: "object",
      list: true,
      fields: [{
        label: "Reference",
        name: "reference",
        type: 'reference',
        collections: ["posts"],
      }]
    },
  ],
};

export const Post: TinaTemplate = {
  name: "post",
  label: "Post",
  fields: [
    {
      name: "title",
      label: "Title",
      type: "string",
      description: "The name of your post, keep it short!",
    },
    {
      name: "tags",
      label: "Tags",
      list: true,
      type: "string",
    },
    {
      name: "image",
      label: "Image URL",
      type: "string",
      description: "The external image URL",
    },
    {
      name: "image_small",
      label: "Small Image URL",
      type: "string",
      description: "The external image URL for smaller rendering",
    },
    {
      name: "accolades",
      label: "Accolades",
      description: "Key accomplishments which make this person stand out",
      type: "object",
      fields: [
        {
          name: "figure",
          type: "string",
          label: "Figure",
          description: "A single number or word to emphasize",
        },
        {
          name: "description",
          type: "string",
          label: "Description",
        },
      ],
    },
    {
      name: "author",
      type: "reference",
      collections: ["authors"],
      label: "Author",
    },
    {
      name: "preface",
      label: "Preface",
      type: "string",
    },
    {
      name: "_body",
      label: "Body",
      isBody: true,
      type: "string",
    },
  ],
};

export const Curated: TinaTemplate = {
  name: "curated",
  label: "Curated",
  fields: [
    {
      type: "string",
      name: "title",
      label: "Title",
    },
    {
      type: "object",
      list: true,
      name: "curations",
      label: "Curations",
      templates: [
        {
          name: "curatedHero",
          label: "Curated Hero",
          fields: [
            {
              label: "Description",
              name: "description",
              type: "string",
            },
            {
              label: "Hero Post",
              name: "hero_post",
              type: "reference",
              collections: ["posts"],
            },
          ],
        },
        CuratedCollection,
      ],
    },
  ],
};
