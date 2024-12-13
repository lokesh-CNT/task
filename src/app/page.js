
'use client'
import car from '../app/images/image1.png';
import { useState } from 'react';

const Carousel = () => {
  const images = [
    imgs
    
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <div className="relative overflow-hidden">
        {/* Image Display */}
        <img
          src={images[currentIndex]}
          alt={`carousel-image-${currentIndex}`}
          className="w-full h-72 object-cover transition-all duration-500"
        />
        
        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full"
        >
          &#60;
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full"
        >
          &#62;
        </button>
      </div>
    </div>
  );
};

export default Carousel;
