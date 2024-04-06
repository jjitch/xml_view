import { useRef, useState } from "react";
import { XmlElementView } from "./XmlElementView";
import { XPathNavigator } from "./XPathNavigator";
import { Navbar } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";

interface XmlDocViewProps {
    content: string;
}

function getXPathNode(
    xpathExpr: XPathExpression | null,
    contextNode: Node
): Array<Node> {
    let nodeArray = new Array<Node>();
    if (xpathExpr) {
        const res = xpathExpr.evaluate(
            contextNode,
            XPathResult.ORDERED_NODE_ITERATOR_TYPE,
            null
        );
        if (res) {
            let n = null;
            while ((n = res.iterateNext())) {
                nodeArray.push(n);
            }
        }
    }
    return nodeArray;
}

const XmlDocView: React.FC<XmlDocViewProps> = (prop: XmlDocViewProps) => {
    const [xpathExpr, setXPathExpr] = useState<XPathExpression | null>(null);
    const [searchIndex, setSearchIndex] = useState<number>(0);
    const treeDomRef = useRef<Map<Node, HTMLElement>>(new Map());
    const setDomRefCreator: (
        xmlNode: Node
    ) => (domNode: HTMLElement | null) => void = (xmlNode: Node) => {
        return (domNode: HTMLElement | null) => {
            if (domNode) {
                treeDomRef.current.set(xmlNode, domNode);
            } else {
                treeDomRef.current.delete(xmlNode);
            }
        };
    };

    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(prop.content, "application/xml");
    const root = xmlDoc.documentElement as Element;
    let nodeArray = getXPathNode(xpathExpr, xmlDoc);
    let nodeSet: Set<Node> = new Set<Node>(nodeArray);

    const onKeyDownHandler = (event: React.KeyboardEvent) => {
        if (event.key === "Enter") {
            event.preventDefault();
            if (nodeSet.size === 0) return;
            const diff = event.shiftKey ? -1 : 1;
            const newIndex = (searchIndex + nodeSet.size + diff) % nodeSet.size;
            setSearchIndex(newIndex);
            treeDomRef.current.get(nodeArray.at(newIndex)!)?.scrollIntoView();
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
                    setDomRefCreator={setDomRefCreator}
                />
            </div>
        </div>
    );
};

export default XmlDocView;
