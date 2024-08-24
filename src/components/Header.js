import React, { useState } from "react";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-green-800 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <div className="text-2xl font-bold">
          ArchiveLane
        </div>

        {/* Hamburger Menu (for mobile view) */}
        <button
          className="block md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>

        {/* Navigation Links */}
        <nav
          className={`${
            isOpen ? "block" : "hidden"
          } md:flex md:items-center absolute md:static top-14 md:top-auto right-0 bg-gray-800 w-full md:w-auto transition-opacity duration-300 ease-in-out ${
            isOpen ? "opacity-100" : "opacity-0 md:opacity-100"
          }`}
        >
          <ul className="md:flex space-y-4 md:space-y-0 md:space-x-8 p-4 md:p-0">
            <li>
              <a href="#Home" className="hover:text-gray-400 transition">
                Home
              </a>
            </li>
            <li>
              <a href="/Aboutus" className="hover:text-gray-400 transition">
                About
              </a>
            </li>
            <li className="hover:text-gray-400 transition">
                Services     </li>
            <li className="hover:text-gray-400 transition">
                Contact
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
