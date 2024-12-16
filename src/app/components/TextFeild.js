'use client';

import React, { useState } from 'react';

const TextField = ({ label, id, name, value, onChange, onBlur }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = (event) => {
    setIsFocused(false); // Lose focus
    if (onBlur) onBlur(event); // Call parent onBlur if provided
    
  };

  return (
    <div className="relative my-4">
      {/* Input Field */}
      <input
        id={id}
        name={name}
        type="text"
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`peer block w-full px-4 pb-1 pt-5 text-base text-[1rem] text-white bg-transparent border-2 rounded-md border-gray-500    focus:outline-none focus:border-gray-400 placeholder-transparent ${
          (isFocused || value) ? 'border-gray-300' : 'border-gray-400'
        }`}
        placeholder=" " // This allows the label to appear above
      />

      {/* Label */}
      <label
        htmlFor={id}
        className={`absolute left-4 transition-all duration-200 transform origin-left ${
          (isFocused || value) 
            ? 'top-0 text-sm text-white' 
            : 'top-1/2 text-base text-gray-500 -translate-y-1/2'
        }`}
      >
        {label}
      </label>
    </div>
  );
};

export default TextField;
