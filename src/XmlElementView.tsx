import { useState } from "react";
import { Collapse, Button } from "react-bootstrap";
import { XmlAttrView } from "./XmlAttrView";
import { XmlTextView } from "./XmlTextView";

type XmlNodeViewProps = {
    node: Element;
    defaultOpen: boolean;
    matchedNodeSet: Set<Node>;
};

const ElementViewStyle = {
    margin: "2px",
    padding: "0",
    // border: "3px solid #268811",
};

export const XmlElementView: React.FC<XmlNodeViewProps> = (
    prop: XmlNodeViewProps
) => {
    const [open, setOpen] = useState<boolean>(prop.defaultOpen!);
    const attrContent = Array.from(prop.node.attributes).map((attr) => {
        const matched = prop.matchedNodeSet.has(attr);
        return <XmlAttrView attr={attr} matched={matched}></XmlAttrView>;
    });

    const childContent = Array.from(prop.node.childNodes).map((node) => {
        switch (node.nodeType) {
            case Node.ELEMENT_NODE:
                return (
                    <XmlElementView
                        node={node as Element}
                        defaultOpen={prop.defaultOpen}
                        matchedNodeSet={prop.matchedNodeSet}
                    ></XmlElementView>
                );
            case Node.TEXT_NODE:
                const matched = prop.matchedNodeSet.has(node);
                const textNode = node as Text;
                return (
                    <XmlTextView
                        text={textNode.data}
                        matched={matched}
                    ></XmlTextView>
                );
            default:
                return null;
        }
    });
    return (
        <li style={ElementViewStyle}>
            <Button
                onClick={() => setOpen(!open)}
                aria-controls="elm-content"
                aria-expanded={open}
                className={`btn ${
                    prop.matchedNodeSet.has(prop.node) ? "btn-success" : ""
                }`}
            >
                {prop.node.nodeName}
            </Button>
            <Collapse in={open}>
                <ul id="elm-content">
                    {attrContent}
                    {childContent}
                </ul>
            </Collapse>
        </li>
    );
};
