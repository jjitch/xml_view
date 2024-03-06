import { XmlElementView } from "./XmlElementView";

interface XmlDocViewProps {
    content: string;
    xpathExpr: XPathExpression | null;
}

const XmlDocView: React.FC<XmlDocViewProps> = (prop: XmlDocViewProps) => {
    if (prop.content === "") return <></>;
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(prop.content, "text/xml");
    const root = xmlDoc.documentElement as Element;
    const res = prop.xpathExpr?.evaluate(
        root as Node,
        XPathResult.UNORDERED_NODE_ITERATOR_TYPE,
        null
    );
    let nodeSet = new Set<Node>();
    if (res) {
        let n = null;
        while ((n = res.iterateNext())) {
            nodeSet.add(n);
        }
    }

    return (
        <div style={{ margin: "40px" }}>
            <p>{nodeSet.size}</p>
            <XmlElementView
                node={root}
                defaultOpen={true}
                matchedNodeSet={nodeSet}
            />
        </div>
    );
};

export default XmlDocView;
