import React from 'react';
import BeachVideo from './components/BeachVideo/BeachVideo';
import OurTeam from './components/OurTeam/OurTeam';
import PromotionSlider from './components/PromotionSlider/PromotionSlider';
import Services from './components/Services/Services';
import Testimonials from './components/Testimonials/Testimonials';

const Home: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <BeachVideo />
      
      {/* Main Content */}
      <main>
        {/* Services Section */}
        <Services />
        
        {/* Promotions Section */}
        <section className="py-16 bg-gradient-to-r from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <PromotionSlider />
          </div>
        </section>
        
        {/* Team Section */}
        <OurTeam />
        
        {/* Testimonials Section */}
        <Testimonials />
        
        {/* Contact CTA Section */}
        <section className="py-20 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              ¿Necesitas atención farmacéutica?
            </h2>
            <p className="text-xl text-white opacity-90 mb-12 leading-relaxed">
              Estamos aquí para cuidar de tu salud. Contáctanos para cualquier consulta 
              o visítanos en nuestra farmacia en La Cala del Moral.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="/Reservas"
                className="bg-white text-green-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                📅 Reservar Cita Online
              </a>
              <a
                href="/encargos"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-green-600 transition-all duration-300 transform hover:-translate-y-1"
              >
                🛒 Hacer Encargo
              </a>
              <a
                href="https://wa.me/630950016"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-green-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                📱 WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
