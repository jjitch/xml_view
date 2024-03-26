type XmlAttrViewProps = {
    attr: Attr;
    matched: boolean;
};
export const XmlAttrView: React.FC<XmlAttrViewProps> = (
    prop: XmlAttrViewProps
) => {
    return (
        <li>
            <span className={prop.matched ? "matched" : ""}>
                {prop.attr.name}: {prop.attr.value}
            </span>
        </li>
    );
};
