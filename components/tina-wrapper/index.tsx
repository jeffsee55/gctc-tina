import React from "react";
import { TinaCMS } from "tinacms";
// import { SidebarPlaceholder } from "./helper-components";
import { createClient } from "../../util/create-client";

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
