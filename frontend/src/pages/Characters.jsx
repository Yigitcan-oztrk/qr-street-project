import React from 'react';
import ContentCarousel from '../components/ContentCarousel';

const Characters = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            🎭 Rick & Morty Karakterleri
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
            826 farklı karakter arasından rastgele seçilen karakterlerle tanışın! 
            Her tıklama size yeni bir macera getirir.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="py-8">
        <ContentCarousel />
      </div>

      {/* Info Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            
            <div className="p-6">
              <div className="text-5xl mb-4">🎲</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Rastgele Seçim</h3>
              <p className="text-gray-600">
                Her yenile butonuna bastığınızda sistem 826 karakter arasından 
                rastgele birini seçer ve size sunar.
              </p>
            </div>

            <div className="p-6">
              <div className="text-5xl mb-4">🔄</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Duplicate Prevention</h3>
              <p className="text-gray-600">
                Aynı karakter ikinci kez gösterilmez. Veritabanında kayıtlı olan 
                karakterler öncelik alır.
              </p>
            </div>

            <div className="p-6">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Hızlı Yükleme</h3>
              <p className="text-gray-600">
                Rick & Morty API'den anlık veri çekimi ile 
                karakterler hızlıca yüklenir ve gösterilir.
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* Fun Facts Section */}
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            🤔 Did You Know?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold text-blue-600 mb-3">Karakter Sayısı</h3>
              <p className="text-gray-600">
                Rick and Morty evreninde şu ana kadar <strong>826 farklı karakter</strong> 
                yaratılmış ve API'de mevcut!
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold text-green-600 mb-3">API Integration</h3>
              <p className="text-gray-600">
                Tüm karakter bilgileri <strong>rickandmortyapi.com</strong> 
                servisi üzerinden gerçek zamanlı olarak çekiliyor.
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Characters; 