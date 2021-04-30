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
          name: "layerTeam",
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
              collection: "authors",
            },
          ],
        },
        {
          name: "layerPostList",
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
              collection: "posts",
            },
          ],
        },
        {
          name: "layerDarkFeature",
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
          name: "layerLeadership",
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
              collection: "authors",
            },
          ],
        },
        {
          name: "layerSponsors",
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
          name: "layerCta",
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

export const TrainingPage: TinaCloudTemplate = {
  name: "trainingPage",
  label: "Training Page",
  fields: [
    {
      type: "group-list",
      name: "faq",
      label: "FAQ",
      fields: [
        {
          type: "text",
          name: "question",
          label: "Question",
        },
        {
          type: "text",
          name: "answer",
          label: "Answer",
        },
      ],
    },
  ],
};
