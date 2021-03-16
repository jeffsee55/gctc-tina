import type { TinaCloudTemplate } from "tina-graphql-gateway-cli";
import { CuratedCollection } from "./post";

export const Page: TinaCloudTemplate = {
  name: "page",
  label: "Page",
  fields: [
    {
      type: "text",
      name: "title",
      label: "Title",
    },
    {
      type: "group",
      name: "seo",
      label: "SEO",
      fields: [
        {
          type: "text",
          name: "title",
          label: "Title",
        },
        {
          type: "text",
          name: "description",
          label: "Description",
        },
        {
          type: "text",
          name: "image",
          label: "Image",
        },
      ],
    },
    {
      type: "blocks",
      label: "Layers",
      name: "layers",
      templates: [
        {
          name: "layer-team",
          label: "Team Layer",
          fields: [
            {
              label: "Description",
              name: "description",
              type: "textarea",
            },
            {
              label: "Members",
              name: "members",
              type: "reference-list",
              section: "authors",
            },
          ],
        },
        {
          name: "layer-post-list",
          label: "Post List Layer",
          fields: [
            {
              label: "Description",
              name: "description",
              type: "textarea",
            },
            {
              label: "Posts",
              name: "posts",
              type: "reference-list",
              section: "posts",
            },
          ],
        },
        {
          name: "layer-dark-feature",
          label: "Post List Layer",
          fields: [
            {
              label: "Hint",
              name: "hint",
              type: "text",
            },
            {
              label: "Title",
              name: "title",
              type: "text",
            },
            {
              label: "Description",
              name: "description",
              type: "textarea",
            },
            {
              name: "feature_list",
              label: "Feature List",
              type: "group-list",
              fields: [
                {
                  name: "header",
                  label: "Header",
                  type: "text",
                },
                {
                  name: "description",
                  type: "text",
                  label: "Description",
                },
              ],
            },
          ],
        },
        {
          name: "layer-leadership",
          label: "Leadership Layer",
          fields: [
            {
              label: "Title",
              name: "title",
              type: "text",
            },
            {
              label: "Posts",
              name: "leaders",
              type: "reference-list",
              section: "authors",
            },
          ],
        },
        {
          name: "layer-sponsors",
          label: "Post List Layer",
          fields: [
            {
              label: "Title",
              name: "title",
              type: "text",
            },
            {
              label: "Sponsors List",
              name: "sponsors",
              type: "group-list",
              fields: [
                {
                  label: "Name",
                  name: "name",
                  type: "select",
                  options: ["kinetik", "adidas", "hyperice"],
                },
                {
                  name: "link",
                  label: "Link",
                  type: "text",
                },
              ],
            },
          ],
        },
        CuratedCollection,
        {
          name: "layer-cta",
          label: "Post List Layer",
          fields: [
            {
              label: "Description",
              name: "description",
              type: "textarea",
            },
            {
              label: "CTA Text",
              name: "cta_text",
              type: "text",
            },
            {
              label: "CTA Link",
              name: "cta_link",
              type: "text",
            },
            {
              label: "CTA Image",
              name: "cta_image",
              type: "text",
            },
          ],
        },
      ],
    },
  ],
};
