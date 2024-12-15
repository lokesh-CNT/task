'use client';

import React, { useEffect, useRef } from 'react';

const images = [
  
];

const ContinuousImageSlider = () => {
  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;

    // Start the animation
    const startAnimation = () => {
      slider.style.transform = 'translateX(0%)';
      slider.style.transition = 'none'; // Reset transition for seamless loop

      // Start the infinite loop animation
      setTimeout(() => {
        slider.style.transition = 'transform 20s linear'; // Control speed (20s for the loop)
        slider.style.transform = `translateX(-100%)`;
      }, 0);
    };

    // Event listener to reset the animation when it's complete
    slider.addEventListener('transitionend', startAnimation);

    startAnimation();

    return () => slider.removeEventListener('transitionend', startAnimation);
  }, []);

  return (
    <div className="relative overflow-hidden w-full h-64">
      <div
        ref={sliderRef}
        className="flex w-[200%]" // Double width for smooth looping
      >
        {/* Duplicate images for seamless effect */}
        {images.concat(images).map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
            className="w-1/4 h-64 object-cover flex-shrink-0" // Adjust to fit the slider
          />
        ))}
      </div>
    </div>
  );
};

export default ContinuousImageSlider;
