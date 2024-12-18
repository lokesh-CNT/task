'use client'

import MathEditor from "@/app/components/MathEditor";
import TextEditor from "@/app/components/TextEditor";
import React, { useState } from "react";


const App = () => {
  const [editorContent, setEditorContent] = useState("");

  const handleFormulaInsert = (latex) => {
    const formulaHTML = `<span class="mathquill-rendered">\\(${latex}\\)</span>`;
    setEditorContent((prev) => prev + formulaHTML);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Math Editor with Text Editor</h1>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => document.getElementById("math-popup").classList.remove("hidden")}
      >
        Open Math Editor
      </button>
      <div id="math-popup" className="hidden fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-4 rounded-md">
          <MathEditor onFormulaInsert={handleFormulaInsert} />
          <button
            onClick={() => document.getElementById("math-popup").classList.add("hidden")}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
      </div>
      <TextEditor value={editorContent} onChange={setEditorContent} />
      <h2 className="text-xl font-semibold mt-6">Editor Output:</h2>
      <div
        className="border p-4 mt-2"
        dangerouslySetInnerHTML={{ __html: editorContent }}
      ></div>
    </div>
  );
};

export default App;
