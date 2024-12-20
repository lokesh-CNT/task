'use client';

import React, { useState } from 'react';
import { addStyles, EditableMathField } from 'react-mathquill';

addStyles(); // Required for MathQuill

const MathEditorPopup = ({ onInsertEquation, onClose }) => {
  const [mathValue, setMathValue] = useState('');

  const predefinedEquations = [
    '\\frac{a}{b}',     // Fraction
    '\\sqrt{x}',        // Square Root
    'x^2',              // Power
    '\\int_{a}^{b}',    // Integral
    '\\sum_{n=1}^N n',  // Summation
    '\\pi',             // Pi Symbol
    '\\theta',          // Theta Symbol
  ];

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-[400px] z-50">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Math Editor</h2>

      {/* Editable Math Field */}
      <div className="border text-black border-gray-300 rounded p-2 mb-4">
        <EditableMathField
          latex={mathValue}
          onChange={(mathField) => setMathValue(mathField.latex())}
        />
      </div>

      {/* Predefined Equations */}
      <div className="flex text-black flex-wrap gap-2 mb-4">
        {predefinedEquations.map((eq, index) => (
          <button
            key={index}
            onClick={() => setMathValue(eq)}
            className="px-3 py-1 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200 transition"
          >
            {eq}
          </button>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3">
        <button
          onClick={() =>
            onInsertEquation(mathValue)
          }
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Insert
        </button>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default MathEditorPopup;
