import {
  ClientSideBaseVisitor,
  ClientSideBasePluginConfig,
  LoadedFragment,
  DocumentMode,
  getConfigValue,
} from "@graphql-codegen/visitor-plugin-common";
import _ from "lodash";
import autoBind from "auto-bind";
import { visit, OperationDefinitionNode, GraphQLSchema } from "graphql";
import { Types } from "@graphql-codegen/plugin-helpers";
import { pascalCase } from "pascal-case";

export { visit };

export interface ReactQueryPluginConfig extends ClientSideBasePluginConfig {
  errorType: string;
  exposeQueryKeys: boolean;
}

export interface ReactQueryMethodMap {
  query: {
    hook: string;
    options: string;
  };
  mutation: {
    hook: string;
    options: string;
  };
}

export class ReactQueryVisitor extends ClientSideBaseVisitor<
  {},
  ReactQueryPluginConfig
> {
  private _externalImportPrefix: string;
  public sdkString: string;
  // public fetcher: FetcherRenderer;
  public reactQueryIdentifiersInUse = new Set<string>();

  public queryMethodMap: ReactQueryMethodMap = {
    query: {
      hook: "useQuery",
      options: "UseQueryOptions",
    },
    mutation: {
      hook: "useMutation",
      options: "UseMutationOptions",
    },
  };

  constructor(
    schema: GraphQLSchema,
    fragments: LoadedFragment[],
    protected rawConfig: object,
    documents: Types.DocumentFile[]
  ) {
    super(schema, fragments, rawConfig, {
      documentMode: DocumentMode.string,
      errorType: "MyPlugin",
      exposeQueryKeys: true,
    });
    this._externalImportPrefix = this.config.importOperationTypesFrom
      ? `${this.config.importOperationTypesFrom}.`
      : "";
    this._documents = documents;

    this.sdkString = ``;

    autoBind(this);
  }

  public getSdk(): string {
    const items = _.flatten(
      this._collectedOperations.map((operation) => {
        return [
          `${operation.name.value}: ${operation.name.value}(client)`,
          `${operation.name.value}String: ${operation.name.value}String(client)`,
        ];
      })
    );

    return `export const sdk = (client: Client) => ({
${items.join(",\n")}
});`;
  }

  public getImports(): string[] {
    const baseImports = super.getImports();
    const hasOperations = this._collectedOperations.length > 0;

    if (!hasOperations) {
      return baseImports;
    }

    return [`import type {Client} from "tina-graphql-gateway"`];
  }

  public getTypeHelpers(): string[] {
    return [
      `export type AsyncReturnType<T extends (...args: any) => Promise<any>> = T extends (
      ...args: any
    ) => Promise<infer R>
      ? R
      : any;`,
      `export type FilterByTypename<
      A extends object,
      Property extends string
    > = A extends { __typename: Property } ? A : never;`,
    ];
  }

  protected buildOperation(
    node: OperationDefinitionNode,
    documentVariableName: string,
    operationType: string,
    operationResultType: string,
    operationVariablesTypes: string,
    hasRequiredVariables: boolean
  ): string {
    const operationName: string = this.convertName(node.name?.value ?? "", {
      suffix: this.config.omitOperationSuffix ? "" : pascalCase(operationType),
      useTypesPrefix: false,
    });

    operationResultType = this._externalImportPrefix + operationResultType;
    operationVariablesTypes =
      this._externalImportPrefix + operationVariablesTypes;

    if (operationType === "Query") {
      // console.log({
      //   documentVariableName,
      //   operationName,
      //   operationResultType,
      //   operationVariablesTypes,
      //   hasRequiredVariables,
      // });
      const operation = `const ${
        node.name.value
      } = (client: Client) =>  async (${
        hasRequiredVariables
          ? `{variables }: {variables: ${operationVariablesTypes}}`
          : `{variables }: {variables?: ${operationVariablesTypes}}`
      }) => {
        return client.request<${operationResultType}>(
          \`$\{${documentVariableName}}\`,
          { variables: variables }
        );
      }
      const ${node.name.value}String = (client: Client) =>  (${
        hasRequiredVariables
          ? `{variables }: {variables: ${operationVariablesTypes}}`
          : `{variables }: {variables?: ${operationVariablesTypes}}`
      }) => {
        return {query: gql => gql(${documentVariableName}), variables}
      }

    `;

      return operation;
    } else if (operationType === "Mutation") {
      console.warn(
        `Plugin "typescript-react-query" does not support GraphQL Mutations at the moment! Ignoring "${node.name.value}"...`
      );
    } else if (operationType === "Subscription") {
      // eslint-disable-next-line no-console
      console.warn(
        `Plugin "typescript-react-query" does not support GraphQL Subscriptions at the moment! Ignoring "${node.name.value}"...`
      );
    }

    return null;
  }
}
