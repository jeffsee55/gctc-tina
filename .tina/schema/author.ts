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

export const Author: TinaCloudTemplate = {
  name: "author",
  label: "Author",
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
      name: "role",
      label: "role",
      type: "select",
      description: "What's your job?",
      options: ["Head Coach & Founder", "Wellness Coach & Founder", "Athlete"],
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
      name: "image",
      label: "Image URL",
      type: "text",
      description: "The external image URL",
    },
    {
      name: "bio_image",
      label: "Bio Image URL",
      type: "text",
      description: "The external image URL",
    },
    {
      name: "story_image",
      label: "Story Image URL",
      type: "text",
      description: "The external image URL",
    },
    {
      name: "form",
      label: "Form",
      type: "reference",
      collection: "forms",
    },
    {
      label: "Post Collection",
      name: "posts_collection",
      type: "reference-list",
      collection: "posts",
    },
    {
      name: "ebook",
      label: "Ebook",
      type: "group",
      fields: [
        {
          name: "title",
          label: "Title",
          type: "text",
        },
        {
          name: "description",
          label: "Description",
          type: "textarea",
        },
        {
          name: "link",
          label: "Link",
          type: "text",
        },
        {
          name: "link_text",
          label: "Link text",
          type: "text",
        },
        {
          name: "image",
          label: "Image",
          type: "text",
        },
      ],
    },
  ],
};
