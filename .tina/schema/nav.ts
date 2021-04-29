import type { TinaCloudTemplate } from "tina-graphql-gateway-cli";

export const Athlete: TinaCloudTemplate = {
  name: "athlete",
  label: "Athlete",
  fields: [
    {
      name: "name",
      label: "Name",
      type: "text",
      description: "Your first name & last name",
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      description: "Your first name & last name",
    },
    {
      name: "country",
      label: "Country",
      type: "text",
    },
    {
      name: "personal_bests",
      type: "group-list",
      fields: [
        {
          name: "event",
          type: "text",
          label: "Event",
          description: "A single number or word to emphasize",
        },
        {
          name: "time",
          type: "text",
          label: "Time",
        },
      ],
      label: "Personal Bests",
      description: "Key accomplishments which make this person stand out",
    },
    {
      name: "accolades",
      type: "group-list",
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
      label: "Accolades",
      description: "Key accomplishments which make this person stand out",
    },
    {
      name: "social_media",
      label: "Social Media",
      type: "group-list",
      fields: [
        {
          name: "source",
          label: "Source",
          type: "select",
          options: ["twitter", "instagram"],
        },
        {
          name: "handle",
          type: "text",
          label: "Hanlde",
        },
      ],
    },
    {
      name: "image",
      label: "Image URL",
      type: "text",
      description: "The external image URL",
    },
  ],
};

export const Nav: TinaCloudTemplate = {
  label: "Site Nav",
  name: "nav",
  fields: [
    {
      type: "blocks",
      label: "Items",
      name: "items",
      templates: [
        {
          name: "navItemPopout",
          label: "Nav Item Popout",
          fields: [
            {
              label: "Label",
              name: "label",
              type: "text",
            },
            {
              label: "Children",
              name: "children",
              type: "group-list",
              fields: [
                {
                  type: "text",
                  name: "label",
                  label: "Label",
                },
                {
                  type: "text",
                  name: "description",
                  label: "Description",
                },
                {
                  type: "text",
                  name: "value",
                  label: "Value",
                },
                {
                  type: "text",
                  name: "icon",
                  label: "Icon",
                },
              ],
            },
            {
              label: "Extra",
              name: "extra",
              type: "group-list",
              fields: [
                {
                  type: "text",
                  name: "label",
                  label: "Label",
                },
                {
                  type: "text",
                  name: "value",
                  label: "Value",
                },
                {
                  type: "text",
                  name: "icon",
                  label: "Icon",
                },
              ],
            },
          ],
        },
        {
          label: "Nav Item More",
          name: "navItemMore",
          fields: [
            {
              label: "Label",
              name: "label",
              type: "text",
            },
            {
              label: "Featured Post",
              name: "featured_post",
              type: "reference",
              collection: "posts",
            },
            {
              label: "From The Blog",
              name: "from_the_blog",
              type: "reference-list",
              collection: "posts",
            },
            {
              label: "Read More",
              name: "read_more",
              type: "group",
              fields: [
                {
                  type: "text",
                  name: "label",
                  label: "Label",
                },
                {
                  type: "text",
                  name: "value",
                  label: "Value",
                },
              ],
            },
          ],
        },
        {
          label: "Nav Item Link",
          name: "navItemLink",
          fields: [
            {
              name: "label",
              label: "Label",
              type: "text",
            },
            {
              name: "value",
              description:
                "A URL-friendly version, ensure no spaces or special characters are included.",
              label: "Value",
              type: "text",
            },
          ],
        },
      ],
    },
    {
      label: "Show Auth",
      name: "show_auth",
      type: "toggle",
    },
  ],
};
