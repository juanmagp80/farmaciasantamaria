"use client";
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { FaQuoteLeft, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface Testimonial {
  name: string;
  location: string;
  rating: number;
  text: string;
  service: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    name: "María González",
    location: "La Cala del Moral",
    rating: 5,
    text: "Excelente atención y profesionalidad. El equipo de la farmacia siempre me ha tratado con mucho cariño y me han resuelto todas mis dudas sobre medicación. Las consultas online son muy convenientes.",
    service: "Consulta Farmacéutica",
    avatar: "/testimonial-1.jpg"
  },
  {
    name: "Carlos Ruiz",
    location: "Rincón de la Victoria",
    rating: 5,
    text: "Los encargos online funcionan perfectamente. Muy rápidos en preparar todo y siempre tienen stock. El servicio de entrega a domicilio me ha salvado muchas veces.",
    service: "Encargos Online",
    avatar: "/testimonial-2.jpg"
  },
  {
    name: "Ana Martín",
    location: "Málaga",
    rating: 5,
    text: "La farmacia más profesional de la zona. Me gusta especialmente cómo explican todo sobre los medicamentos y sus efectos. Transmiten mucha confianza y seguridad.",
    service: "Asesoramiento",
    avatar: "/testimonial-3.jpg"
  },
  {
    name: "José Luis Pérez",
    location: "La Cala del Moral",
    rating: 5,
    text: "Las citas telemáticas son fantásticas, especialmente en estos tiempos. Muy fácil de usar y el trato personal es excelente. Recomiendo esta farmacia al 100%.",
    service: "Consulta Telemática",
    avatar: "/testimonial-4.jpg"
  },
  {
    name: "Carmen López",
    location: "Torre de Benagalbón",
    rating: 5,
    text: "Llevo años siendo cliente y siempre he recibido un trato excepcional. Son muy profesionales y tienen una gran variedad de productos. El equipo es magnífico.",
    service: "Cliente Habitual",
    avatar: "/testimonial-5.jpg"
  }
];

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar
        key={i}
        className={`${i < rating ? 'text-yellow-400' : 'text-gray-300'} text-lg`}
      />
    ));
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Lo que dicen nuestros <span className="text-green-600">clientes</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            La confianza de nuestros clientes es nuestro mayor logro. 
            Conoce las experiencias de quienes ya forman parte de nuestra familia.
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mx-4"
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Avatar and Info */}
              <div className="flex-shrink-0 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 mx-auto">
                  {testimonials[currentIndex].name.charAt(0)}
                </div>
                <h4 className="font-bold text-lg text-gray-900">
                  {testimonials[currentIndex].name}
                </h4>
                <p className="text-gray-600 text-sm">
                  {testimonials[currentIndex].location}
                </p>
                <div className="flex justify-center mt-2 gap-1">
                  {renderStars(testimonials[currentIndex].rating)}
                </div>
              </div>

              {/* Testimonial Content */}
              <div className="flex-1">
                <FaQuoteLeft className="text-3xl text-green-600 mb-4" />
                <p className="text-gray-700 text-lg leading-relaxed mb-6 italic">
                  &ldquo;{testimonials[currentIndex].text}&rdquo;
                </p>
                <div className="bg-green-50 rounded-lg p-3 inline-block">
                  <span className="text-green-700 font-semibold text-sm">
                    Servicio: {testimonials[currentIndex].service}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 text-gray-600 hover:text-green-600"
          >
            <FaChevronLeft className="text-xl" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 text-gray-600 hover:text-green-600"
          >
            <FaChevronRight className="text-xl" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentIndex 
                  ? 'bg-green-600 scale-110' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-8"
        >
          {[
            { number: "15+", label: "Años de experiencia" },
            { number: "5000+", label: "Clientes satisfechos" },
            { number: "98%", label: "Recomendaciones" },
            { number: "24/7", label: "Atención disponible" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;