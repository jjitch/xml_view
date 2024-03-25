export const GetTextRep = (node: Node): string | null => {
    if (node.nodeType === Node.ATTRIBUTE_NODE) return (node as Attr).value;
    if (node.nodeType === Node.TEXT_NODE) return (node as Text).textContent;
    return null;
};
