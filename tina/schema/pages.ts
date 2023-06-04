import type { TinaTemplate } from "@tinacms/cli";
import { CuratedCollection } from "./post";

export const Page: TinaTemplate = {
  name: "page",
  label: "Page",
  fields: [
    {
      type: "string",
      name: "title",
      label: "Title",
    },
    {
      type: "string",
      name: "_body",
      isBody: true,
      label: "Body",
    },
    {
      type: "object",
      name: "seo",
      label: "SEO",
      fields: [
        {
          type: "string",
          name: "title",
          label: "Title",
        },
        {
          type: "string",
          name: "description",
          label: "Description",
        },
        {
          type: "string",
          name: "image",
          label: "Image",
        },
      ],
    },
    {
      type: "object",
      list: true,
      label: "Layers",
      name: "layers",
      templates: [
        {
          name: "layerHero",
          label: "Hero Layer",
          fields: [
            {
              label: "Image",
              name: "image",
              type: "string",
            },
          ],
        },
        {
          name: "layerTeam",
          label: "Team Layer",
          fields: [
            {
              label: "Description",
              name: "description",
              type: "string",
            },
            {
              label: "Members",
              name: "members",
              type: "object",
              list: true,
              ui: {
                itemProps: item => {
                  return {label: item.reference || 'N/A'}
                }
              },
              fields: [{
                name: "reference",
                label: "Reference",
                type: "reference",
                collections: ["authors"],
              }]
            },
          ],
        },
        {
          name: "layerPostList",
          label: "Post List Layer",
          fields: [
            {
              label: "Description",
              name: "postListDescription",
              type: "rich-text",
            },
            {
              label: "Posts",
              name: "posts",
              type: "object",
              list: true,
              fields: [{
                name: 'reference',
                label: "Reference",
                type: 'reference',
                collections: ["posts"],
              }]
            },
          ],
        },
        {
          name: "layerDarkFeature",
          label: "Feature List Layer",
          fields: [
            {
              label: "Hint",
              name: "hint",
              type: "string",
            },
            {
              label: "Title",
              name: "title",
              type: "string",
            },
            {
              label: "Description",
              name: "description",
              type: "string",
            },
            {
              name: "feature_list",
              label: "Feature List",
              list: true,
              type: "object",
              fields: [
                {
                  name: "header",
                  label: "Header",
                  type: "string",
                },
                {
                  name: "description",
                  type: "string",
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
              type: "string",
            },
            {
              label: "Posts",
              name: "leaders",
              type: "object",
              list: true,
              fields: [{
                name: 'reference',
                label: "Reference",
                type: 'reference',
                collections: ["authors"],
              }]
            },
          ],
        },
        {
          name: "layerSponsors",
          label: "Sponsors Layer",
          fields: [
            {
              label: "Title",
              name: "title",
              type: "string",
            },
            {
              label: "Sponsors List",
              name: "sponsors",
              list: true,
              type: "object",
              fields: [
                {
                  label: "Name",
                  name: "name",
                  type: "string",
                  options: ["kinetik", "adidas", "hyperice"],
                },
                {
                  name: "link",
                  label: "Link",
                  type: "string",
                },
              ],
            },
          ],
        },
        CuratedCollection,
        {
          name: "layerCta",
          label: "Call to Action",
          fields: [
            {
              label: "Description",
              name: "ctaDescription",
              type: "rich-text",
            },
            {
              label: "CTA Text",
              name: "cta_text",
              type: "string",
            },
            {
              label: "CTA Link",
              name: "cta_link",
              type: "string",
            },
            {
              label: "CTA Image",
              name: "cta_image",
              type: "string",
            },
          ],
        },
      ],
    },
  ],
};

export const TrainingPage: TinaTemplate = {
  name: "trainingPage",
  label: "Training Page",
  fields: [
    {
      list: true,
      type: "object",
      name: "faq",
      label: "FAQ",
      fields: [
        {
          type: "string",
          name: "question",
          label: "Question",
        },
        {
          type: "string",
          name: "answer",
          label: "Answer",
        },
      ],
    },
  ],
};
