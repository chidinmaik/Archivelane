import React, { useState, useEffect } from "react";
import slide1 from './Images/slide1.jpg';
import slide2 from './Images/slide2.jpg';
import slide3 from './Images/slide3.jpg';

const HeroSlider = () => {
  // Array of images and text for the slider
  const slides = [
    {
      image: slide1,
      title: "Discover Old Classics",
      description: "Explore a vast collection of timeless eBooks.",
    },
    {
      image: slide2,
      title: "Explore a World of Knowledge",
      description: "Unlock the doors to endless possibilities with our vast collection of ebooks. Whether you're a curious mind, a passionate reader, or someone seeking expertise in a specific field, we have something for everyone. Start your journey today.",
    },
    {
      image: slide3,
      title: "Join Our Community of Readers",
      description: "Reading is more than just a pastime—it's a way to connect. Join our vibrant community of book lovers, share your thoughts, and explore what others are saying about the books you love.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center p-4">
            <h2
              className={`text-4xl md:text-5xl font-bold text-white transition-transform duration-1000 ease-in-out ${
                index === currentIndex ? "translate-y-0" : "translate-y-10"
              }`}
            >
              {slide.title}
            </h2>
            <p
              className={`mt-4 text-lg md:text-xl text-white max-w-2xl transition-transform duration-1000 ease-in-out ${
                index === currentIndex ? "translate-y-0" : "translate-y-10"
              }`}
            >
              {slide.description}
            </p>
            <a
              href="#"
              className={`mt-8 inline-block bg-orange-500 text-white text-lg
              font-light py-3 px-6 rounded-md hover:bg-black-600
              transition-transform duration-1000 ease-in-out ${
                index === currentIndex ? "translate-y-0" : "translate-y-10"
              }`}
            >
              Get Started
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeroSlider;
