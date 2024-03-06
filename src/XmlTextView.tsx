type XmlTextViewProp = {
    text: string;
};

export const XmlTextView: React.FC<XmlTextViewProp> = (
    prop: XmlTextViewProp
) => {
    const content = prop.text.trim();
    return content.length ? <li>{content}</li> : null;
};
