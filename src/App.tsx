import "./App.css";
import { useState } from "react";

import XmlForm from "./XmlForm";
import XmlDocView from "./XmlDocView";
import "./App.css";

function App() {
    const [xmlContent, setXmlcontent] = useState<string>("");

    return (
        <div>
            <XmlForm onFileUploaded={setXmlcontent} />
            <XmlDocView content={xmlContent} />
        </div>
    );
}

export default App;
