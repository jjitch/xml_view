import { useState } from "react";
import { XmlElementView } from "./XmlElementView";
import { XPathNavigator } from "./XPathNavigator";
import { GetTextRep } from "./NodeTextRep";
import { Col, Row } from "react-bootstrap";

interface XmlDocViewProps {
    content: string;
}

function getXPathNode(
    xpathExpr: XPathExpression,
    contextNode: Node
): Set<Node> {
    let nodeSet = new Set<Node>();
    if (xpathExpr) {
        const res = xpathExpr.evaluate(
            contextNode,
            XPathResult.ORDERED_NODE_ITERATOR_TYPE,
            null
        );
        if (res) {
            let n = null;
            while ((n = res.iterateNext())) {
                nodeSet.add(n);
            }
        }
    }
    return nodeSet;
}

const XmlDocView: React.FC<XmlDocViewProps> = (prop: XmlDocViewProps) => {
    const [xpathExpr, setXPathExpr] = useState<XPathExpression | null>(null);
    const [refExpr, setRefExpr] = useState<XPathExpression | null>(null);
    const [receiveExpr, setReceiveExpr] = useState<XPathExpression | null>(
        null
    );
    if (prop.content === "") return <></>;
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(prop.content, "application/xml");
    const root = xmlDoc.documentElement as Element;
    let nodeSet = xpathExpr ? getXPathNode(xpathExpr, xmlDoc) : new Set<Node>();
    let nodeRefSet = refExpr ? getXPathNode(refExpr, xmlDoc) : new Set<Node>();
    let receiveSet = receiveExpr
        ? getXPathNode(receiveExpr, xmlDoc)
        : new Set<Node>();
    let text2node: Map<string, Node> = new Map<string, Node>();
    for (const node of receiveSet) {
        const textRep = GetTextRep(node);
        if (textRep) text2node.set(textRep, node);
    }
    let node2reference = new Map<Node, Set<Node>>();
    for (const node of nodeRefSet) {
        const textRep = GetTextRep(node);
        if (!textRep) continue;
        const refered_node = text2node.get(textRep);
        if (!refered_node) continue;
        if (node2reference.has(node)) {
            node2reference.get(node)?.add(refered_node);
        } else {
            node2reference.set(node, new Set<Node>([refered_node]));
        }
    }
    return (
        <div style={{ margin: "40px" }}>
            <div>
                <span>This form accepts serach query.</span>
                <XPathNavigator
                    contextDocument={xmlDoc}
                    setExpr={setXPathExpr}
                />
                <p>Found node count: {nodeSet.size}</p>
            </div>
            <Row>
                <Col>
                    <span>This form accepts ref query.</span>
                    <XPathNavigator
                        contextDocument={xmlDoc}
                        setExpr={setRefExpr}
                    />
                    <p>Found node count: {nodeRefSet.size}</p>
                </Col>
                <Col>
                    <span>This form accepts referred query.</span>
                    <XPathNavigator
                        contextDocument={xmlDoc}
                        setExpr={setReceiveExpr}
                    />
                    <p>Found node count: {receiveSet.size}</p>
                </Col>
            </Row>
            <p>Ref count {node2reference.size}</p>
            <XmlElementView
                node={root}
                defaultOpen={true}
                matchedNodeSet={nodeSet}
            />
        </div>
    );
};

export default XmlDocView;
