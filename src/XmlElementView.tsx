import { useState } from "react";
import { Collapse, Button } from "react-bootstrap";

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
    const childArray = Array.from(prop.node.childNodes)
        .filter(
            (node, _key, _arr) =>
                node.nodeType === Node.ELEMENT_NODE ||
                node.nodeType === Node.ATTRIBUTE_NODE ||
                node.nodeType === Node.TEXT_NODE
        )
        .map((node, _key, _arr) => {
            switch (node.nodeType) {
                case Node.ELEMENT_NODE:
                    return (
                        <XmlElementView
                            node={node as Element}
                            defaultOpen={prop.defaultOpen}
                        />
                    );
                case Node.ATTRIBUTE_NODE:
                    return <p>attribut</p>;
                case Node.TEXT_NODE:
                    return (
                        <div
                            className="text-wrap font-monospace"
                            style={{ width: "30rem" }}
                        >
                            TEXT {node.textContent}
                        </div>
                    );
                default:
                    return undefined;
            }
        });
    return (
        <>
            <div style={ElementViewStyle}>
                <Button
                    onClick={() => setOpen(!open)}
                    aria-controls="elm-content"
                    aria-expanded={open}
                    className="rounded-pill"
                >
                    {prop.node.localName}
                </Button>
                <Collapse in={open}>
                    <div id="elm-content">{childArray}</div>
                </Collapse>
            </div>
        </>
    );
};
