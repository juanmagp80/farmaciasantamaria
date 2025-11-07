"use client"
import { useEffect, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import Image from 'next/image';

const BeachVideo = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular un breve tiempo de carga para la imagen de fondo
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-green-600 to-blue-800 flex items-center justify-center z-20">
          <div className="text-center text-white">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-white border-t-transparent mx-auto mb-4"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl">🏖️</span>
              </div>
            </div>
            <p className="text-xl font-semibold">Cargando experiencia...</p>
            <p className="text-sm text-blue-200 mt-2">Preparando el ambiente perfecto</p>
          </div>
        </div>
      )}

      {/* Background Image */}
      <div className="absolute inset-0">
        <div className="w-full h-full relative">
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url('/interior.png')`
            }}
          ></div>

          {/* Animación de olas para simular movimiento */}
          <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden">
            <div className="wave wave1"></div>
            <div className="wave wave2"></div>
            <div className="wave wave3"></div>
          </div>
        </div>
      </div>

      {/* Hero Content */}
      <div
        className="absolute inset-0 flex items-center justify-center p-4 z-10"
        style={{
          opacity: 0,
          transform: 'translateY(30px)',
          animation: 'fadeInUp 1s ease-out 0.5s forwards'
        }}
      >
        <div className="text-center text-white max-w-4xl">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-32 h-32 bg-white rounded-full mb-6 shadow-2xl border-4 border-white/30">
              <Image
                src="/santamaria2.png"
                alt="Farmacia Santa María"
                width={96}
                height={96}
                className="object-contain"
              />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Farmacia
            <br />
            <span className="bg-gradient-to-r from-blue-300 to-green-300 bg-clip-text text-transparent">
              Santa María
            </span>
          </h1>

          <p className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed max-w-2xl mx-auto">
            Tu salud y bienestar son nuestra prioridad en La Cala del Moral.
            Profesionalidad, cercanía y confianza desde 2010.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/Reservas"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              📅 Reservar Consulta
            </a>
            <a
              href="/encargos"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/20 backdrop-blur-md text-white font-semibold rounded-xl hover:bg-white/30 transition-all duration-300 transform hover:scale-105 border border-white/30"
            >
              🛒 Hacer Encargo
            </a>
          </div>
        </div>
      </div>

      {/* Botón flotante de WhatsApp */}
      <a
        href="https://wa.me/630950016"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-30 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 animate-pulse hover:animate-none"
        title="Contactar por WhatsApp"
      >
        <FaWhatsapp className="text-2xl" />
      </a>

      {/* Estilo para las olas animadas del fallback */}
      <style jsx>{`
        .wave {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 80px;
          background: linear-gradient(45deg, rgba(59, 130, 246, 0.3), rgba(16, 185, 129, 0.3));
          border-radius: 100% 100% 0 0;
          transform-origin: bottom;
          animation: wave 3s ease-in-out infinite;
        }
        
        .wave1 {
          animation-delay: 0s;
          opacity: 0.8;
        }
        
        .wave2 {
          animation-delay: -1s;
          opacity: 0.6;
          height: 60px;
        }
        
        .wave3 {
          animation-delay: -2s;
          opacity: 0.4;
          height: 40px;
        }
        
        @keyframes wave {
          0%, 100% {
            transform: scaleX(1) scaleY(1);
          }
          50% {
            transform: scaleX(1.2) scaleY(0.8);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default BeachVideo;
