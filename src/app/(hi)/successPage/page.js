'use client';

import React, { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import katex from 'katex';
import 'katex/dist/katex.min.css';

const MathEditorPopup = dynamic(() => import('../../components/MathEditor'), { ssr: false });

const Home = () => {
  const [content, setContent] = useState('');
  const [isMathEditorOpen, setMathEditorOpen] = useState(false);
  const [questions, setQuestions] = useState([]);
  const contentRef = useRef(null);
  const cursorPosition = useRef(null); // Store the last cursor position

  // Save the cursor position
  const saveCursorPosition = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      cursorPosition.current = selection.getRangeAt(0);
    }
  };

  // Restore cursor position and focus the editable div
  const restoreCursorPosition = () => {
    if (contentRef.current) {
      contentRef.current.focus();
    }

    const selection = window.getSelection();
    if (cursorPosition.current && selection) {
      selection.removeAllRanges();
      selection.addRange(cursorPosition.current);
    }
  };

  // Handle inserting a mathematical equation
  const handleInsertEquation = (equation) => {
    const renderedEquation = katex.renderToString(equation, {
      throwOnError: false,
    });

    const span = document.createElement('span');
    span.className = 'mq-selectable';
    span.setAttribute('data-latex', equation);
    span.setAttribute('contenteditable', 'false');
    span.innerHTML = renderedEquation;

    // Ensure editable div is focused and cursor is restored
    restoreCursorPosition();

    const selection = window.getSelection();
    const range = selection.getRangeAt(0);

    if (range) {
      range.deleteContents();
      range.insertNode(span);

      const space = document.createTextNode(' ');
      range.insertNode(space);

      range.setStartAfter(space);
      range.setEndAfter(space);
      selection.removeAllRanges();
      selection.addRange(range);

      setContent(contentRef.current.innerHTML);
    } else {
      // If no range is available, append at the end
      if (contentRef.current) {
        const contentDiv = contentRef.current;
        contentDiv.appendChild(span);
        contentDiv.appendChild(document.createTextNode(' '));
        setContent(contentDiv.innerHTML);
      }
    }

    setMathEditorOpen(false);
  };

  // Handle adding a new question
  const handleAddQuestion = () => {
    if (!content.trim()) {
      alert('Please add content before adding a question.');
      return;
    }

    setQuestions((prev) => [...prev, content]);
    setContent('');
    if (contentRef.current) {
      contentRef.current.innerHTML = '';
    }
  };

  // Handle changes in the editable div
  const handleContentChange = () => {
    if (contentRef.current) {
      setContent(contentRef.current.innerHTML);
    }
  };

  // Handle submission (log the final HTML content)
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

  // Sync content to editable div on re-render
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
          onClick={() => document.execCommand('bold')}
        >
          Bold
        </button>
        <button
          className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
          onClick={() => document.execCommand('italic')}
        >
          Italic
        </button>
        <button
          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={handleAddQuestion}
        >
          Add Question
        </button>
      </div>

      {/* Editable Div */}
      <div
        ref={contentRef}
        className="border border-gray-300 p-4 bg-white rounded mb-4 text-black w-full"
        contentEditable
        onInput={handleContentChange}
        onClick={saveCursorPosition}
        onKeyUp={saveCursorPosition}
        style={{ minHeight: '50px', fontSize: '14px', cursor: 'text' }}
      ></div>

      {/* List of Added Questions */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2 text-black">Questions:</h3>
        {questions.map((question, index) => (
          <div
            key={index}
            className="border border-gray-200 p-4 bg-white rounded mb-2 text-black"
          >
            <div dangerouslySetInnerHTML={{ __html: question }} />
          </div>
        ))}
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
