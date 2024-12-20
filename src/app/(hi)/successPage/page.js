'use client';

import React, { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import katex from 'katex'; // Import KaTeX for rendering math
import 'katex/dist/katex.min.css'; // Import KaTeX styles
const MathEditorPopup = dynamic(() => import('../../components/MathEditor'), { ssr: false });

const Home = () => {
  const [content, setContent] = useState('');
  const [isMathEditorOpen, setMathEditorOpen] = useState(false);
  const contentRef = useRef(null);

  // Handle inserting a mathematical equation into content
  const handleInsertEquation = (equation) => {
    const renderedEquation = katex.renderToString(equation, {
      throwOnError: false,
    });

    const span = document.createElement('span');
    span.className = 'mq-selectable';
    span.setAttribute('data-latex', equation);
    span.setAttribute('contenteditable', 'false'); // Make the equation non-editable
    span.innerHTML = renderedEquation;

    if (contentRef.current) {
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);

      range.deleteContents();
      range.insertNode(span);

      const space = document.createTextNode(' ');
      range.insertNode(space);

      range.setStartAfter(space);
      range.setEndAfter(space);
      selection.removeAllRanges();
      selection.addRange(range);

      setContent(contentRef.current.innerHTML);
    }

    setMathEditorOpen(false);
  };

  // Apply formatting (bold or italic) to the selected text
  const applyFormatting = (command) => {
    document.execCommand(command, false, null);
    setContent(contentRef.current.innerHTML); // Update content state
  };

  // Handle form submission
  const handleSubmit = () => {
    const div = document.createElement('div');
    div.innerHTML = content;
    const equations = div.querySelectorAll('.mq-selectable');
    equations.forEach((span) => {
      const latex = span.getAttribute('data-latex');
      span.innerHTML = latex;
    });

    console.log('Final Content:', div.innerHTML);
  };

  const handleContentChange = () => {
    if (contentRef.current) {
      setContent(contentRef.current.innerHTML);
    }
  };

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
        <button
          className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
          onClick={() => applyFormatting('bold')}
        >
          Bold
        </button>
        <button
          className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
          onClick={() => applyFormatting('italic')}
        >
          Italic
        </button>
      </div>

      {/* Editable Div */}
      <div
        ref={contentRef}
        className="border border-gray-300 p-4 bg-white rounded mb-4 text-black w-full"
        contentEditable
        onInput={handleContentChange}
        style={{ minHeight: '50px', fontSize: '14px', cursor: 'text' }}
      >
        {/* Initial content */}
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
