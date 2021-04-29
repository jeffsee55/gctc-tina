import React from "react";

type Markdown2Props = {
  ast: remarkAstPartial;
  renderElement: RenderElement;
};

export const Markdown2 = React.forwardRef((props: Markdown2Props, ref) => {
  const Element = BaseElement(props.renderElement)[props.ast.type];

  /**
   * HEADS UP - this is important
   *
   * For inline-editing, we're hijacking the DOM node by replacing the root
   * markdown element with our slate editor instance. This looks and feels identical
   * but this portion of the React tree knowns nothing about what we did, so a state change that would typically
   * cause this component to rerender effectively re-mounts the component into
   * it's node, the result is 2 nodes that look identical, one being this component and
   * the other being our slate editor. For now memoizing is the easiest solution, it means that there won't be
   * an attempt from react to rerender anything in here. There's probably more work to be done to exit edit-mode.
   *
   * From another perspective, this should definitely be memoized anyway, it's a potentially
   * very deep tree that isn't really meant to change from the initial render. Ideally we
   * can come up with a nice balance that allows non-edit mode stuff to work as the user
   * intends while keep edit-mode renders bug-free.
   */
  return React.useMemo(() => {
    if (props.ast.type === "root") {
      return (
        <span ref={ref}>
          <Element {...props.ast} />
        </span>
      );
    }
    return <Element {...props.ast} />;
  }, []);
});
export type FilterNodeByType<
  A extends remarkAstPartial,
  NodeType extends string
> = A extends any ? (A["type"] extends NodeType ? A : never) : never;

type BaseTypeFunc<T extends remarkAstPartial["type"]> = {
  [K in T]: (props: FilterNodeByType<remarkAstPartial, K>) => JSX.Element;
};
export type SlateTypeFunc<T extends remarkAstPartial["type"]> = {
  [K in T]?: (props: FilterNodeByType<remarkAstPartial, K>) => JSX.Element;
};

export type RenderElement = SlateTypeFunc<
  Pick<remarkAstPartial, "type">["type"]
> & { [key: string]: (props: unknown) => JSX.Element };

const BaseElement: (
  renderElement
) => BaseTypeFunc<Pick<remarkAstPartial, "type">["type"]> = (
  renderElement
) => ({
  root: (props) => {
    const El = renderElement[props.type];
    if (El) {
      return (
        <El>
          {props.children.map((ast) => (
            <Markdown2 ast={ast} renderElement={renderElement} />
          ))}
        </El>
      );
    }
    return (
      <div {...props}>
        {props.children.map((ast) => (
          <Markdown2 ast={ast} renderElement={renderElement} />
        ))}
      </div>
    );
  },
  heading: (props) => {
    const El = renderElement[props.type];
    if (El) {
      return (
        <El {...props}>
          {props.children.map((ast) => (
            <Markdown2 ast={ast} renderElement={renderElement} />
          ))}
        </El>
      );
    }
    return (
      <h1>
        {props.children.map((ast) => (
          <Markdown2 ast={ast} renderElement={renderElement} />
        ))}
      </h1>
    );
  },
  paragraph: (props) => {
    const El = renderElement[props.type];
    if (El) {
      return (
        <El {...props}>
          {props.children.map((ast) => (
            <Markdown2 ast={ast} renderElement={renderElement} />
          ))}
        </El>
      );
    }
    return (
      <p>
        {props.children.map((ast) => (
          <Markdown2 ast={ast} renderElement={renderElement} />
        ))}
      </p>
    );
  },
  image: (props) => <img alt={props.alt} src={props.url} />,
  link: (props) => {
    const El = renderElement[props.type];
    const { children, ...rest } = props;
    if (El) {
      return (
        <El {...rest}>
          {children.map((ast) => (
            <Markdown2 ast={ast} renderElement={renderElement} />
          ))}
        </El>
      );
    }
    return (
      <a href={props.url} title={props.title}>
        {props.children.map((ast) => (
          <Markdown2 ast={ast} renderElement={renderElement} />
        ))}
      </a>
    );
  },
  emphasis: (props) => {
    const El = renderElement[props.type];
    if (El) {
      return (
        <El>
          {props.children.map((ast) => (
            <Markdown2 ast={ast} renderElement={renderElement} />
          ))}
        </El>
      );
    }
    return (
      <strong>
        {props.children.map((ast) => (
          <Markdown2 ast={ast} renderElement={renderElement} />
        ))}
      </strong>
    );
  },
  strong: (props) => {
    const El = renderElement[props.type];
    if (El) {
      return (
        <El>
          {props.children.map((ast) => (
            <Markdown2 ast={ast} renderElement={renderElement} />
          ))}
        </El>
      );
    }
    return (
      <strong>
        {props.children.map((ast) => (
          <Markdown2 ast={ast} renderElement={renderElement} />
        ))}
      </strong>
    );
  },
  thematicBreak: (props) => <hr />,
  mdxSpanElement: (props) => {
    const El = renderElement[props.name];
    const elementProps = {};
    props.attributes.map((att) => {
      elementProps[att.name] = att.value;
    });
    if (El) {
      return <El {...elementProps} />;
    }

    return <span />;
  },
  mdxBlockElement: (props) => {
    console.log("mdx block", props);
    return <div />;
  },
  text: (props) => <>{props.value}</>,
});

const getElementAndProps = (renderElement, props) => {
  const { element } = props;
  // We don't pass the ast children, but the non-edit component does
  // instead we pass in Slate's children prop, which as long as the
  // user doesn't try to do anything special with their children this
  // should be good to go.
  const { children, ...elementProps } = element;
  const El = renderElement[element.type];
  return { El, elementProps };
};

export const SlateElement: (
  any
) => SlateTypeFunc<Pick<remarkAstPartial, "type">["type"]> = (
  renderElement: RenderElement,
  onClick: () => void
) => ({
  root: (props) => {
    const El = renderElement[props.type];
    if (El) {
      return <El {...props} />;
    } else {
      return <div {...props} />;
    }
  },
  heading: (props) => {
    const { El, elementProps } = getElementAndProps(renderElement, props);
    if (El) {
      return <El {...elementProps}>{props.children}</El>;
    } else {
      return <h2 {...elementProps}>{props.children}</h2>;
    }
  },
  paragraph: (props) => {
    const { El, elementProps } = getElementAndProps(renderElement, props);
    if (El) {
      return <El {...elementProps}>{props.children}</El>;
    } else {
      return <p {...elementProps}>{props.children}</p>;
    }
  },
  // FIXME: not sure about this one. It should be a void node
  image: (props) => {
    const { El, elementProps } = getElementAndProps(renderElement, props);
    if (El) {
      return <El {...elementProps} />;
    } else {
      return <img alt={elementProps.alt} src={elementProps.url} />;
    }
  },
  link: (props) => {
    const { El, elementProps } = getElementAndProps(renderElement, props);
    if (El) {
      return (
        <span {...props.attributes}>
          <El {...elementProps}>{props.children}</El>
        </span>
      );
    } else {
      return (
        <a
          {...props.attributes}
          href={elementProps.url}
          title={elementProps.title}
        >
          {props.children}
        </a>
      );
    }
  },
  strong: (props) => {
    const { El, elementProps } = getElementAndProps(renderElement, props);
    if (El) {
      return (
        <span {...props.attributes}>
          <El {...elementProps}>{props.children}</El>
        </span>
      );
    } else {
      return <strong {...props.attributes}>{props.children}</strong>;
    }
  },
  thematicBreak: (props) => {
    const { El, elementProps } = getElementAndProps(renderElement, props);
    if (El) {
      return <El {...elementProps} />;
    } else {
      return <hr />;
    }
  },
  mdxSpanElement: (props) => {
    const El = renderElement[props.element.name];
    const realElementProps = {};
    console.log("mdxspan", props);
    props.element.attributes.map((att) => {
      realElementProps[att.name] = att.value;
    });
    const mdxRef = React.useRef(null);
    console.log("mdx render", realElementProps);
    if (El) {
      return (
        // Need contentEditable=false or Firefox has issues with certain input types.
        <div
          ref={mdxRef}
          onClick={() => {
            onClick(props.element, mdxRef);
          }}
          style={{ cursor: "pointer" }}
        >
          <div
            style={{ pointerEvents: "none" }}
            {...props.attributes}
            contentEditable={false}
          >
            <El {...realElementProps} />
            {props.children}
          </div>
        </div>
      );
    } else {
      return <span>{`<${props.element.name} />`}</span>;
    }
  },
  mdxBlockElement: (props) => {
    return <div />;
  },
  text: (props) => {
    return (
      <span {...props.attributes}>
        {props.value}
        {props.children}
      </span>
    );
  },
});

export const Markdown = React.forwardRef(
  (
    {
      ast,
      supports = "inline",
      classNames = {
        root: "font-display",
        h2: "mt-2 text-3xl leading-9 font-extrabold text-gray-900",
        strong:
          "text-base leading-6 font-semibold text-steel-medium uppercase tracking-wide",
        p: "mt-4 text-lg leading-7 text-gray-500",
      },
      jsxMap,
    }: {
      ast: remarkAstPartial;
      jsxMap?: { [key: string]: (props: any) => JSX.Element };
      classNames?: {
        strong?: string;
        text?: string;
        h1?: string;
        h2?: string;
        h3?: string;
        link?: string;
        image?: string;
        hr?: string;
        /**
         * Apply to block-level elements, excluding mdx blocks
         */
        blocks?: string;
        p?: string;
        root?: string;
        paragraph?: string;
      };
      supports?: "inline" | "full";
    },
    ref
  ) => {
    let props;

    if (!ast) {
      return null;
    }
    const myRef = React.useRef(null);

    const blockClasses = classNames["blocks"];

    switch (ast.type) {
      case "root":
        props = { className: classNames[ast.type] || "" };
        return (
          <div
            ref={(realRef) => {
              typeof ref === "function" && ref(realRef);
              myRef.current = realRef;
            }}
            {...props}
          >
            {ast.children.map((child, i) => (
              <Markdown
                key={i}
                classNames={classNames}
                ast={child}
                jsxMap={jsxMap}
              />
            ))}
          </div>
        );
      case "text":
        props = { className: classNames[ast.type] || "" };
        return <span>{ast.value}</span>;
      case "heading":
        const hDepth = { 1: "h1" as const, 2: "h2" as const, 3: "h3" as const };
        const element = hDepth[ast.depth];
        props = { className: classNames[element] || "" };
        switch (ast.depth) {
          case 1:
            return (
              <div className={blockClasses}>
                <h1 {...props}>
                  {ast.children.map((child, i) => (
                    <Markdown
                      key={i}
                      classNames={classNames}
                      ast={child}
                      jsxMap={jsxMap}
                    />
                  ))}
                </h1>
              </div>
            );
          case 2:
            return (
              <div className={blockClasses}>
                <h2 {...props}>
                  {ast.children.map((child, i) => (
                    <Markdown
                      key={i}
                      classNames={classNames}
                      ast={child}
                      jsxMap={jsxMap}
                    />
                  ))}
                </h2>
              </div>
            );
          case 3:
            return (
              <div className={blockClasses}>
                <h3 {...props}>
                  {ast.children.map((child, i) => (
                    <Markdown
                      key={i}
                      classNames={classNames}
                      ast={child}
                      jsxMap={jsxMap}
                    />
                  ))}
                </h3>
              </div>
            );
        }
      case "paragraph":
        props = { className: `${classNames["p"] || ""} ${blockClasses}` };
        return (
          <p {...props}>
            {ast.children.map((child, i) => (
              <Markdown
                key={i}
                classNames={classNames}
                ast={child}
                jsxMap={jsxMap}
              />
            ))}
          </p>
        );
      case "listItem":
        props = { className: `${classNames["p"] || ""} ${blockClasses}` };
        return (
          <li {...props}>
            {ast.children.map((child, i) => (
              <Markdown
                key={i}
                classNames={classNames}
                ast={child}
                jsxMap={jsxMap}
              />
            ))}
          </li>
        );
      case "list":
        props = { className: `${classNames["p"] || ""} ${blockClasses}` };
        return (
          <ul {...props}>
            {ast.children.map((child, i) => (
              <Markdown
                key={i}
                classNames={classNames}
                ast={child}
                jsxMap={jsxMap}
              />
            ))}
          </ul>
        );
      case "thematicBreak":
        props = { className: `${classNames["hr"] || ""} ${blockClasses}` };
        return <hr {...props} />;
      case "image":
        props = {
          className: classNames[ast.type] || "",
          src: ast.url,
          title: ast.title,
          alt: ast.alt,
        };
        return <img {...props} />;
      case "link":
        props = {
          className: classNames[ast.type] || "",
          href: ast.url,
          title: ast.title,
        };
        return (
          <a {...props}>
            {ast.children.map((item, i) => (
              <Markdown
                key={i}
                classNames={classNames}
                ast={item}
                jsxMap={jsxMap}
              />
            ))}
          </a>
        );
      case "emphasis":
        props = { className: classNames[ast.type] || "" };
        return (
          <em {...props}>
            {ast.children.map((item, i) => (
              <Markdown
                key={i}
                classNames={classNames}
                ast={item}
                jsxMap={jsxMap}
              />
            ))}
          </em>
        );
      case "strong":
        props = { className: classNames[ast.type] || "" };
        return (
          <strong {...props}>
            {ast.children.map((item, i) => (
              <Markdown
                key={i}
                classNames={classNames}
                ast={item}
                jsxMap={jsxMap}
              />
            ))}
          </strong>
        );
      case "mdxSpanElement":
      case "mdxBlockElement":
        // @ts-ignore ast.type is not possible from our types but
        // when new ones come in we want to throw it
        const ProvidedComponent = jsxMap[ast.name];
        if (ProvidedComponent) {
          const props: { [key: string]: unknown } = {};
          ast.attributes.map((item) => {
            props[item.name] = item.value;
          });
          const children = ast.children.map((child, i) => {
            return (
              <Markdown
                key={i}
                classNames={classNames}
                ast={child}
                jsxMap={jsxMap}
              />
            );
          });
          return <ProvidedComponent {...props}>{children}</ProvidedComponent>;
        } else {
          console.warn(
            `No component provided to render jsx element ${ast.name}`
          );
        }
      default:
        console.log(`Expect to find renderer for type ${ast.type}`);
        // console.log(JSON.stringify(ast, null, 2));
        return <span>{ast.type}</span>;
    }
  }
);

type strongAst = {
  type: "strong";
  children: textAst[];
};
type emphasisAst = {
  type: "emphasis";
  children: textAst[];
};
type ulAst = {
  type: "list";
  children: textAst[];
};
type liAst = {
  type: "list";
  children: textAst[];
};
type textAst = {
  type: "text";
  value: string;
};
type paragraphAst = {
  type: "paragraph";
  children: textAst[];
};
type headingAst = {
  type: "heading";
  depth: 1 | 2 | 3;
  children: textAst[];
};
type hrAst = {
  type: "thematicBreak";
};
type imageAst = {
  type: "image";
  url: string;
  title?: string;
  alt?: string;
  children: remarkAstPartial[];
};
type linkAst = {
  type: "link";
  url: string;
  title?: string;
  children: remarkAstPartial[];
};
type rootAst = {
  type: "root";
  children: remarkAstPartial[];
};

type mdxAttribute = {
  type: "mdxAttribute";
  name: string;
  value: string;
};

type mdxSpanAst = {
  type: "mdxSpanElement";
  name: string;
  attributes: mdxAttribute[];
  children: mdxElement[];
};

type mdxElement = mdxBlockAst | mdxSpanAst;

type mdxBlockAst = {
  type: "mdxBlockElement";
  name: string;
  attributes: mdxAttribute[];
  children: mdxElement[];
};

export type remarkAstPartial =
  | rootAst
  | headingAst
  | hrAst
  | imageAst
  | linkAst
  | paragraphAst
  | textAst
  | strongAst
  | emphasisAst
  | liAst
  | ulAst
  | mdxBlockAst
  | mdxSpanAst;
