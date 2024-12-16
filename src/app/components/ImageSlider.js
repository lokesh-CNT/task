'use client';

import React, { useState, useEffect, useRef } from 'react';
import car from '../../../public/sliderImage/img1.jpg';
import car2 from '../../../public/sliderImage/img2.jpg'
import Image from 'next/image';
const images = [
  car, // Add more images as needed
  car2,
  car,
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  



  const goToPrevious = () => {
    
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    
  };

  const goToNext = () => {
   
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    
  };

  return (
    <div
      className="relative max-w-full max-h-full overflow-hidden group rounded-lg"
     
    >
      {/* Images */}
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div key={index} className="min-w-full h-full overflow-hidden">
            <Image
              src={image}
              width='w-full'
              height='min-h-full'
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-contain overflow-hidden"
            />
          </div>
        ))}
      </div>

      {/* Previous Button */}
      {currentIndex<1?<></>:<button 
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 text-white px-4 py-2 rounded-full hidden group-hover:block"
        onClick={goToPrevious}
      >
        &#10094;
      </button>}

      {/* Next Button */}
      {currentIndex==images.length-1?<></>: <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 text-white px-4 py-2 rounded-full hidden group-hover:block"
        onClick={goToNext}
      >
        &#10095;
      </button>}

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? 'bg-white' : 'bg-gray-500'
            }`}
            onClick={() =>{
              setCurrentIndex(index);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
