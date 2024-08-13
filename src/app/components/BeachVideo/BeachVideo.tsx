"use client"
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const BeachVideo = () => {
  const { ref, inView } = useInView({
    triggerOnce: false, // Cambia a false para activar cada vez que el componente entra en vista
    threshold: 0.1, // Cuando el 10% del componente esté visible
  });

  return (
    <div className="relative rounded-lg shadow-2xl w-full h-[800px] overflow-hidden">
      {/* Video */}
      <div className="absolute rounded-lg inset-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/beach.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Contenedor con efecto de espejo */}
      <motion.div
        ref={ref}
        className="absolute inset-0 flex items-center justify-center p-4"
        initial={{ opacity: 0, y: 50 }} // Estado inicial
        animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }} // Animación basada en visibilidad
        transition={{ duration: 1, ease: "easeOut" }} // Configuración de la transición
      >
        <div className="bg-white bg-opacity-20 p-6 rounded-lg shadow-xl backdrop-blur-md">
          <h1 className="text-5xl font-bold text-green-50 mb-4">FARMACIA SANTA MARIA</h1>
          <p className="text-2xl text-center text-beige-300">Cuidamos de tu salud.</p>
        </div>
      </motion.div>

      {/* Fondo estilizado en la parte inferior */}

    </div>

  );
};

export default BeachVideo;
