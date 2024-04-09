type XmlAttrViewProps = {
    attr: Attr;
    matched: boolean;
    focused: boolean;
    setDomRef: (domElement: HTMLElement | null) => void;
};
export const XmlAttrView: React.FC<XmlAttrViewProps> = (
    prop: XmlAttrViewProps
) => {
    return (
        <li ref={prop.setDomRef}>
            <span
                className={`attribute-rep node-rep ${
                    prop.matched && "matched"
                } ${prop.focused && "searched"}`}
            >
                {prop.attr.name}: {prop.attr.value}
            </span>
        </li>
    );
};
