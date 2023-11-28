import "./App.css";
import { useState } from "react";

import XmlForm from "./XmlForm";
import XmlDocView from "./XmlDocView";
import "./App.css";
import { XPathNavigator } from "./XPathNavigator";

function App() {
    const [xmlContent, setXmlcontent] = useState<string>("");

    return (
        <>
            <XmlForm onFileUploaded={setXmlcontent} />
            <XPathNavigator />
            <XmlDocView content={xmlContent} />
        </>
    );
}

export default App;
