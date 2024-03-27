type XmlTextViewProp = {
    text: string;
    matched: boolean;
};

export const XmlTextView: React.FC<XmlTextViewProp> = (
    prop: XmlTextViewProp
) => {
    const content = prop.text.trim();
    return content.length ? (
        <li>
            <span
                className={`text-rep node-rep ${prop.matched ? "matched" : ""}`}
            >
                {content}
            </span>
        </li>
    ) : null;
};
