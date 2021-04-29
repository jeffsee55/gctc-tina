import { codegen } from "@graphql-codegen/core";
import {
  parse,
  FragmentDefinitionNode,
  printSchema,
  concatAST,
  GraphQLSchema,
  Kind,
} from "graphql";
import { plugin as typescriptPlugin } from "@graphql-codegen/typescript";
import { plugin as typescriptPluginReactQuery } from "@graphql-codegen/typescript-react-query";
import { LoadedFragment } from "@graphql-codegen/visitor-plugin-common";
import { plugin as typescriptOperationsPlugin } from "@graphql-codegen/typescript-operations";
import { ReactQueryVisitor, visit } from "./visitor";

import * as fs from "fs";
import * as path from "path";

const generateTypes = async () => {
  const schema = await fs.readFileSync("./.tina/__generated__/schema.gql");
  const items = await fs.readdirSync("./.tina/gql");

  let qs = [];

  await Promise.all(
    items.map(async (item) => {
      const p = path.join(".tina", "gql", item);
      qs.push(await fs.readFileSync(p).toString());
      return true;
    })
  );
  const string = qs.join("\n");
  // console.log(string);
  // return;

  try {
    const res = await codegen({
      filename: path.resolve(process.cwd(), "/.forestry/autoschema.gql"),
      // @ts-ignore
      schema: parse(schema.toString()),
      documents: [
        {
          document: parse(string),
        },
      ],
      config: {},
      plugins: [
        {
          typescript: {
            noExport: true,
          },
        },
        {
          typescriptOperations: {
            // flattenGeneratedTypes: true,
            skipTypename: true,
            exportFragmentSpreadSubTypes: true,
          },
        },
        // { typescriptPluginReactQuery: {} },
        { myPlugin: {} },
      ],
      pluginMap: {
        typescript: {
          plugin: typescriptPlugin,
        },
        typescriptOperations: {
          plugin: typescriptOperationsPlugin,
        },
        // typescriptPluginReactQuery: {
        //   plugin: (...args) => {
        //     return typescriptPluginReactQuery(...args);
        //   },
        // },
        myPlugin: {
          plugin: async (schema, documents, config) => {
            const allAst = concatAST(documents.map((v) => v.document));

            const allFragments: LoadedFragment[] = [
              ...(allAst.definitions.filter(
                (d) => d.kind === Kind.FRAGMENT_DEFINITION
              ) as FragmentDefinitionNode[]).map((fragmentDef) => ({
                node: fragmentDef,
                name: fragmentDef.name.value,
                onType: fragmentDef.typeCondition.name.value,
                isExternal: false,
              })),
              ...(config.externalFragments || []),
            ];

            const visitor = new ReactQueryVisitor(
              schema,
              allFragments,
              config,
              documents
            );

            const visitorResult = visit(documents[0].document, {
              leave: visitor,
            });
            return {
              prepend: visitor.getImports(),
              content: [
                visitor.fragments,
                ...visitorResult.definitions.filter(
                  (t) => typeof t === "string"
                ),
                ...visitor.getTypeHelpers(),
                visitor.getSdk(),
              ].join("\n"),
            };
          },
        },
      },
    });
    // console.log(res);
    await fs.writeFileSync("./.tina/sdk.ts", res);
    return res;
  } catch (e) {
    console.error(e);
  }
};

generateTypes();
