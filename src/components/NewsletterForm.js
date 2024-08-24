import React, { useState } from 'react';

const NewsletterSubscription = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setMessage('Please enter a valid email address.');
      return;
    }

    // Get existing emails from localStorage
    let existingEmails = JSON.parse(localStorage.getItem('subscribedEmails')) || [];

    // Check if email is already subscribed
    if (existingEmails.includes(email)) {
      setMessage('This email is already subscribed.');
    } else {
      // Add new email to the list
      existingEmails.push(email);

      // Save back to localStorage
      localStorage.setItem('subscribedEmails', JSON.stringify(existingEmails));

      setMessage('Thank you for subscribing!');
      setEmail(''); // Clear the input field
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Subscribe to our Newsletter</h2>
      <form onSubmit={handleFormSubmit} className="flex flex-col space-y-4">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleEmailChange}
          className="p-2 border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
        >
          Subscribe
        </button>
      </form>
      {message && <p className="mt-4 text-sm text-gray-700">{message}</p>}
    </div>
  );
};

export default NewsletterSubscription;
