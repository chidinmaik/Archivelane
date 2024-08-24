import React from 'react';

const AboutUs = () => {
  return (
    <section id="about-us" className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">About Us</h2>
        <p className="text-lg text-gray-700 mb-8">
          We are a passionate team dedicated to bringing you the best content and experiences. Our mission is to provide valuable and engaging resources to help you navigate the world of literature and technology. Our team is comprised of experts in various fields, each bringing their unique skills and perspectives to our projects.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <img
              src="https://via.placeholder.com/150"
              alt="Team Member"
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-center mb-2">Jane Doe</h3>
            <p className="text-gray-600 text-center">CEO & Founder</p>
            <p className="text-gray-500 text-center mt-2">
              Jane is the visionary behind our company, with a passion for innovation and excellence.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <img
              src="https://via.placeholder.com/150"
              alt="Team Member"
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-center mb-2">John Smith</h3>
            <p className="text-gray-600 text-center">CTO</p>
            <p className="text-gray-500 text-center mt-2">
              John leads our technical team, ensuring that we stay at the forefront of technology.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <img
              src="https://via.placeholder.com/150"
              alt="Team Member"
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-center mb-2">Emily Johnson</h3>
            <p className="text-gray-600 text-center">Creative Director</p>
            <p className="text-gray-500 text-center mt-2">
              Emily brings creativity and design expertise, crafting visually stunning and engaging content.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
