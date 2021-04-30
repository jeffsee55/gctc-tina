import React from "react";
import { TinaCMS, Form, useCMS, GlobalFormPlugin } from "tinacms";
import { TinaCloudAuthWall } from "tina-graphql-gateway";
// import { SidebarPlaceholder } from "./helper-components";
import { createClient } from "../../util/create-client";
import { useGraphqlForms } from "tina-graphql-gateway";

const TinaWrapper = (props) => {
  const cms = React.useMemo(() => {
    return new TinaCMS({
      apis: {
        tina: createClient(),
      },
      sidebar: true,
      enabled: true,
    });
  }, []);

  return (
    <TinaCloudAuthWall cms={cms}>
      <Inner {...props} />
    </TinaCloudAuthWall>
  );
};

const Inner = (props) => {
  const cms = useCMS();
  const [payload, isLoading] = useGraphqlForms({
    query: (gql) => gql(props.query),
    variables: props.variables || {},
    formify: ({ formConfig, createForm, skip }) => {
      if (formConfig.id === "getNavDocument") {
        const form = new Form(formConfig);
        // The site nav will be a global plugin
        cms.plugins.add(new GlobalFormPlugin(form));
        return form;
      }

      return createForm(formConfig);
    },
  });
  return (
    <>
      {isLoading ? (
        <div
          style={{
            opacity: 0.2,
            pointerEvents: "none",
          }}
        >
          {props.children(props)}
        </div>
      ) : (
        props.children({ ...props, data: payload })
      )}
    </>
  );
};

export default TinaWrapper;
