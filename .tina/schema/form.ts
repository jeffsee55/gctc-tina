import type { TinaCloudTemplate } from "tina-graphql-gateway-cli";

export const Form: TinaCloudTemplate = {
  name: "jenCcoaching",
  label: "Jen Coaching",
  fields: [
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
      name: "fields",
      label: "Fields",
      type: "blocks",
      templates: [
        {
          name: "fieldBoolean",
          label: "Boolean Field",
          fields: [
            {
              label: "Label",
              name: "label",
              type: "text",
            },
            {
              label: "Sub Label",
              name: "subLabel",
              type: "text",
            },
            {
              label: "Name",
              name: "name",
              description:
                "This will be the identifier in the form submission, make sure it doesn't have any spaces or special characters.",
              type: "text",
            },
          ],
        },
        {
          name: "fieldText",
          label: "Text Field",
          fields: [
            {
              label: "Label",
              name: "label",
              type: "text",
            },
            {
              label: "Sub Label",
              name: "subLabel",
              type: "text",
            },
            {
              label: "Placeholder",
              name: "placeholder",
              type: "text",
            },
            {
              label: "Prefix",
              name: "prefix",
              type: "text",
            },
            {
              label: "Suffix",
              name: "suffix",
              type: "text",
            },
            {
              label: "Name",
              name: "name",
              description:
                "This will be the identifier in the form submission, make sure it doesn't have any spaces or special characters.",
              type: "text",
            },
          ],
        },
        {
          name: "fieldTextarea",
          label: "TextArea Field",
          fields: [
            {
              label: "Label",
              name: "label",
              type: "text",
            },
            {
              label: "Sub Label",
              name: "subLabel",
              type: "text",
            },
            {
              label: "Placeholder",
              name: "placeholder",
              type: "text",
            },
            {
              label: "Name",
              name: "name",
              description:
                "This will be the identifier in the form submission, make sure it doesn't have any spaces or special characters.",
              type: "text",
            },
          ],
        },
        {
          name: "fieldCheckbox",
          label: "Checkbox Field",
          fields: [
            {
              label: "Label",
              name: "label",
              type: "text",
            },
            {
              label: "Sub Label",
              name: "subLabel",
              type: "text",
            },
            {
              label: "Placeholder",
              name: "placeholder",
              type: "text",
            },
            {
              label: "Name",
              name: "name",
              description:
                "This will be the identifier in the form submission, make sure it doesn't have any spaces or special characters.",
              type: "text",
            },
            {
              label: "Options",
              name: "options",
              type: "group-list",
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
          name: "fieldRadio",
          label: "Radio Field",
          fields: [
            {
              label: "Label",
              name: "label",
              type: "text",
            },
            {
              label: "Sub Label",
              name: "subLabel",
              type: "text",
            },
            {
              label: "Placeholder",
              name: "placeholder",
              type: "text",
            },
            {
              label: "Name",
              name: "name",
              description:
                "This will be the identifier in the form submission, make sure it doesn't have any spaces or special characters.",
              type: "text",
            },
            {
              label: "Options",
              name: "options",
              type: "group-list",
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
          name: "fieldGroupText",
          label: "Group Text Field",
          fields: [
            {
              label: "Label",
              name: "label",
              type: "text",
            },
            {
              label: "Sub Label",
              name: "subLabel",
              type: "text",
            },
            {
              name: "fields",
              type: "blocks",
              label: "Fields",
              templates: [
                {
                  name: "fieldText",
                  label: "Text Field",
                  fields: [
                    {
                      label: "Label",
                      name: "label",
                      type: "text",
                    },
                    {
                      label: "Sub Label",
                      name: "subLabel",
                      type: "text",
                    },
                    {
                      label: "Name",
                      name: "name",
                      description:
                        "This will be the identifier in the form submission, make sure it doesn't have any spaces or special characters.",
                      type: "text",
                    },
                  ],
                },
              ],
            },
            {
              label: "Prefix Class",
              name: "prefix_class",
              type: "text",
            },
          ],
        },
        {
          name: "fieldWeekCheckbox",
          label: "Group Text Field",
          fields: [
            {
              label: "Label",
              name: "label",
              type: "text",
            },
            {
              label: "Sub Label",
              name: "subLabel",
              type: "text",
            },
            {
              label: "Placeholder",
              name: "placeholder",
              type: "text",
            },
            {
              label: "Name",
              name: "name",
              description:
                "This will be the identifier in the form submission, make sure it doesn't have any spaces or special characters.",
              type: "text",
            },
          ],
        },
      ],
    },
  ],
};
