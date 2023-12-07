import { useEffect, useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import Dropzone from "react-dropzone";
import { Form } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import { GlobalWorkerOptions } from "pdfjs-dist";

GlobalWorkerOptions.workerSrc = new URL(
  "../../../node_modules/pdfjs-dist/build/pdf.worker.mjs",
  import.meta.url
).toString();

const UploadDocument = () => {
  const [image, setImage] = useState();
  const [file, setFile] = useState([]);
  const [pdf, setPdf] = useState();
  const [pdfPreview, setPdfPreview] = useState();

  const thumbs = file.map(f => (
    <Image
      style={{ width: "40vh", height: "60vh" }}
      src={f.preview}
      alt="img"
      onLoad={() => {
        URL.revokeObjectURL(f.preview);
      }}
    />
  ));

  useEffect(() => {
    return () => file.forEach(file => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <Form>
      <Row>
        <Col sm={6}>
          <Form.Group className="mb-3">
            <Dropzone
              onDrop={acceptedFiles => {
                setFile(acceptedFiles);
              }}>
              {({ getRootProps, getInputProps, acceptedFiles }) => (
                <>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p className="d-flex align-items-center btn btn-light text-dark border-3 border-dark fw-bold rounded-pill fs-5">
                      <FaPlus />
                      {acceptedFiles[0]
                        ? acceptedFiles[0].path
                        : "Tracina il pdf del libretto di circolazione\noppure clicca sul piu per aprire explore"}
                    </p>
                  </div>
                  {image && (
                    <Image
                      src={image.preview}
                      alt="Image preview"
                    />
                  )}
                  {thumbs}
                </>
              )}
            </Dropzone>
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
};

export default UploadDocument;
