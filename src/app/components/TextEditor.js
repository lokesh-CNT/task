'use client'

import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const TextEditor = ({ value, onChange }) => {
  const modules = {
    toolbar: [
      ["bold", "italic", "underline"],
      ["image"],
      ["formula"],
    ],
  };

  return (
    <ReactQuill
      value={value}
      onChange={onChange}
      modules={modules}
      className="h-64"
    />
  );
};

export default TextEditor;
