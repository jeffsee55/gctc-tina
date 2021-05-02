import { TinaCloudTemplate } from "tina-graphql-gateway-cli";

export const Training: TinaCloudTemplate = {
  name: "training",
  label: "Training Plan",
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
      name: "event",
      label: "Event",
      type: "select",
      options: ["5k", "10k", "half-marathon", "marathon"],
    },
    {
      name: "category",
      label: "Category",
      type: "select",
      options: ["silver", "gold", "platinum"],
    },
    {
      name: "time",
      label: "Time",
      type: "text",
    },
    {
      name: "workouts",
      type: "group-list",
      label: "Workouts",
      fields: [
        {
          type: "number",
          label: "Day",
          name: "Day",
          description: "",
        },
        {
          type: "text",
          label: "Title",
          name: "Title",
          description: "",
        },
        {
          type: "textarea",
          label: "Description",
          name: "Description",
          description: "",
        },
        {
          type: "select",
          label: "Category",
          name: "Category",
          description: "",
          options: ["easy", "medium", "hard"],
        },
      ],
    },
  ],
};
