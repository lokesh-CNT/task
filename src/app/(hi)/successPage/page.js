'use client';

import React, { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import katex from 'katex'; // Import KaTeX for rendering math
import { EditableMathField, StaticMathField } from 'react-mathquill';
const MathEditorPopup = dynamic(() => import('../../components/MathEditor'), { ssr: false });

const Home = () => {
  const [content, setContent] = useState('');
  const [isMathEditorOpen, setMathEditorOpen] = useState(false);
  const contentRef = useRef(null);

  // Handle inserting a mathematical equation into content
  const handleInsertEquation = (equation) => {
    const equValue=equation;
    console.log(equValue)
    setContent((prevContent) => `${prevContent} ${equation} `);
    setMathEditorOpen(false);
  };

  // Handle form submission
  const handleSubmit = () => {
    console.log('Final Content:', content);
  };

  // Track changes in the contentEditable field 1
  const handleContentChange = () => {
    // Ensure to update the content with innerText, not innerHTML
    if (contentRef.current) {
      setContent(contentRef.current.innerHTML);
      console.log("cont",content)
    }
  };

  // Automatically update the content in the div when the content state changes
  useEffect(() => {
    if (contentRef.current && content !== contentRef.current.innerHTML) {
      contentRef.current.innerHTML = content;
    }
  }, [content]);

  return (
    <div className="p-6 bg-gray-50 rounded shadow-md">
      <div className="flex gap-2 mb-4">
        <button
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => setMathEditorOpen(true)}
        >
          Open Math Editor
        </button>
      </div>

      {/* Editable Div */}
      <div
        ref={contentRef}
        className="border border-gray-300 p-4 bg-white rounded mb-4 text-black w-full"
        contentEditable
        onInput={handleContentChange}
        style={{ minHeight: '50px', fontSize: '14px', cursor: 'text' }} // Editable div with 50px height
      >
        
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-green-500 text-white rounded"
      >
        Submit
      </button>

      {/* Math Editor Popup */}
      {isMathEditorOpen && (
        <MathEditorPopup
          onInsertEquation={handleInsertEquation}
          onClose={() => setMathEditorOpen(false)}
        />
      )}
    </div>
  );
};

export default Home;



