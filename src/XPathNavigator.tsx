import { useState, ChangeEvent } from "react";
import { Form } from "react-bootstrap";

type XPathNavigatorProp = {
    setExpr: (expr: XPathExpression | null) => void;
};

export const XPathNavigator: React.FC<XPathNavigatorProp> = (
    prop: XPathNavigatorProp
) => {
    const [valid, setValid] = useState<boolean>(true);
    const validateXPath = (e: ChangeEvent<HTMLInputElement>) => {
        try {
            if (e.target.value) {
                console.log(e.target.value);
                prop.setExpr(document.createExpression(e.target.value));
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
