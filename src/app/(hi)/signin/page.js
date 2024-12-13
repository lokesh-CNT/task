
'use client'

import React, { useState } from 'react';

const TextField = ({ label, id, value, onChange }) => {
  const [focused, setFocused] = useState(false);

  const handleFocus = () => setFocused(true);
  const handleBlur = () => setFocused(value.length > 0);

  return (
    <div className="relative my-4">
      {/* Input Field */}
      <input
        id={id}
        type="text"
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`peer block w-full px-4 py-3 text-base text-gray-900 bg-transparent border-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent ${
          focused || value ? 'border-blue-500' : 'border-gray-300'
        }`}
        placeholder=" " // This allows the label to appear above
        required
      />

      {/* Label */}
      <label
        htmlFor={id}
        className={`absolute left-4 transition-all duration-200 transform origin-left ${
          focused || value
            ? 'top-0 text-sm text-blue-500'
            : 'top-1/2 text-base text-gray-500 -translate-y-1/2'
        }`}
      >
        {label}
      </label>
    </div>
  );
};

export default TextField;
