"use client"
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const BeachVideo = () => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <div className="relative rounded-lg shadow-2xl w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden">
      {/* Video */}
      <div className="absolute inset-0 overflow-hidden rounded-lg">
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
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="bg-white bg-opacity-20 p-4 sm:p-6 rounded-lg shadow-xl backdrop-blur-md">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-50 mb-4 text-center">
            FARMACIA SANTA MARIA
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-center text-beige-300">
            Cuidamos de tu salud.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default BeachVideo;
