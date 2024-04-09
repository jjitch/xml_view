import "./App.css";
import { useState } from "react";

import XmlForm from "./XmlForm";
import "./App.css";
import { SessionEntry } from "./SessionEntry";

function App() {
    const [xmlContent, setXmlcontent] = useState<File | null>(null);
    return (
        <>
            {xmlContent ? (
                <SessionEntry
                    inputFile={xmlContent}
                    onDetachDocument={() => {
                        setXmlcontent(null);
                    }}
                />
            ) : (
                <XmlForm onFileUploaded={setXmlcontent} />
            )}
        </>
    );
}

export default App;
