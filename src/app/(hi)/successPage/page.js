'use client';

import React, { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import MathQuillBlot from '@/app/components'; // Import custom blot

const MathEditorPopup = dynamic(() => import('@/app/components/MathEditor'), { ssr: false });

const HomePage = () => {
  const [quillContent, setQuillContent] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const quillRef = useRef(null);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  const handleInsertEquation = (equation) => {
    const quill = quillRef.current.getEditor();
    const cursorPosition = quill.getSelection().index;

    // Insert custom math blot
    quill.insertEmbed(cursorPosition, 'math', equation);
    quill.setSelection(cursorPosition + 1); // Move cursor
    closePopup();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 relative">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">ReactQuill with Math Editor</h1>

      {/* ReactQuill Editor */}
      <ReactQuill
        ref={quillRef}
        value={quillContent}
        onChange={setQuillContent}
        modules={{ toolbar: [['bold', 'italic', 'underline'], ['math']] }}
        formats={['bold', 'italic', 'underline', 'math']} // Register custom format
      />

      {/* Open Popup Button */}
      <button
        onClick={openPopup}
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Open Math Editor
      </button>

      {/* Math Editor Popup */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <MathEditorPopup onInsertEquation={handleInsertEquation} onClose={closePopup} />
        </div>
      )}
    </div>
  );
};

export default HomePage;
