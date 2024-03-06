import { useState } from "react";
import { Collapse, Button } from "react-bootstrap";
import { XmlAttrView } from "./XmlAttrView";
import { XmlTextView } from "./XmlTextView";

type XmlNodeViewProps = {
    node: Element;
    defaultOpen: boolean;
};

const ElementViewStyle = {
    margin: "20px",
    padding: "20px",
    border: "3px solid #268811",
};

export const XmlElementView: React.FC<XmlNodeViewProps> = (
    prop: XmlNodeViewProps
) => {
    const [open, setOpen] = useState<boolean>(prop.defaultOpen!);
    const attrContent = Array.from(prop.node.attributes).map((attr) => (
        <XmlAttrView attr={attr}></XmlAttrView>
    ));

    const childContent = Array.from(prop.node.childNodes).map((node) => {
            switch (node.nodeType) {
                case Node.ELEMENT_NODE:
                    return (
                        <XmlElementView
                            node={node as Element}
                            defaultOpen={prop.defaultOpen}
                    ></XmlElementView>
                    );
                case Node.TEXT_NODE:
                const textNode = node as Text;
                return <XmlTextView text={textNode.data}></XmlTextView>;
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
                    className="rounded-pill"
                >
                    {prop.node.localName}
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
