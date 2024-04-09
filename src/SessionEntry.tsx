import React, { useEffect, useState } from "react";
import XmlDocView from "./XmlDocView";
import { Button } from "react-bootstrap";
import { Unreachable } from "./XmlViewUtil";

type Accept = {
    type: "accept";
    xmlRoot: Document;
};

type Error = {
    type: "error";
    reason: string;
};

type Loading = {
    type: "loading";
};

type ParseResult = Accept | Loading | Error;

type SessionEntryProp = {
    inputFile: File;
    onDetachDocument: () => void;
};

export const SessionEntry: React.FC<SessionEntryProp> = (
    prop: SessionEntryProp
) => {
    const [parseResult, setParseResult] = useState<ParseResult>({
        type: "loading",
    });
    useEffect(() => {
        prop.inputFile.text().then((textContent) => {
            let parser = new DOMParser();
            let xmlDoc = parser.parseFromString(textContent, "application/xml");
            if (xmlDoc.querySelector("html > body > parsererror")) {
                setParseResult({
                    type: "error",
                    reason: "Parsing error",
                });
            } else {
                setParseResult({
                    type: "accept",
                    xmlRoot: xmlDoc,
                });
            }
        });
    }, [prop.inputFile]);
    switch (parseResult.type) {
        case "accept":
            return (
                <XmlDocView
                    xmlRoot={parseResult.xmlRoot}
                    disposeFile={prop.onDetachDocument}
                />
            );
        case "loading":
            return <span>Loading....</span>;
        case "error":
            return (
                <>
                    <span>{parseResult.reason}</span>
                    <Button variant="danger" onClick={prop.onDetachDocument}>
                        Detach document
                    </Button>
                </>
            );
        default:
            return Unreachable(parseResult);
    }
};
