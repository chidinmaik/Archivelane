import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';

const EbookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 7;

  const searchBooks = async (query) => {
    setLoading(true); // Set loading to true when search starts
    try {
      const response = await axios.get(`https://openlibrary.org/search.json?q=${query}`);
      setBooks(response.data.docs);
      setCurrentPage(1); // Reset to the first page after search
    } catch (error) {
      console.error("Error fetching the books:", error);
    }
    setLoading(false); // Set loading to false when search ends
  };

  // Pagination logic
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(books.length / booksPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <SearchBar onSearch={searchBooks} />

      {/* Progress Bar */}
      {loading && (
        <div className="w-full bg-gray-200 h-2 mt-4">
          <div className="bg-green-500 h-2 animate-pulse" style={{ width: '100%' }}></div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        {!loading && currentBooks.length > 0 ? (
          currentBooks.map((book) => (
            <EbookItem key={book.key} book={book} />
          ))
        ) : (
          !loading && <p className="col-span-3 text-center text-orange-500">No books found.</p>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-8 space-x-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`py-2 px-4 rounded-md ${currentPage === 1 ? 'bg-black-300 text-white-500' : 'bg-green-500 text-white hover:bg-black-600'}`}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className={`py-2 px-4 rounded-md ${currentPage === totalPages ?
          'bg-orange-300 text-gray-500' : 'bg-black-500 text-white hover:bg-green-600'}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

const EbookItem = ({ book }) => {
  const [reactions, setReactions] = useState({
    like: 0,
    love: 0,
    insightful: 0,
  });

  const handleReaction = (reactionType) => {
    setReactions((prevReactions) => ({
      ...prevReactions,
      [reactionType]: prevReactions[reactionType] + 1,
    }));
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      {/* Book Cover Image */}
      {book.cover_i ? (
        <img
          src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`}
          alt={book.title}
          className="w-full h-64 object-cover rounded-md"
        />
      ) : (
        <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-md">
          <span className="text-gray-500">No Cover Available</span>
        </div>
      )}

      <h3 className="text-xl font-bold mt-4">{book.title}</h3>
      <p className="text-gray-700">by {book.author_name?.[0]}</p>

      {/* Reactions */}
      <div className="mt-4 flex space-x-4">
        <button
          className="text-red-500 hover:text-red-700 transition"
          onClick={() => handleReaction('like')}
        >
          👍 Like ({reactions.like})
        </button>
        <button
          className="text-pink-500 hover:text-pink-700 transition"
          onClick={() => handleReaction('love')}
        >
          ❤️ Love ({reactions.love})
        </button>
        <button
          className="text-yellow-500 hover:text-yellow-700 transition"
          onClick={() => handleReaction('insightful')}
        >
          💡 Insightful ({reactions.insightful})
        </button>
      </div>

      {/* Display List of Reactions */}
      <div className="mt-4">
        {reactions.like > 0 && <p>👍 {reactions.like} Like{reactions.like > 1 ? 's' : ''}</p>}
        {reactions.love > 0 && <p>❤️ {reactions.love} Love{reactions.love > 1 ? 's' : ''}</p>}
        {reactions.insightful > 0 && <p>💡 {reactions.insightful} Insightful{reactions.insightful > 1 ? 's' : ''}</p>}
      </div>

      {/* Share Button */}
      <div className="mt-4">
        <button
          className="text-blue-500 hover:text-blue-700 transition"
          onClick={() =>
            navigator.share({
              title: book.title,
              text: `Check out this ebook: ${book.title} by ${book.author_name?.[0]}`,
              url: `https://openlibrary.org${book.key}`,
            })
          }
        >
          🔗 Share
        </button>
      </div>
    </div>
  );
};

export default EbookList;
