import { useState, ChangeEvent } from "react";
import { Form } from "react-bootstrap";

type XPathNavigatorProp = {
    setExpr: (expr: XPathExpression | null) => void;
    contextDocument: Document;
};

export const XPathNavigator: React.FC<XPathNavigatorProp> = (
    prop: XPathNavigatorProp
) => {
    const [valid, setValid] = useState<boolean>(true);
    const resolver = document.createNSResolver(
        prop.contextDocument.ownerDocument === null
            ? prop.contextDocument.documentElement
            : (prop.contextDocument.ownerDocument as Document).documentElement
    );
    const validateXPath = (e: ChangeEvent<HTMLInputElement>) => {
        try {
            if (e.target.value) {
                prop.setExpr(
                    document.createExpression(e.target.value, resolver)
                );
            } else {
                prop.setExpr(null);
            }
            setValid(true);
        } catch (_) {
            prop.setExpr(null);
            setValid(false);
        }
    };
    return (
        <>
            <Form.Control onChange={validateXPath} />
            <Form.Text className="font-monospace">
                {valid ? "" : "This XPath is invalid"}
            </Form.Text>
        </>
    );
};
