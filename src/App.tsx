import "./App.css";
import { useState } from "react";

import XmlForm from "./XmlForm";
import XmlDocView from "./XmlDocView";
import "./App.css";
import { XPathNavigator } from "./XPathNavigator";

function App() {
    const [xmlContent, setXmlcontent] = useState<string>("");
    const [xpathExpr, setXPathExpr] = useState<XPathExpression | null>(null);
    return (
        <>
            <XmlForm onFileUploaded={setXmlcontent} />
            <XPathNavigator setExpr={setXPathExpr} />
            <XmlDocView content={xmlContent} xpathExpr={xpathExpr} />
        </>
    );
}

export default App;
