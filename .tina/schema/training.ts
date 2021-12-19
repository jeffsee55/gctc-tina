import { TinaTemplate } from "@tinacms/cli";

export const Training: TinaTemplate = {
  name: "training",
  label: "Training Plan",
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
      name: "event",
      label: "Event",
      type: "string",
      options: ["5k", "10k", "half-marathon", "marathon"],
    },
    {
      name: "category",
      label: "Category",
      type: "string",
      options: ["silver", "gold", "platinum"],
    },
    {
      name: "time",
      label: "Time",
      type: "string",
    },
    {
      name: "workouts",
      list: true,
      type: "object",
      label: "Workouts",
      fields: [
        {
          type: "number",
          label: "Day",
          name: "Day",
          description: "",
        },
        {
          type: "string",
          label: "Title",
          name: "Title",
          description: "",
        },
        {
          type: "string",
          label: "Description",
          name: "Description",
          description: "",
        },
        {
          type: "string",
          label: "Category",
          name: "Category",
          description: "",
          options: ["easy", "medium", "hard"],
        },
      ],
    },
  ],
};
