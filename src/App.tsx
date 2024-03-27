import "./App.css";
import { useState } from "react";

import XmlForm from "./XmlForm";
import XmlDocView from "./XmlDocView";
import "./App.css";
import { Button } from "react-bootstrap";

function App() {
    const [xmlContent, setXmlcontent] = useState<string>("");
    return (
        <>
            {xmlContent.length === 0 ? (
                <XmlForm onFileUploaded={setXmlcontent} />
            ) : (
                <Button variant="danger" onClick={() => setXmlcontent("")}>
                    Detach document
                </Button>
            )}
            <XmlDocView content={xmlContent} />
        </>
    );
}

export default App;
