type XmlAttrViewProps = {
    attr: Attr;
    matched: boolean;
};
export const XmlAttrView: React.FC<XmlAttrViewProps> = (
    prop: XmlAttrViewProps
) => {
    return (
        <li>
            <span
                className={`attribute-rep node-rep ${
                    prop.matched ? "matched" : ""
                }`}
            >
                {prop.attr.name}: {prop.attr.value}
            </span>
        </li>
    );
};
