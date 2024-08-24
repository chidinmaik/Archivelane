import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between">
          {/* Logo or Brand Name */}
          <div className="mb-6 md:mb-0">
            <h2 className="text-xl font-bold text-white">ArchiveLane</h2>
            <p className="mt-2 text-white">Welcome to ArchiveLane, where we believe
            in the transformative power of reading. Our mission is to make
            quality ebooks accessible to everyone, anytime, anywhere. With a
            diverse selection of genres and titles, we cater to readers of all
            interests and backgrounds. Whether you're diving into a new novel or
            expanding your knowledge, Arcchivelane is here to support your
            literary journey.</p>
          </div>

          {/* Quick Links */}
          <div className="mb-6 md:mb-0">
            <h3 className="text-lg font-semibold text-white mb-2">Quick Links</h3>
            <ul>
              <li>
                Home
              </li>
              <li>
                About Us
              </li>
              <li>
                Contact
              </li>
              <li>
                Privacy Policy
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="mb-6 md:mb-0">
            <h3 className="text-lg font-semibold text-white mb-2">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com/chidi.ike.0" className="text-gray-400 hover:text-white">
                Facebook
              </a>
              <a href="https://twitter.com/chidinma0ik" className="text-gray-400 hover:text-white">
                Twitter
              </a>
              <a href="https://chidinmaik.vercel.app" className="text-gray-400 hover:text-white">
                Portfolio
              </a>

            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-4 text-center">
          <p className="text-sm text-orange-500">
            &copy; {new Date().getFullYear()} Designed by <span
            className="text-red-500" ><a 
            href="https://github.com/chidinmaik">Chidinma</a>.</span> All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
