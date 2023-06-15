import React from 'react'
import type { TinaTemplate } from "@tinacms/cli";
import { Client, FieldMeta, LocalClient, TinaCMS, useCMS, wrapFieldsWithMeta } from 'tinacms';

export const CuratedCollection: TinaTemplate = {
  name: "curatedCollection",
  label: "Curated Collection",
  fields: [
    {
      label: "Description",
      name: "curatedDescription",
      type: "rich-text",
    },
    {
      label: "Collection Curations",
      name: "posts_collection",
      type: "object",
      list: true,
      fields: [{
        label: "Reference",
        name: "reference",
        type: 'reference',
        collections: ["posts"],
      }]
    },
  ],
};

const CustomSelect = (args) => {
  const [options,setOptions] = React.useState([])
  const cms = useCMS()
  React.useEffect(() => {
    const run = async () => {
    const client = cms.api.tina as Client
    const res = await client.request(`
    query authorsConnection {
      authorsConnection {
        totalCount
        edges {
          cursor
          node {
            __typename
            ... on AuthorsAthlete {
              name
            }
          }
        }
      }
    }
    `, {variables: {}})
    const opts = []
    res.authorsConnection?.edges?.map(edge => opts.push(edge.node.name))
    setOptions(opts)
    }
    run()
  },[])
  return (<div><select onChange={args.input.onChange}>{options.map(option => {
    return <option>{option}</option>
  })}
  </select>
  </div>)
}

export const Post: TinaTemplate = {
  name: "post",
  label: "Post",
  fields: [
    {
      name: "title",
      label: "Title",
      type: "string",
      description: "The name of your post, keep it short!",
    },
    {
      name: "tags",
      label: "Tags",
      list: true,
      type: "string",
    },
    {
      name: "image",
      label: "Image URL",
      type: "string",
      description: "The external image URL",
    },
    {
      name: "image_small",
      label: "Small Image URL",
      type: "string",
      description: "The external image URL for smaller rendering",
    },
    {
      name: "accolades",
      label: "Accolades",
      description: "Key accomplishments which make this person stand out",
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
    },
    {
      name: "author",
      type: "reference",
      collections: ["authors"],
      label: "Author",
    },
    {
      name: "authorName",
      type: "string",
      label: "Author",
      ui: {
        component: CustomSelect
      }
    },
    {
      name: "preface",
      label: "Preface",
      type: "string",
    },
    {
      name: "_body",
      label: "Body",
      isBody: true,
      type: "rich-text",
    },
  ],
};

export const Curated: TinaTemplate = {
  name: "curated",
  label: "Curated",
  fields: [
    {
      type: "string",
      name: "title",
      label: "Title",
    },
    {
      type: "object",
      list: true,
      name: "curations",
      label: "Curations",
      templates: [
        {
          name: "curatedHero",
          label: "Curated Hero",
          fields: [
            {
              label: "Description",
              name: "curatedDescription",
              type: "rich-text",
            },
            {
              label: "Hero Post",
              name: "hero_post",
              type: "reference",
              collections: ["posts"],
            },
          ],
        },
        CuratedCollection,
      ],
    },
  ],
};
