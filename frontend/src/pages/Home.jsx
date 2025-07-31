import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-bounce">
            🎭 QR Street
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Sokak sanatı ve teknoloji birleşen benzersiz deneyim! 
            QR kodlarını okutarak eğlenceli Rick & Morty karakterleriyle tanışın.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <Link
              to="/characters"
              className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-bold hover:bg-blue-50 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              🎲 Rastgele Karakter Gör
            </Link>
            <Link
              to="/about"
              className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-white hover:text-blue-600 transform hover:scale-105 transition-all duration-300"
            >
              📖 Hakkında
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
            ✨ Özellikler
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl hover:shadow-lg transition-shadow">
              <div className="text-6xl mb-4">🎭</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Rick & Morty Karakterleri</h3>
              <p className="text-gray-600">
                826 farklı Rick & Morty karakteri ile tanışın. Her QR kod taraması size yeni bir karakter getirir!
              </p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl hover:shadow-lg transition-shadow">
              <div className="text-6xl mb-4">📱</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">QR Kod Tarama</h3>
              <p className="text-gray-600">
                Sokaktaki QR kodları telefonunuzla okutun ve anında içeriklere erişin. Basit ve hızlı!
              </p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl hover:shadow-lg transition-shadow">
              <div className="text-6xl mb-4">🚀</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Modern Teknoloji</h3>
              <p className="text-gray-600">
                React.js, Spring Boot ve MongoDB ile geliştirilmiş modern web teknolojileri.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Hemen Başlayın! 🎉
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            İlk karakterinizi görmek için sadece bir tık uzaktasınız. 
            Hangi Rick & Morty karakteri ile karşılaşacaksınız?
          </p>
          <Link
            to="/characters"
            className="bg-white text-purple-600 px-10 py-5 rounded-full text-xl font-bold hover:bg-purple-50 transform hover:scale-110 transition-all duration-300 shadow-xl inline-block"
          >
            🎲 İlk Karakterimi Gör
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home; 