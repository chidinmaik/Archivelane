import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Loading from './Loading';

const SubjectSlider = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch subjects from Open Library
    const fetchSubjects = async () => {
      try {
        const response = await axios.get("https://openlibrary.org/subjects.json?limit=10");

        // Log the full response to understand the structure
        console.log("API Response:", response);

        // Verify if subjects exist and set state
        if (response.data && response.data.works) {
          setSubjects(response.data.works);
        } else {
          setSubjects([]); // Fallback if data is missing
        }
      } catch (error) {
        console.error("Error fetching subjects:", error);
        setSubjects([]); // Fallback in case of error
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <Loading />
      </div>
    );
  }

  if (subjects.length === 0) {
    return <div>No subjects available at the moment.</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Available Subjects</h2>
      <Slider {...settings}>
        {subjects.map((subject, index) => (
          <div key={index} className="p-2">
            <div className="bg-white rounded shadow-md p-4 h-full flex flex-col justify-center items-center hover:bg-blue-100 transition">
              <h3 className="text-lg font-semibold text-center">{subject.title}</h3>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SubjectSlider;
