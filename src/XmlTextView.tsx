type XmlTextViewProp = {
    text: string;
    matched: boolean;
};

export const XmlTextView: React.FC<XmlTextViewProp> = (
    prop: XmlTextViewProp
) => {
    const content = prop.text.trim();
    return content.length ? (
        <li className={prop.matched ? "matched" : ""}>{content}</li>
    ) : null;
};
