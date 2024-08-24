import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from './Loading';

const TrendingEbooks = () => {
  const [trendingEbooks, setTrendingEbooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch random trending eBooks from Open Library
    const fetchTrendingEbooks = async () => {
      try {
        const subjects = ["science_fiction", "fantasy", "romance", "mystery", "thriller"];
        const randomSubject = subjects[Math.floor(Math.random() * subjects.length)];
        const response = await axios.get(
          `https://openlibrary.org/subjects/${randomSubject}.json?limit=4`
        );
        setTrendingEbooks(response.data.works);
      } catch (error) {
        console.error('Error fetching the trending eBooks data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingEbooks();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <Loading />
      </div>
    );
  }

  if (trendingEbooks.length === 0) {
    return <div>No trending eBooks available at the moment.</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Some Nostalgic Ebooks</h2>
      <div className="grid grid-cols-2 gap-4">
        {trendingEbooks.map((ebook) => (
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
            <p className="text-orange-600">Author: {ebook.authors.map((author) => author.name).join(', ')}</p>
            <a
              href={`https://openlibrary.org${ebook.key}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 text-green-500 hover:underline"
            >
              Download
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingEbooks;
