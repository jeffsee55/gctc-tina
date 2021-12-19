import type { TinaTemplate } from "@tinacms/cli";

export const Athlete: TinaTemplate = {
  name: "athlete",
  label: "Athlete",
  fields: [
    {
      name: "name",
      label: "Name",
      type: "string",
      description: "Your first name & last name",
    },
    {
      name: "description",
      label: "Description",
      type: "string",
      description: "Your first name & last name",
    },
    {
      name: "country",
      label: "Country",
      type: "string",
    },
    {
      name: "personal_bests",
      list: true,
      type: "object",
      fields: [
        {
          name: "event",
          type: "string",
          label: "Event",
          description: "A single number or word to emphasize",
        },
        {
          name: "time",
          type: "string",
          label: "Time",
        },
      ],
      label: "Personal Bests",
      description: "Key accomplishments which make this person stand out",
    },
    {
      name: "accolades",
      list: true,
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
      label: "Accolades",
      description: "Key accomplishments which make this person stand out",
    },
    {
      name: "social_media",
      label: "Social Media",
      list: true,
      type: "object",
      fields: [
        {
          name: "source",
          label: "Source",
          type: "string",
          options: ["twitter", "instagram"],
        },
        {
          name: "handle",
          type: "string",
          label: "Hanlde",
        },
      ],
    },
    {
      name: "image",
      label: "Image URL",
      type: "string",
      description: "The external image URL",
    },
  ],
};

export const Nav: TinaTemplate = {
  label: "Site Nav",
  name: "nav",
  fields: [
    {
      type: "object",
      list: true,
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
              type: "string",
            },
            {
              label: "Children",
              name: "children",
              list: true,
              type: "object",
              fields: [
                {
                  type: "string",
                  name: "label",
                  label: "Label",
                },
                {
                  type: "string",
                  name: "description",
                  label: "Description",
                },
                {
                  type: "string",
                  name: "value",
                  label: "Value",
                },
                {
                  type: "string",
                  name: "icon",
                  label: "Icon",
                },
              ],
            },
            {
              label: "Extra",
              name: "extra",
              list: true,
              type: "object",
              fields: [
                {
                  type: "string",
                  name: "label",
                  label: "Label",
                },
                {
                  type: "string",
                  name: "value",
                  label: "Value",
                },
                {
                  type: "string",
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
              type: "string",
            },
            {
              label: "Featured Post",
              name: "featured_post",
              type: "reference",
              collections: ["posts"],
            },
            {
              label: "From The Blog",
              name: "from_the_blog",
              type: "reference",
              collections: ["posts"],
            },
            {
              label: "Read More",
              name: "read_more",
              type: "object",
              fields: [
                {
                  type: "string",
                  name: "label",
                  label: "Label",
                },
                {
                  type: "string",
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
              type: "string",
            },
            {
              name: "value",
              description:
                "A URL-friendly version, ensure no spaces or special characters are included.",
              label: "Value",
              type: "string",
            },
          ],
        },
      ],
    },
    {
      label: "Show Auth",
      name: "show_auth",
      type: "boolean",
    },
  ],
};
