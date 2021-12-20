import type { TinaTemplate} from "@tinacms/cli";

export const Athlete: TinaTemplate= {
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
      type: "string",
      name: "_body",
      isBody: true,
      label: "Body",
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
      type: "object",
      list: true,
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

export const Author: TinaTemplate= {
  name: "author",
  label: "Author",
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
      type: "string",
      name: "_body",
      isBody: true,
      label: "Body",
    },
    {
      name: "role",
      label: "role",
      type: "string",
      description: "What's your job?",
      options: ["Head Coach & Founder", "Wellness Coach & Founder", "Athlete"],
    },
    {
      name: "accolades",
      type: "object",
      list: true,
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
      name: "image",
      label: "Image URL",
      type: "string",
      description: "The external image URL",
    },
    {
      name: "bio_image",
      label: "Bio Image URL",
      type: "string",
      description: "The external image URL",
    },
    {
      name: "story_image",
      label: "Story Image URL",
      type: "string",
      description: "The external image URL",
    },
    {
      name: "form",
      label: "Form",
      type: "reference",
      collections: ["forms"],
    },
    {
      label: "Post Collection",
      name: "posts_collection",
      type: 'object',
      list: true,
      fields: [{
        name: 'reference',
        label: "Reference",
        type: "reference",
        collections: ["posts"],
      }]
    },
    {
      name: "ebook",
      label: "Ebook",
      type: "object",
      fields: [
        {
          name: "title",
          label: "Title",
          type: "string",
        },
        {
          name: "description",
          label: "Description",
          type: "string",
        },
        {
          name: "link",
          label: "Link",
          type: "string",
        },
        {
          name: "link_text",
          label: "Link text",
          type: "string",
        },
        {
          name: "image",
          label: "Image",
          type: "string",
        },
      ],
    },
  ],
};
