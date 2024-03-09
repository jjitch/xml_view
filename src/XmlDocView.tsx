import { useState } from "react";
import { XmlElementView } from "./XmlElementView";
import { XPathNavigator } from "./XPathNavigator";

interface XmlDocViewProps {
    content: string;
}

const XmlDocView: React.FC<XmlDocViewProps> = (prop: XmlDocViewProps) => {
    const [xpathExpr, setXPathExpr] = useState<XPathExpression | null>(null);
    if (prop.content === "") return <></>;
    let nodeSet = new Set<Node>();
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(prop.content, "application/xml");
    const root = xmlDoc.documentElement as Element;
    if (xpathExpr) {
        const res = xpathExpr.evaluate(
            xmlDoc,
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
    return (
        <div style={{ margin: "40px" }}>
            <XPathNavigator contextDocument={xmlDoc} setExpr={setXPathExpr} />
            <p>Found node count: {nodeSet.size}</p>
            <XmlElementView
                node={root}
                defaultOpen={true}
                matchedNodeSet={nodeSet}
            />
        </div>
    );
};

export default XmlDocView;
