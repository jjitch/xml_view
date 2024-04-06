import { useState, ChangeEvent } from "react";
import { Form } from "react-bootstrap";

type XPathNavigatorProp = {
    setExpr: (expr: XPathExpression | null) => void;
    onKeyDownHandler: React.KeyboardEventHandler;
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
        <Form>
            <Form.Control
                onChange={validateXPath}
                onKeyDown={prop.onKeyDownHandler}
                placeholder="XPath Search"
            />
            <Form.Text
                className="font-monospace"
                style={{ height: "1em", display: "block" }}
            >
                {valid ? "" : "This XPath is invalid"}
            </Form.Text>
        </Form>
    );
};
