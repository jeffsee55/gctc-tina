import type { TinaTemplate } from "@tinacms/cli";

export const Form: TinaTemplate = {
  name: "jenCcoaching",
  label: "Jen Coaching",
  fields: [
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
      name: "fields",
      label: "Fields",
      type: "object",
      list: true,
      templates: [
        {
          name: "fieldBoolean",
          label: "Boolean Field",
          fields: [
            {
              label: "Label",
              name: "label",
              type: "string",
            },
            {
              label: "Sub Label",
              name: "subLabel",
              type: "string",
            },
            {
              label: "Name",
              name: "name",
              description:
                "This will be the identifier in the form submission, make sure it doesn't have any spaces or special characters.",
              type: "string",
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
              type: "string",
            },
            {
              label: "Sub Label",
              name: "subLabel",
              type: "string",
            },
            {
              label: "Placeholder",
              name: "placeholder",
              type: "string",
            },
            {
              label: "Prefix",
              name: "prefix",
              type: "string",
            },
            {
              label: "Suffix",
              name: "suffix",
              type: "string",
            },
            {
              label: "Name",
              name: "name",
              description:
                "This will be the identifier in the form submission, make sure it doesn't have any spaces or special characters.",
              type: "string",
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
              type: "string",
            },
            {
              label: "Sub Label",
              name: "subLabel",
              type: "string",
            },
            {
              label: "Placeholder",
              name: "placeholder",
              type: "string",
            },
            {
              label: "Name",
              name: "name",
              description:
                "This will be the identifier in the form submission, make sure it doesn't have any spaces or special characters.",
              type: "string",
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
              type: "string",
            },
            {
              label: "Sub Label",
              name: "subLabel",
              type: "string",
            },
            {
              label: "Placeholder",
              name: "placeholder",
              type: "string",
            },
            {
              label: "Name",
              name: "name",
              description:
                "This will be the identifier in the form submission, make sure it doesn't have any spaces or special characters.",
              type: "string",
            },
            {
              label: "Options",
              name: "options",
              type: "object",
              list: true,
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
          name: "fieldRadio",
          label: "Radio Field",
          fields: [
            {
              label: "Label",
              name: "label",
              type: "string",
            },
            {
              label: "Sub Label",
              name: "subLabel",
              type: "string",
            },
            {
              label: "Placeholder",
              name: "placeholder",
              type: "string",
            },
            {
              label: "Name",
              name: "name",
              description:
                "This will be the identifier in the form submission, make sure it doesn't have any spaces or special characters.",
              type: "string",
            },
            {
              label: "Options",
              name: "options",
              list: true,
              type: "object",
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
          name: "fieldGroupText",
          label: "Group Text Field",
          fields: [
            {
              label: "Label",
              name: "label",
              type: "string",
            },
            {
              label: "Sub Label",
              name: "subLabel",
              type: "string",
            },
            {
              name: "fields",
              type: "object",
              list: true,
              label: "Fields",
              templates: [
                {
                  name: "fieldText",
                  label: "Text Field",
                  fields: [
                    {
                      label: "Label",
                      name: "label",
                      type: "string",
                    },
                    {
                      label: "Sub Label",
                      name: "subLabel",
                      type: "string",
                    },
                    {
                      label: "Name",
                      name: "name",
                      description:
                        "This will be the identifier in the form submission, make sure it doesn't have any spaces or special characters.",
                      type: "string",
                    },
                  ],
                },
              ],
            },
            {
              label: "Prefix Class",
              name: "prefix_class",
              type: "string",
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
              type: "string",
            },
            {
              label: "Sub Label",
              name: "subLabel",
              type: "string",
            },
            {
              label: "Placeholder",
              name: "placeholder",
              type: "string",
            },
            {
              label: "Name",
              name: "name",
              description:
                "This will be the identifier in the form submission, make sure it doesn't have any spaces or special characters.",
              type: "string",
            },
          ],
        },
      ],
    },
  ],
};
