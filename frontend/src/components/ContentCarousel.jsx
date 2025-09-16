import { useState, useEffect } from "react";

const ContentCarousel = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

  const fetchRandomContent = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/content/random`);
      if (!response.ok) {
        throw new Error("Failed to fetch content");
      }
      const data = await response.json();
      setContent(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomContent();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
        <div className="text-white text-xl animate-spin">🎭</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center">
        <div className="bg-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error!</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchRandomContent}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-5">
      <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-md w-full text-center transform hover:-translate-y-2 transition-all duration-300">
        <img
          src={content?.imageUrl}
          alt={content?.title}
          className="w-48 h-48 rounded-full mx-auto mb-6 object-cover border-4 border-blue-500 hover:scale-110 hover:rotate-3 transition-all duration-500 cursor-pointer shadow-lg"
        />
        <h2 className="text-2xl font-bold text-gray-800 mb-3 hover:text-blue-600 transition-colors duration-300">
          {content?.title}
        </h2>
        <p className="text-gray-600 mb-6 leading-relaxed">
          {content?.description}
        </p>
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full text-sm inline-block hover:scale-105 transition-transform cursor-pointer shadow-md">
            QR Street Project
          </div>
          <button
            onClick={fetchRandomContent}
            className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-6 py-3 rounded-full text-lg font-bold transform hover:scale-105 transition-all duration-300 shadow-lg"
          >
            🎲 Yeni Karakter Gör
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContentCarousel;
