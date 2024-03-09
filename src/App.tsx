import "./App.css";
import { useState } from "react";

import XmlForm from "./XmlForm";
import XmlDocView from "./XmlDocView";
import "./App.css";

function App() {
    const [xmlContent, setXmlcontent] = useState<string>("");
    return (
        <>
            <XmlForm onFileUploaded={setXmlcontent} />
            <XmlDocView content={xmlContent} />
        </>
    );
}

export default App;
