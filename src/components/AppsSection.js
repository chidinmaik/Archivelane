import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./Loading"; // Adjust the import path if needed

const AppsSection = () => {
  const [apps, setApps] = useState([]);
  const [filteredApps, setFilteredApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const appsPerPage = 4;

  useEffect(() => {
    const fetchApps = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://archive.org/advancedsearch.php?q=collection:apkarchive+AND+title:${searchQuery}*&fl[]=identifier,title,creator,date,description,subject,mediatype&sort[]=random&rows=${appsPerPage}&page=${page}&output=json`
        );

        setApps(response.data.response.docs);
        setTotalPages(Math.ceil(response.data.response.numFound / appsPerPage));
        setFilteredApps(response.data.response.docs);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching the apps data", error);
        setLoading(false);
      }
    };

    fetchApps();
  }, [page, searchQuery]);

  useEffect(() => {
    // Filter apps based on the search query
    const results = apps.filter((app) =>
      app.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredApps(results);
  }, [searchQuery, apps]);

  if (loading) {
    return <Loading />; // Use your Loading component here
  }

  return (
    <div className="p-4">
        <h2 className="text-2xl text-green font-bold mb-4">Some apk's you might Miss</h2>
      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search for APKs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border border-orange-300 rounded"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {filteredApps.map((app, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg p-4">
            <img
              src={`https://archive.org/services/img/${app.identifier}`} 
              alt={app.title}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-2">
              <h2 className="text-xl text-green-600 font-bold">{app.title}</h2>
              <p className="text-gray-600 mt-2">{app.creator}</p>
              <p className="text-gray-800 mt-2">{app.description}</p>
              <div className="mt-4">
                {app.identifier && (
                  <a
                    href={`https://archive.org/download/${app.identifier}/${app.identifier}.apk`} // Adjust if necessary
                    download
                    className="inline-block bg-green-500 text-white text-lg font-semibold py-2 px-4 rounded hover:bg-blue-600 transition"
                  >
                    Download
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="bg-green-500 text-white py-2 px-4 rounded disabled:bg-gray-400"
        >
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="bg-green-500 text-white py-2 px-4 rounded disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AppsSection;
