type XmlTextViewProp = {
    text: string;
    matched: boolean;
    setDomRef: (domElement: HTMLElement | null) => void;
};

export const XmlTextView: React.FC<XmlTextViewProp> = (
    prop: XmlTextViewProp
) => {
    const content = prop.text.trim();
    return content.length ? (
        <li ref={prop.setDomRef}>
            <span className={`text-rep node-rep ${prop.matched && "matched"}`}>
                {content}
            </span>
        </li>
    ) : null;
};
