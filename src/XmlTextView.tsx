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
            <span className={prop.matched ? "matched" : ""}>{content}</span>
        </li>
    ) : null;
};
