import { XmlElementView } from "./XmlElementView";

interface XmlDocViewProps {
    content: string;
}

const XmlDocView: React.FC<XmlDocViewProps> = (prop: XmlDocViewProps) => {
    if (prop.content === "") return <></>;
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(prop.content, "text/xml");
    const root = xmlDoc.documentElement as Element;
    return (
        <div style={{ margin: "40px" }}>
            <XmlElementView node={root as Element} defaultOpen={true} />
        </div>
    );
};

export default XmlDocView;
