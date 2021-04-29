import { Client, LocalClient } from "tina-graphql-gateway";

export const createClient = () => {
  return process.env.NEXT_PUBLIC_USE_LOCAL_CLIENT === "1"
    ? createLocalClient()
    : createLocalClient();
};

export const createCloudClient = () => {
  const organizationId = process.env.NEXT_PUBLIC_ORGANIZATION_ID;
  const clientId = process.env.NEXT_PUBLIC_TINA_CLIENT_ID;

  const missingEnv: string[] = [];
  if (!organizationId) {
    missingEnv.push("NEXT_PUBLIC_ORGANIZATION_ID");
  }
  if (!clientId) {
    missingEnv.push("NEXT_PUBLIC_TINA_CLIENT_ID");
  }

  if (missingEnv.length) {
    throw new Error(`The following environment variables are required when using the Tina Cloud Client:
     ${missingEnv.join(", ")}`);
  }

  return new Client({
    organizationId: organizationId,
    clientId,
    branch: "main",
    tokenStorage: "LOCAL_STORAGE",
  });
};

/**
 * This is a GraphQL client that only talks to your local filesystem server,
 * as a result it's a great tool for static page building or local development.
 *
 * In this starter app you'll see it being used as both, with the
 * option to "switch on" the non-local client via environment variables.
 */
export const createLocalClient = () => {
  return new LocalClient();
};
