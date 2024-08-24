import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from './Loading';

const PopularEbooks = () => {
  const [ebooks, setEbooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEbook, setSelectedEbook] = useState(null);

  useEffect(() => {
    // Fetch popular eBooks data from Open Library API
    const fetchEbooks = async () => {
      try {
        const response = await axios.get(
          'https://openlibrary.org/subjects/classic.json?limit=7'
        );
        setEbooks(response.data.works);
      } catch (error) {
        console.error('Error fetching the eBooks data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEbooks();
  }, []);

  const handleDownloadClick = (ebook) => {
    setSelectedEbook(ebook);
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
      <h2 className="text-2xl font-bold mb-4">Classic Archives</h2>

      {/* Dropdown for download options */}
      <div className="relative mb-4">
        <button className="bg-green-500 text-yellow py-2 px-4 rounded-md">
          {selectedEbook ? `Download ${selectedEbook.title}` : 'Select eBook to Download'}
        </button>
        {selectedEbook && (
          <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md w-48">
            <ul>
              <li>
                <a
                  href={`https://archive.org/download/${selectedEbook.key}/${selectedEbook.key}.pdf`}
                  download
                  className="block px-4 py-2 text-orange-800 hover:bg-gray-200"
                >
                  Download PDF
                </a>
              </li>
              <li>
                <a
                  href={`https://archive.org/download/${selectedEbook.key}/${selectedEbook.key}.epub`}
                  download
                  className="block px-4 py-2 text-orange-800 hover:bg-gray-200"
                >
                  Download EPUB
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {ebooks.map((ebook) => (
          <div
            key={ebook.key}
            className="p-4 bg-white rounded shadow-md hover:bg-green-100 transition"
          >
            <img
              src={`https://covers.openlibrary.org/b/id/${ebook.cover_id}-L.jpg`}
              alt={ebook.title}
              className="w-full h-40 object-cover mb-4 rounded"
            />
            <h3 className="text-lg font-semibold">{ebook.title}</h3>
            <p className="text-gray-600">Author: {ebook.authors.map(author => author.name).join(', ')}</p>
            <button
              onClick={() => handleDownloadClick(ebook)}
              className="mt-2 bg-green-500 text-white py-1 px-3 rounded hover:bg-black-600"
            >
              Select for Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularEbooks;
