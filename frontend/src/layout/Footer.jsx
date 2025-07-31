import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Proje Bilgisi */}
          <div>
            <h3 className="text-lg font-bold mb-4">🎭 QR Street Project</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Sokak sanatı ve teknoloji birleşen, QR kod aracılığıyla rastgele içerik sunan 
              web tabanlı platform. Eğlenceli karakterler ve motivasyon sözleri keşfedin!
            </p>
          </div>

          {/* Hızlı Linkler */}
          <div>
            <h3 className="text-lg font-bold mb-4">Hızlı Linkler</h3>
            <div className="space-y-2">
              <a href="/" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Ana Sayfa
              </a>
              <a href="/characters" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Karakterler
              </a>
              <a href="/about" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Hakkında
              </a>
            </div>
          </div>

          {/* Teknoloji Stack */}
          <div>
            <h3 className="text-lg font-bold mb-4">Teknoloji</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <span className="text-blue-400">⚛️</span>
                <span className="text-gray-300">React.js</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-400">🍃</span>
                <span className="text-gray-300">Spring Boot</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-500">🍃</span>
                <span className="text-gray-300">MongoDB</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-purple-400">🎨</span>
                <span className="text-gray-300">Tailwind CSS</span>
              </div>
            </div>
          </div>
        </div>

        {/* Alt Çizgi */}
        <div className="border-t border-gray-700 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 QR Street Project. Tüm hakları saklıdır.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <span className="text-gray-400 text-sm">
                Rick & Morty API ile desteklenmektedir
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 