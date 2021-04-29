import type { TinaCloudTemplate } from "tina-graphql-gateway-cli";

export const CuratedCollection: TinaCloudTemplate = {
  name: "curatedCollection",
  label: "Curated Collection",
  fields: [
    {
      label: "Description",
      name: "description",
      type: "textarea",
    },
    {
      label: "Collection Curations",
      name: "posts_collection",
      type: "reference-list",
      collection: "posts",
    },
  ],
};

export const Post: TinaCloudTemplate = {
  name: "post",
  label: "Post",
  fields: [
    {
      name: "title",
      label: "Title",
      type: "text",
      description: "The name of your post, keep it short!",
    },
    {
      name: "tags",
      label: "Tags",
      type: "tags",
    },
    {
      name: "image",
      label: "Image URL",
      type: "text",
      description: "The external image URL",
    },
    {
      name: "image_small",
      label: "Small Image URL",
      type: "text",
      description: "The external image URL for smaller rendering",
    },
    {
      name: "accolades",
      label: "Accolades",
      description: "Key accomplishments which make this person stand out",
      type: "group",
      fields: [
        {
          name: "figure",
          type: "text",
          label: "Figure",
          description: "A single number or word to emphasize",
        },
        {
          name: "description",
          type: "text",
          label: "Description",
        },
      ],
    },
    {
      name: "author",
      type: "reference",
      collection: "authors",
      label: "Author",
    },
    {
      name: "preface",
      label: "Preface",
      type: "textarea",
    },
  ],
};

export const Curated: TinaCloudTemplate = {
  name: "curated",
  label: "Curated",
  fields: [
    {
      type: "text",
      name: "title",
      label: "Title",
    },
    {
      type: "blocks",
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
              type: "textarea",
            },
            {
              label: "Hero Post",
              name: "hero_post",
              type: "reference",
              collection: "posts",
            },
          ],
        },
        CuratedCollection,
      ],
    },
  ],
};
