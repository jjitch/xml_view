import { useState, ChangeEvent } from "react";
import { Form, Button } from "react-bootstrap";

type XmlFormProps = {
    onFileUploaded: (content: string) => void;
};

const XmlForm: React.FC<XmlFormProps> = (prop: XmlFormProps) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0)
            setSelectedFile(event.target.files[0]);
        else setSelectedFile(null);
    };

    const handleUpload = () => {
        if (selectedFile) {
            selectedFile.text().then((v) => prop.onFileUploaded(v));
        }
    };
    return (
        <div>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Control
                        type="file"
                        // accept=".xml"
                        onChange={handleFileChange}
                    />
                </Form.Group>
                <Button
                    className="mb-4"
                    variant="primary"
                    onClick={handleUpload}
                >
                    Submit!
                </Button>
            </Form>
        </div>
    );
};

export default XmlForm;
