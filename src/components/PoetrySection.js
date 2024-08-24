import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from './Loading';

const PoetrySection = () => {
  const [poetryItems, setPoetryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // 2 rows x 4 columns

  useEffect(() => {
    const fetchPoetryItems = async () => {
      setLoading(true);
      try {
        // Fetch poetry items from the Internet Archive API
        const response = await axios.get(
          `https://archive.org/advancedsearch.php?q=mediatype:texts+AND+subject:poetry&rows=50&fl[]=identifier,title,creator,description,downloads&output=json`
        );

        if (response.data.response.docs) {
          const items = response.data.response.docs;
          // Shuffle items to get a random selection
          const shuffledItems = items.sort(() => Math.random() - 0.5);
          // Slice the array to get only the items for the current page
          const paginatedItems = shuffledItems.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
          );
          setPoetryItems(paginatedItems);
        } else {
          console.error('Unexpected response structure:', response.data);
          setPoetryItems([]);
        }
      } catch (error) {
        console.error('Error fetching the poetry items data:', error);
        setPoetryItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPoetryItems();
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page > 0) {
      setCurrentPage(page);
      setLoading(true);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <Loading />
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Random Poetry Archives</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {poetryItems.length > 0 ? (
          poetryItems.map((item) => (
            <div
              key={item.identifier}
              className="p-4 bg-white rounded shadow-md hover:bg-green-100 transition"
            >
              <img
                src={`https://archive.org/services/img/${item.identifier}`}
                alt={item.title}
                className="w-full h-40 object-cover mb-4 rounded"
              />
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-gray-600">Creator: {item.creator || 'Unknown'}</p>
              <p className="text-gray-600">Downloads: {item.downloads || 'N/A'}</p>
              <a
                href={`https://archive.org/details/${item.identifier}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 mt-4 inline-block"
              >
                Read More
              </a>
            </div>
          ))
        ) : (
          <p>No poetry items found.</p>
        )}
      </div>

      <div className="mt-4 flex justify-between">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
        >
          Previous
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-black-600"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PoetrySection;
