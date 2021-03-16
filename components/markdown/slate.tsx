import React, { useState, useCallback, useMemo } from "react";
import { Slate, Editable, withReact } from "slate-react";
import { Node, Text, createEditor } from "slate";
import { withHistory } from "slate-history";
import { SlateElement } from "./index";
import type { remarkAstPartial } from "./index";
import type { RenderElement } from "./index";

export type { RenderElement };

const transform = (item: remarkAstPartial): Node => {
  const newObj: Partial<Node> = { ...item };

  switch (item.type) {
    case "mdxBlockElement":
      break;
    case "text":
      // Replace linebreaks with space, slate respects them but non-slate mode does not
      newObj.children = [
        { type: "value", text: item.value.replace(/(\r\n|\n|\r)/gm, " ") },
      ];
      break;
    case "thematicBreak":
    case "mdxSpanElement":
    case "image":
      newObj.children = [{ type: "value", text: "" }];
      break;
    case "heading":
    case "paragraph":
    case "link":
    case "root":
    case "strong":
      // FIXME: https://github.com/microsoft/TypeScript/issues/7294
      // @ts-ignore Each member of the union type has signatures, but none of those signatures are compatible with each other
      newObj.children = item.children.map((childItem) => transform(childItem));
      break;
    default:
      throw new Error(`Unexpected remark type ${item.type}`);
  }
  return newObj as Node;
};

export const MarkdownEditor = ({
  ast,
  renderElement,
  onMdxClick,
}: {
  ast: remarkAstPartial[];
  renderElement: RenderElement;
  onMdxClick: (element: object) => void;
}) => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const transformedAst = ast.map((item) => transform(item));
  // FIXME: this should just serialize/deserialize with a proper plugin like
  // https://github.com/hanford/remark-slate
  const [value, setValue] = useState<Node[]>([
    ...transformedAst,
    // Always end on a paragraph tag in case a void element is the last item
    { type: "paragraph", children: [{ type: "value", text: "" }] },
  ]);
  React.useEffect(() => {
    console.log("update ast state", transformedAst);
    setValue([
      ...transformedAst,
      // Always end on a paragraph tag in case a void element is the last item
      { type: "paragraph", children: [{ type: "value", text: "" }] },
    ]);
  }, [JSON.stringify(transformedAst)]);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const renderElementInner = useCallback((props) => {
    const Element = elements[props.element.type];
    return <Element {...props} />;
  }, []);
  const elements = useMemo(() => {
    return SlateElement(renderElement, (props, ref) => {
      typeof onMdxClick === "function" && onMdxClick(props, ref);
    });
  }, []);
  const RootEl = useCallback(
    elements.root || ((props) => <span {...props} />),
    []
  );
  const { isVoid, isInline } = editor;
  editor.isVoid = (element) => {
    return ["image", "thematicBreak", "mdxSpanElement"].includes(element.type)
      ? true
      : isVoid(element);
  };
  // For some reason these are disappearing on edit
  // editor.isInline = (element) => {
  //   return ["link", "strong"].includes(element.type) ? true : isInline(element);
  // };

  // FIXME: probably don't need span here as a backup, just leave empty

  return (
    <Slate editor={editor} value={value} onChange={(value) => setValue(value)}>
      <RootEl type="root">
        <Editable
          // decorate={decorate}
          renderLeaf={renderLeaf}
          renderElement={renderElementInner}
          placeholder="Write some markdown..."
        />
      </RootEl>
    </Slate>
  );
};

const Leaf = ({ attributes, children, leaf }) => {
  return (
    <span
      {...attributes}
      // className={}
    >
      {children}
    </span>
  );
};

export default MarkdownEditor;
