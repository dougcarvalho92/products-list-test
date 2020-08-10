import React from "react";
import { useDropzone } from "react-dropzone";
import "./styles.css";
export default function Dropzone(props) {
  const {
    acceptedFiles,

    getRootProps,
    getInputProps,
  } = useDropzone({
    accept: "image/jpeg, image/png",
    multiple: false,
  });

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <section>
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Selecione ou arrasta para cá a imagem do produto</p>
      </div>
      <aside>
        <h4>Arquivos</h4>
        <ul>{files}</ul>
      </aside>
    </section>
  );
}
