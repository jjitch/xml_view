import { useState } from "react";
import { XmlElementView } from "./XmlElementView";
import { XPathNavigator } from "./XPathNavigator";
import { GetTextRep } from "./NodeTextRep";
import { Navbar } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";

interface XmlDocViewProps {
    content: string;
}

function getXPathNode(
    xpathExpr: XPathExpression,
    contextNode: Node
): Map<number, Node> {
    let nodeMap = new Map<number, Node>();
    if (xpathExpr) {
        const res = xpathExpr.evaluate(
            contextNode,
            XPathResult.ORDERED_NODE_ITERATOR_TYPE,
            null
        );
        if (res) {
            let n = null;
            let i = 0;
            while ((n = res.iterateNext())) {
                nodeMap.set(i, n);
                i += 1;
            }
        }
    }
    return nodeMap;
}

const XmlDocView: React.FC<XmlDocViewProps> = (prop: XmlDocViewProps) => {
    const [xpathExpr, setXPathExpr] = useState<XPathExpression | null>(null);
    const [searchIndex, setSearchIndex] = useState<number>(0);
    const [focusedNode, setFocusNode] = useState<Node | null>(null);
    if (prop.content === "") return <></>;
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(prop.content, "application/xml");
    const root = xmlDoc.documentElement as Element;
    let nodeMap = xpathExpr
        ? getXPathNode(xpathExpr, xmlDoc)
        : new Map<number, Node>();
    let nodeSet: Set<Node> = new Set<Node>(nodeMap.values());

    const onKeyDownHandler = (event: React.KeyboardEvent) => {
        if (event.key === "Enter") {
            event.preventDefault();
            if (nodeSet.size === 0) return;
            const diff = event.shiftKey ? -1 : 1;
            const newIndex = (searchIndex + nodeSet.size + diff) % nodeSet.size;
            setSearchIndex(newIndex);
            setFocusNode(nodeMap.get(newIndex)!);
        }
    };
    return (
        <div>
            <Navbar sticky="top" bg="light" className="justify-content-end">
                <Navbar.Brand>
                    <BsSearch />
                </Navbar.Brand>
                <XPathNavigator
                    contextDocument={xmlDoc}
                    setExpr={setXPathExpr}
                    onKeyDownHandler={onKeyDownHandler}
                />
                <Navbar.Text style={{ width: "10em", marginLeft: "0.5em" }}>
                    {nodeSet.size ? `${searchIndex + 1} / ${nodeSet.size}` : ""}
                </Navbar.Text>
            </Navbar>
            <div
                style={{
                    width: "80%",
                    margin: "0 auto",
                }}
            >
                <XmlElementView
                    node={root}
                    defaultOpen={true}
                    matchedNodeSet={nodeSet}
                />
            </div>
        </div>
    );
};

export default XmlDocView;
