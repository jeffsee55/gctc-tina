import React from "react";
import unified from "unified";
import parse from "remark-parse";

export type FilterNodeByType<
  A extends remarkAstPartial,
  NodeType extends string
> = A extends any ? (A["type"] extends NodeType ? A : never) : never;

export const Markdown = React.forwardRef(
  (
    {
      ast: maybeAst,
      content,
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
      ast?: remarkAstPartial;
      content?: string;
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

    const ast = content
      ? unified()
          .use(parse)
          .parse(content)
      : maybeAst;

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
