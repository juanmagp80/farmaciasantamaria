"use client";
import { motion } from 'framer-motion';
import React from 'react';
import { 
  FaCapsules, 
  FaUserMd, 
  FaHeart, 
  FaShoppingCart, 
  FaCalendarAlt, 
  FaMicroscope,
  FaBaby,
  FaLeaf 
} from 'react-icons/fa';

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  bgColor: string;
}

const services: Service[] = [
  {
    icon: <FaCapsules className="text-3xl" />,
    title: "Medicamentos",
    description: "Amplio catálogo de medicamentos con receta y de venta libre. Asesoramiento farmacéutico profesional.",
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    icon: <FaUserMd className="text-3xl" />,
    title: "Consultas Farmacéuticas",
    description: "Consultas personalizadas con nuestros farmacéuticos expertos. Resolución de dudas sobre medicación.",
    color: "text-green-600",
    bgColor: "bg-green-50"
  },
  {
    icon: <FaHeart className="text-3xl" />,
    title: "Seguimiento de Salud",
    description: "Control de tensión arterial, glucemia, peso y otros parámetros de salud importantes.",
    color: "text-red-500",
    bgColor: "bg-red-50"
  },
  {
    icon: <FaShoppingCart className="text-3xl" />,
    title: "Encargos Online",
    description: "Realiza tus pedidos de forma cómoda y segura. Recogida en farmacia o entrega a domicilio.",
    color: "text-purple-600",
    bgColor: "bg-purple-50"
  },
  {
    icon: <FaCalendarAlt className="text-3xl" />,
    title: "Citas Telemáticas",
    description: "Consultas virtuales con nuestro equipo. Atención profesional desde tu hogar.",
    color: "text-indigo-600",
    bgColor: "bg-indigo-50"
  },
  {
    icon: <FaMicroscope className="text-3xl" />,
    title: "Análisis Clínicos",
    description: "Análisis rápidos y pruebas de salud. Resultados inmediatos para tu tranquilidad.",
    color: "text-cyan-600",
    bgColor: "bg-cyan-50"
  },
  {
    icon: <FaBaby className="text-3xl" />,
    title: "Pediatría",
    description: "Productos y asesoramiento especializado para el cuidado de bebés y niños.",
    color: "text-pink-500",
    bgColor: "bg-pink-50"
  },
  {
    icon: <FaLeaf className="text-3xl" />,
    title: "Productos Naturales",
    description: "Fitoterapia, suplementos naturales y productos de medicina alternativa.",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50"
  }
];

const Services: React.FC = () => {
  return (
    <section id="Servicios" className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Nuestros <span className="text-green-600">Servicios</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            En Farmacia Santa María ofrecemos una amplia gama de servicios profesionales 
            para cuidar de tu salud y la de tu familia con la máxima calidad y confianza.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                y: -8, 
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              className="group"
            >
              <div className={`${service.bgColor} p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 h-full border border-gray-100`}>
                <div className={`${service.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {service.icon}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                  {service.description}
                </p>

                <div className="mt-6 pt-4 border-t border-gray-200">
                  <button className={`text-sm font-semibold ${service.color} hover:underline transition-all duration-200`}>
                    Más información →
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 md:p-12 text-white shadow-2xl">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              ¿Necesitas ayuda personalizada?
            </h3>
            <p className="text-xl mb-8 opacity-90">
              Nuestro equipo de profesionales está aquí para ayudarte
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/Reservas"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-green-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
              >
                Reservar Consulta
              </motion.a>
              <motion.a
                href="/encargos"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-green-600 transition-colors"
              >
                Hacer Encargo
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;