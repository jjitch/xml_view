import { XmlElementView } from "./XmlElementView";

interface XmlDocViewProps {
    content: string;
}

const XmlDocView: React.FC<XmlDocViewProps> = (prop: XmlDocViewProps) => {
    if (prop.content === "") return <></>;
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(prop.content, "text/xml");
    const root = xmlDoc.documentElement as Element;
    return <XmlElementView node={root} defaultOpen={true} />;
};

export default XmlDocView;
