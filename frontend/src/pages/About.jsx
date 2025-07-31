import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            🎭 QR Street Project Hakkında
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Sokak sanatı ile teknolojinin buluştuğu noktada, QR kodlar aracılığıyla 
            eğlenceli içeriklere erişim sağlayan yenilikçi web platformu.
          </p>
        </div>

        {/* Proje Amacı */}
        <section className="bg-white rounded-xl p-8 shadow-lg mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
            🎯 Proje Amacı
          </h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            QR Street Project, sokak sanatına modern bir dokunuş katarak teknoloji ile sanatı birleştirmeyi amaçlar. 
            Kullanıcılar sokakta karşılaştıkları QR kodları okutarak Rick & Morty evreninden rastgele karakterlerle 
            tanışabilir, eğlenceli bilgiler edinebilir ve günlük yaşamlarına renk katabilirler.
          </p>
        </section>

        {/* Nasıl Çalışır */}
        <section className="bg-white rounded-xl p-8 shadow-lg mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
            ⚙️ Nasıl Çalışır?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">1. QR Kod Tarama</h3>
              <p className="text-gray-600">
                Sokakta bulduğunuz QR kodları telefon kameranızla okutun. 
                Anında web sitemize yönlendirileceksiniz.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-lg">
              <div className="text-4xl mb-4">🎲</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">2. Rastgele İçerik</h3>
              <p className="text-gray-600">
                Sistem otomatik olarak Rick & Morty evreninden rastgele bir karakter seçer 
                ve size özel bilgileri sunar.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg">
              <div className="text-4xl mb-4">💾</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">3. Veri Saklama</h3>
              <p className="text-gray-600">
                Gösterilen karakterler MongoDB veritabanında saklanır, 
                aynı karakter tekrar gösterilmez.
              </p>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-lg">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">4. Güzel Arayüz</h3>
              <p className="text-gray-600">
                Karakter bilgileri modern ve responsive tasarımla, 
                animasyonlu bir arayüzde sunulur.
              </p>
            </div>

          </div>
        </section>

        {/* Teknoloji Stack */}
        <section className="bg-white rounded-xl p-8 shadow-lg mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
            🛠️ Teknoloji Stack
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Frontend */}
            <div>
              <h3 className="text-2xl font-bold text-blue-600 mb-4">Frontend</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">⚛️</span>
                  <div>
                    <strong>React.js v19</strong>
                    <p className="text-gray-600 text-sm">Modern UI library</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🎨</span>
                  <div>
                    <strong>Tailwind CSS</strong>
                    <p className="text-gray-600 text-sm">Utility-first CSS framework</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🧭</span>
                  <div>
                    <strong>React Router</strong>
                    <p className="text-gray-600 text-sm">Client-side routing</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Backend */}
            <div>
              <h3 className="text-2xl font-bold text-green-600 mb-4">Backend</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🍃</span>
                  <div>
                    <strong>Spring Boot</strong>
                    <p className="text-gray-600 text-sm">Java web framework</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🍃</span>
                  <div>
                    <strong>MongoDB</strong>
                    <p className="text-gray-600 text-sm">NoSQL database</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">📡</span>
                  <div>
                    <strong>Rick & Morty API</strong>
                    <p className="text-gray-600 text-sm">External character data</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Geliştirici Notları */}
        <section className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-6 flex items-center">
            👨‍💻 Geliştirici Notları
          </h2>
          <div className="space-y-4 text-lg">
            <p>
              Bu proje, <strong>Spring Boot</strong>, <strong>React.js</strong> ve <strong>MongoDB</strong> 
              teknolojilerini öğrenmek amacıyla geliştirilmiştir.
            </p>
            <p>
              MVP (Minimum Viable Product) yaklaşımı benimsenmiş, 
              önce çalışan bir prototip oluşturulmuş, sonra iyileştirmeler yapılmıştır.
            </p>
            <p>
              Proje aktif olarak <strong>www.qrstreet.io</strong> adresinde canlı hizmet vermektedir. 
              Gerçek QR kodlar sokağa yerleştirilerek test edilmiştir.
            </p>
          </div>
        </section>

      </div>
    </div>
  );
};

export default About; 