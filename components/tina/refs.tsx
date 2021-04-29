import React from "react";
import { useCMS, Form, Field } from "tinacms";
import { Form as FinalForm } from "react-final-form";
import { Field as FinalField } from "react-final-form";
import { MarkdownEditor, RenderElement } from "../markdown/slate";
import get from "lodash.get";

import ReactDOM from "react-dom";
import { setIn } from "final-form";

type DOMRectType = {
  left: number;
  right: number;
  top: number;
  bottom: number;
  width: number;
  height: number;
};

export const useInlineRefs = <T extends object>(
  formId: string,
  values: T,
  renderOptions: { [K in keyof T]?: RenderElement }
): {
  refs: {
    [K in keyof T]: (element: HTMLElement) => void;
  };
  Portal: () => JSX.Element;
} => {
  const itemEls = React.useRef({});
  const [count, setInnerCount] = React.useState<number>(0);
  const [form, setForm] = React.useState<Form<any, any>>(null);
  const setCount = () => {
    setInnerCount(count + 1);
  };

  const refs = buildRefObject(setCount, values, itemEls);
  // FIXME: this is because we may not be in context, in those scenarios
  // we still provided refs, they're just not used and
  // the Portal component does nothing
  try {
    const cms = useCMS();

    React.useEffect(() => {
      const form = cms.forms.__plugins[formId];
      if (form) {
        setForm(form);
      }
    }, [JSON.stringify(cms.forms.__plugins)]);

    const PortalRefCallback = React.useCallback(
      () => (
        <FieldForm renderOptions={renderOptions} refs={itemEls} form={form} />
      ),
      [itemEls, form]
    );

    return {
      // @ts-ignore Type '{}' is not assignable to type '{ [K in keyof T]: (element: HTMLElement) => void; }'
      refs,
      // FIXME: Ideally this is rendered from TinaProvider, we'd probably only need one which can delegate to many forms
      Portal: PortalRefCallback,
    };
  } catch (e) {
    return {
      // @ts-ignore Type '{}' is not assignable to type '{ [K in keyof T]: (element: HTMLElement) => void; }'
      refs,
      Portal: () => null,
    };
  }
};

// Setup FinalForm instance so we can render Tina fields inline
export const FieldForm = <T extends object>(props: {
  renderOptions: { [K in keyof T]?: RenderElement };
  refs: {
    current: { [key: string]: { name: string; r: HTMLElement } };
  };
  form: Form;
}) => {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!props.form) {
    return null;
  }

  const refValues = Object.values(props.refs.current);

  return (
    // @ts-ignore complains due to no `onSubmit`
    <FinalForm
      form={props.form.finalForm}
      key={props.form.id}
      // No need for this since it's been setup elsewhere,
      // but users might want to opt-in here for additional API capabilities
      // onSubmit={(values) => {
      //   // This is never used
      // }}
    >
      {() =>
        isClient &&
        props.form &&
        refValues.map((ref) => {
          return (
            <InlineFormPortal
              renderOptions={props.renderOptions}
              form={props.form}
              portalRef={ref}
            />
          );
        })
      }
    </FinalForm>
  );
};

const InlineFormPortal = <T extends object>({
  portalRef,
  form,
  renderOptions,
}: {
  portalRef: { name: string; r: HTMLElement };
  form: Form;
  renderOptions: { [K in keyof T]?: RenderElement };
}) => {
  return typeof document !== "undefined"
    ? ReactDOM.createPortal(
        <FieldOverlayPortal
          renderOptions={renderOptions}
          form={form}
          portalRef={portalRef}
        />,
        document.body
      )
    : null;
};

const FieldOverlayPortal = ({ renderOptions, form, portalRef }) => {
  return ReactDOM.createPortal(
    <FieldOverlay
      renderOptions={renderOptions}
      form={form}
      portalRef={portalRef}
    />,
    document.body
  );
};

const FieldOverlay = <T extends object>({
  portalRef,
  form,
  renderOptions,
}: {
  form: Form;
  portalRef: { name: string; r: HTMLElement };
  renderOptions: { [K in keyof T]?: RenderElement };
}) => {
  const r = portalRef.r;
  let field = form.fields.find((field) => field.name === portalRef.name);
  let richValue;
  const originalField = { ...field };
  if (!field) {
    console.log(`Unable to find field for ref ${portalRef.name}`);
    return null;
  }
  if (field?.fields) {
    field = field.fields.find((f) => f.name === "markdownAst");
    field.component = "textarea";
    richValue = form.values[originalField.name];
  }
  if (field.component === "text") {
    return (
      <InlineTextFieldOverlay
        portalRef={portalRef}
        form={form}
        renderOptions={renderOptions}
      />
    );
  }
  if (field.component === "textarea") {
    return (
      <RichTextFieldOverlay
        portalRef={portalRef}
        form={form}
        renderOptions={renderOptions}
      />
    );
  }
  return (
    <GenericFieldOverlay
      portalRef={portalRef}
      form={form}
      renderOptions={renderOptions}
    />
  );
};

const InlineTextFieldOverlay = <T extends object>({
  portalRef,
  form,
  renderOptions,
}: {
  form: Form;
  portalRef: { name: string; r: HTMLElement };
  renderOptions: { [K in keyof T]?: RenderElement };
}) => {
  const r = portalRef.r;
  let field = form.fields.find((field) => field.name === portalRef.name);
  let richValue;
  const originalField = { ...field };
  if (field.fields) {
    field = field.fields.find((f) => f.name === "markdownAst");
    field.component = "textarea";
    richValue = form.values[originalField.name];
  }
  const [isHovered, setIsHovered] = React.useState(false);
  const [isOverlayHovered, setOverlayHovered] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(null);
  const [boundingBox, setBounds] = React.useState<null | DOMRectType>(null);
  const [lastHtml, setLastHtml] = React.useState("");
  const inputRef = React.useRef(null);

  useResizeObserver(r, () => setBounding());
  // Tina Sidebar changes the body when it's in "displace" mode
  // FIXME: this is listening for each ref, no need for that,
  // should be able to set all refs to recalc on body resize
  useBodyResizeObserver(() => setBounding());

  const setBounding = () => {
    if (r && typeof document !== "undefined") {
      const b = r.getBoundingClientRect();
      const bodyBounds = document.body.getBoundingClientRect();
      const meh = bodyBounds.top * -1 + b.top;

      setBounds({
        width: b.width,
        height: b.height,
        bottom: b.bottom,
        top: meh,
        left: b.left,
        right: b.right,
      });
    }
  };

  React.useEffect(() => {
    if (field && field.component === "text" && portalRef.r) {
      // TODO: If we find html we should emit a warning since this is suppose to be plaintext only
      const node = portalRef.r;
      node.contentEditable = "true";
      // We're providing the 'outline' from our FieldOverlay element
      node.style.outline = "none";
      node.addEventListener("input", (event) => {
        const html = node.innerHTML;
        if (html !== lastHtml) {
          if (form) {
            form.finalForm.change(field.name, html);
          }
        }
        setLastHtml(html);
      });
    }
  }, [portalRef.r, isFocused]);

  React.useEffect(() => {
    if (r) {
      const domNode = r;
      // Would probably still want an onclick since hover states
      // don't exist on mobile, a long-press would be an interesting API
      domNode.onmouseenter = () => setIsHovered(true);
      domNode.onmouseleave = () => setIsHovered(false);
      if (field.component === "text") {
        domNode.onclick = () => setIsFocused(true);
      }
    }
  }, [isFocused, isHovered]);

  React.useEffect(() => {
    if (r) {
      setBounding();
    }
  }, []);

  if (!boundingBox) {
    return null;
  }

  const hovered = isHovered || isOverlayHovered;
  const isText = true;

  return (
    <>
      <div
        onMouseOver={() => setOverlayHovered(true)}
        onMouseLeave={() => setOverlayHovered(false)}
        onClick={() => setIsFocused(!isFocused)}
        style={{
          position: "absolute",
          top: boundingBox.top,
          left: boundingBox.left,
          // border: "1px solid red",
          height: boundingBox.height,
          width: boundingBox.width,
          cursor: "pointer",
          pointerEvents: isText
            ? "none"
            : hovered || isFocused
            ? "all"
            : "none",
        }}
      >
        {(hovered || isFocused) && (
          <div className="absolute pointer-events-none inset-0 border-2 border-blue-500 w-full rounded-md z-40" />
        )}
      </div>
    </>
  );
};

const RichTextFieldOverlay = <T extends object>({
  portalRef,
  form,
  renderOptions,
}: {
  form: Form;
  portalRef: { name: string; r: HTMLElement };
  renderOptions: { [K in keyof T]?: RenderElement };
}) => {
  const r = portalRef.r;
  let field = form.fields.find((field) => field.name === portalRef.name);
  let richValue;
  const originalField = { ...field };
  if (field.fields) {
    field = field.fields.find((f) => f.name === "markdownAst");
    field.component = "textarea";
    richValue = form.values[originalField.name];
  }
  const [isFocused, setIsFocused] = React.useState(null);

  React.useEffect(() => {
    if (field && field.component === "textarea" && portalRef.r) {
      r.onclick = () => {
        if (!isFocused) {
          portalRef.r.firstChild.style.display = "none";
          setIsFocused(true);
        }
      };
    }
  }, [portalRef.r, isFocused]);

  return (
    <RichTextPortal
      richValue={richValue}
      isFocused={isFocused}
      renderElement={renderOptions[originalField.name]}
      portalRef={portalRef}
    />
  );
};

const RichTextPortal = ({ richValue, isFocused, renderElement, portalRef }) => {
  const [formConfig, setFormConfig] = React.useState(null);
  const [richAst, setRichAst] = React.useState(richValue);
  const [tinaForm, setTinaForm] = React.useState<Form>(null);
  const cms = useCMS();
  const [bounds, setBounds] = React.useState(null);

  React.useEffect(() => {
    if (formConfig) {
      const initialValues = {};
      formConfig.attributes.forEach((att) => {
        initialValues[att.name] = att.value;
      });
      const f = new Form({
        id: "some-id",
        label: "Some Label",
        initialValues,
        onSubmit: (values) => {
          // TODO: update richValue at the path of this node
          const copy = setIn(richValue, "children[0].children[5].attributes", [
            {
              name: "src",
              type: "mdxAttribute",
              value: values.src,
            },
          ]);
          setRichAst(copy);
          setTinaForm(null);
          setFormConfig(null);
        },
        fields: formConfig.attributes.map((att) => {
          return { component: "text", name: att.name, label: att.name };
        }),
      });
      setTinaForm(f);
    }
  }, [JSON.stringify(formConfig)]);

  return richValue && isFocused
    ? ReactDOM.createPortal(
        <div>
          {tinaForm && (
            <div className="relative">
              <div
                style={{
                  position: "absolute",
                  zIndex: 100,
                  top: 250,
                  left: 0,
                  minWidth: "300px",
                }}
              >
                <div className="mt-2 ring-blue-500 border-2 border-blue-500 block w-full rounded-md p-4 bg-gray-50 shadow-lg">
                  <FinalForm
                    form={tinaForm.finalForm}
                    key={tinaForm.id}
                    // onSubmit={(values) => {
                    //   console.log("ff submit", values);
                    // }}
                  >
                    {(fieldProps) => {
                      const fields = tinaForm.fields;
                      return (
                        <>
                          {fields.map((field) => {
                            return (
                              <FinalField name={field.name} key={field.name}>
                                {(fieldProps) => {
                                  const plugin = cms.plugins
                                    .findOrCreateMap("field")
                                    .find(field.component as string);
                                  if (
                                    typeof field.component !== "string" &&
                                    field.component !== null
                                  ) {
                                    console.log("pl", plugin);
                                    return (
                                      <field.component
                                        {...fieldProps}
                                        form={tinaForm.finalForm}
                                        tinaForm={tinaForm}
                                        field={field}
                                      />
                                    );
                                  }

                                  if (plugin) {
                                    return (
                                      // @ts-ignore
                                      <plugin.Component
                                        {...fieldProps}
                                        form={tinaForm.finalForm}
                                        tinaForm={tinaForm}
                                        field={field}
                                      />
                                    );
                                  }

                                  return <p>Unrecognized field type</p>;
                                }}
                              </FinalField>
                            );
                          })}
                          <button onClick={() => fieldProps.form.submit()}>
                            Submit
                          </button>
                        </>
                      );
                    }}
                  </FinalForm>
                </div>
              </div>
            </div>
          )}
          <MarkdownEditor
            ast={richAst.children}
            renderElement={renderElement}
            onMdxClick={(element, ref) => {
              setFormConfig(element);
              setBounds(ref.current.getBoundingClientRect());
            }}
          />
        </div>,
        portalRef.r
      )
    : null;
};

const GenericFieldOverlay = <T extends object>({
  portalRef,
  form,
  renderOptions,
}: {
  form: Form;
  portalRef: { name: string; r: HTMLElement };
  renderOptions: { [K in keyof T]?: RenderElement };
}) => {
  const r = portalRef.r;
  let field = form.fields.find((field) => field.name === portalRef.name);
  let richValue;
  const originalField = { ...field };
  if (field.fields) {
    field = field.fields.find((f) => f.name === "markdownAst");
    field.component = "textarea";
    richValue = form.values[originalField.name];
  }
  const [isHovered, setIsHovered] = React.useState(false);
  const [isOverlayHovered, setOverlayHovered] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(null);
  const [boundingBox, setBounds] = React.useState<null | DOMRectType>(null);
  const [lastHtml, setLastHtml] = React.useState("");
  const inputRef = React.useRef(null);

  useResizeObserver(r, () => setBounding());
  // Tina Sidebar changes the body when it's in "displace" mode
  // FIXME: this is listening for each ref, no need for that,
  // should be able to set all refs to recalc on body resize
  useBodyResizeObserver(() => setBounding());

  const setBounding = () => {
    if (r && typeof document !== "undefined") {
      const b = r.getBoundingClientRect();
      const bodyBounds = document.body.getBoundingClientRect();
      const meh = bodyBounds.top * -1 + b.top;

      setBounds({
        width: b.width,
        height: b.height,
        bottom: b.bottom,
        top: meh,
        left: b.left,
        right: b.right,
      });
    }
  };

  React.useEffect(() => {
    if (field && field.component === "text" && portalRef.r) {
      // TODO: If we find html we should emit a warning since this is suppose to be plaintext only
      const node = portalRef.r;
      node.contentEditable = "true";
      // We're providing the 'outline' from our FieldOverlay element
      node.style.outline = "none";
      node.addEventListener("input", (event) => {
        const html = node.innerHTML;
        if (html !== lastHtml) {
          if (form) {
            form.finalForm.change(field.name, html);
          }
        }
        setLastHtml(html);
      });
    }
    if (field && field.component === "textarea" && portalRef.r) {
      r.onclick = () => {
        if (!isFocused) {
          portalRef.r.innerHTML = "";
          setIsFocused(true);
        }
      };
    }
  }, [portalRef.r, isFocused]);

  React.useEffect(() => {
    if (r) {
      const domNode = r;
      // Would probably still want an onclick since hover states
      // don't exist on mobile, a long-press would be an interesting API
      domNode.onmouseenter = () => setIsHovered(true);
      domNode.onmouseleave = () => setIsHovered(false);
      if (field.component === "text") {
        domNode.onclick = () => setIsFocused(true);
      }
    }
  }, [isFocused, isHovered]);

  React.useEffect(() => {
    if (r) {
      setBounding();
    }
  }, []);

  if (!boundingBox) {
    return null;
  }

  const hovered = isHovered || isOverlayHovered;
  const isText = false;

  return (
    <>
      <div
        onMouseOver={() => setOverlayHovered(true)}
        onMouseLeave={() => setOverlayHovered(false)}
        onClick={() => setIsFocused(!isFocused)}
        style={{
          position: "absolute",
          top: boundingBox.top,
          left: boundingBox.left,
          // border: "1px solid red",
          height: boundingBox.height,
          width: boundingBox.width,
          cursor: "pointer",
          pointerEvents: isText
            ? "none"
            : hovered || isFocused
            ? "all"
            : "none",
        }}
      >
        {(hovered || isFocused) && (
          <div className="absolute pointer-events-none inset-0 border-2 border-blue-500 w-full rounded-md z-40" />
        )}
      </div>
      {isFocused && (
        <ControlBox
          field={field}
          form={form}
          name={portalRef.name === "preface" ? "preface.raw" : portalRef.name}
          inputRef={inputRef}
          boundingBox={boundingBox}
        />
      )}
    </>
  );
};
const ControlBox = ({
  inputRef,
  boundingBox,
  name,
  form,
  field,
}: {
  inputRef: any;
  form: Form;
  name: string;
  boundingBox: DOMRectType;
  field: Field;
}) => {
  const cms = useCMS();
  const [value, setValue] = React.useState(get(form.values, field.name));

  React.useEffect(() => {
    const fieldCopy = { ...field };
    field.parse = (value, name, field) => {
      setValue(value);
      return fieldCopy.parse(value, name, field);
    };

    form.change(name, value);
    field.parse(value, name, field);
  }, [value]);

  const plugin = cms.plugins
    .findOrCreateMap("field")
    .find(field.component as string);

  return (
    <div
      ref={inputRef}
      style={{
        position: "absolute",
        zIndex: 100,
        top: boundingBox.top + boundingBox.height,
        left: boundingBox.left,
        width: `${boundingBox.right - boundingBox.left}px`,
      }}
    >
      <div className="mt-2 ring-blue-500 border-2 border-blue-500 block w-full rounded-md p-4 bg-gray-50 shadow-lg">
        <FinalField
          name={field.name}
          key={field.name}
          value={value}
          parse={(v) => {
            setValue(v);
          }}
        >
          {(fieldProps) => {
            if (
              typeof field.component !== "string" &&
              field.component !== null
            ) {
              return (
                <field.component
                  {...fieldProps}
                  form={form.finalForm}
                  tinaForm={form}
                  field={field}
                />
              );
            }

            if (plugin) {
              return (
                // @ts-ignore
                <plugin.Component
                  {...fieldProps}
                  form={form.finalForm}
                  tinaForm={form}
                  field={field}
                />
              );
            }

            return <p>Unrecognized field type</p>;
          }}
        </FinalField>
      </div>
    </div>
  );
};

const useResizeObserver = (targetRef, callback) => {
  React.useEffect(() => {
    if (targetRef) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          if (entry.target === targetRef) {
            callback();
          }
        }
      });
      resizeObserver.observe(targetRef);
    }
  }, []);
};

const useBodyResizeObserver = (callback) => {
  const target = document.body;
  React.useEffect(() => {
    if (target) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          if (entry.target === target) {
            callback();
          }
        }
      });
      resizeObserver.observe(target);
    }
  }, []);
};

const buildRefObject = (setCount: () => void, values: object, itemEls) => {
  // FIXME: this should recursively walk down each node and build it up properly
  const refs = {};
  const valueKeys = Object.keys(values);
  valueKeys.forEach((vk) => {
    refs[vk] = (element) => {
      if (element) {
        itemEls.current[vk] = { name: vk, r: element };
      }
    };
  });

  return refs;
};
