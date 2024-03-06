type XmlAttrViewProps = {
    attr: Attr;
};
export const XmlAttrView: React.FC<XmlAttrViewProps> = (
    prop: XmlAttrViewProps
) => {
    return (
        <li>
            {prop.attr.name}: {prop.attr.value}
        </li>
    );
};
