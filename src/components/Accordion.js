import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from './Loading';

const Accordion = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [fantasyBooks, setFantasyBooks] = useState([]);
  const [sciFiBooks, setSciFiBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const genres = [
    { name: 'Fantasy', stateSetter: setFantasyBooks, data: fantasyBooks, apiEndpoint: 'fantasy' },
    { name: 'Science Fiction', stateSetter: setSciFiBooks, data: sciFiBooks, apiEndpoint: 'science_fiction' },
  ];

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const promises = genres.map(async (genre) => {
          const response = await axios.get(
            `https://openlibrary.org/subjects/${genre.apiEndpoint}.json?limit=10`
          );
          const randomBooks = shuffleArray(response.data.works).slice(0, 2); // Get 2 random books
          genre.stateSetter(randomBooks);
        });
        await Promise.all(promises);
      } catch (err) {
        console.error('Error fetching books:', err);
        setError('Failed to fetch books. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const toggleIndex = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-4">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-8">
      {genres.map((genre, index) => (
        <div key={index} className="mb-6">
          <button
            onClick={() => toggleIndex(index)}
            className="w-full p-4 bg-green-500 text-left text-xl font-semibold text-white rounded hover:bg-green-600 transition"
          >
            {genre.name}
          </button>
          {activeIndex === index && (
            <div className="p-4 bg-gray-100 border border-t-0 border-gray-300 rounded-b">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {genre.data.map((book) => (
                  <div
                    key={book.key}
                    className="bg-white p-4 rounded shadow hover:shadow-md transition"
                  >
                    <img
                      src={
                        book.cover_id
                          ? `https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg`
                          : 'https://via.placeholder.com/150x200?text=No+Cover'
                      }
                      alt={book.title}
                      className="w-full h-60 object-cover mb-4 rounded"
                    />
                    <h3 className="text-lg font-semibold mb-2">{book.title}</h3>
                    <p className="text-gray-700 mb-4">
                      Author: {book.authors?.map((author) => author.name).join(', ') || 'Unknown'}
                    </p>
                    <a
                      href={`https://openlibrary.org${book.key}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
                    >
                      View Details
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
