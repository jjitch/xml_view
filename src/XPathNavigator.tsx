import { useState, ChangeEvent } from "react";
import { Form } from "react-bootstrap";

export const XPathNavigator = () => {
    const [valid, setValid] = useState<boolean>(true);
    const validateXPath = (e: ChangeEvent<HTMLInputElement>) => {
        try {
            if (e.target.value) {
                document.createExpression(e.target.value);
            }
            setValid(true);
        } catch (e) {
            console.log(e);
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
