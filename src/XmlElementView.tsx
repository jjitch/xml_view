import { useState } from "react";
import { Collapse } from "react-bootstrap";
import { XmlAttrView } from "./XmlAttrView";
import { XmlTextView } from "./XmlTextView";
import { FiChevronDown } from "react-icons/fi";

type XmlNodeViewProps = {
    node: Element;
    defaultOpen: boolean;
    matchedNodeSet: Set<Node>;
    setDomRefCreator: (
        xmlNode: Node
    ) => (domElement: HTMLElement | null) => void;
};

export const XmlElementView: React.FC<XmlNodeViewProps> = (
    prop: XmlNodeViewProps
) => {
    const [open, setOpen] = useState<boolean>(prop.defaultOpen);
    const attrContent = Array.from(prop.node.attributes).map((attr, index) => {
        const matched = prop.matchedNodeSet.has(attr);
        return (
            <XmlAttrView
                key={`a-${index}`}
                attr={attr}
                matched={matched}
                setDomRef={prop.setDomRefCreator(attr as Node)}
            ></XmlAttrView>
        );
    });

    const childContent = Array.from(prop.node.childNodes).map((node, index) => {
        switch (node.nodeType) {
            case Node.ELEMENT_NODE:
                return (
                    <XmlElementView
                        node={node as Element}
                        defaultOpen={open}
                        matchedNodeSet={prop.matchedNodeSet}
                        key={`e-${index}`}
                        setDomRefCreator={prop.setDomRefCreator}
                    ></XmlElementView>
                );
            case Node.TEXT_NODE:
                const matched = prop.matchedNodeSet.has(node);
                const textNode = node as Text;
                return (
                    <XmlTextView
                        key={`t-${index}`}
                        text={textNode.data}
                        matched={matched}
                        setDomRef={prop.setDomRefCreator(node)}
                    ></XmlTextView>
                );
            default:
                return null;
        }
    });
    const noChild: boolean =
        childContent.length === 0 && attrContent.length === 0;
    return (
        <li ref={prop.setDomRefCreator(prop.node)}>
            <span
                className={`element-rep node-rep ${
                    prop.matchedNodeSet.has(prop.node) ? "matched" : ""
                }`}
            >
                {prop.node.nodeName}
            </span>
            {noChild ? null : (
                <FiChevronDown
                    onClick={() => setOpen(!open)}
                    aria-controls="elm-content"
                    aria-expanded={open}
                    className={`collapse-switch ${open ? "" : "expand-on"}`}
                />
            )}
            <Collapse in={open}>
                <ul id="elm-content">
                    {attrContent}
                    {childContent}
                </ul>
            </Collapse>
        </li>
    );
};
