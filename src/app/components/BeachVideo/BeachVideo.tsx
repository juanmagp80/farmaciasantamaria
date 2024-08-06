// src/components/BeachVideo.tsx

const BeachVideo = () => {
  return (
    <div className="relative w-full h-[800px] overflow-hidden">
      {/* Video */}
      <div className="absolute inset-0 overflow-hidden">
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
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="bg-white bg-opacity-20 p-6 rounded-lg shadow-lg backdrop-blur-md">
          <h1 className="text-5xl font-bold text-green-50 mb-4">FARMACIA SANTA MARIA</h1>
          <p className="text-2xl text-center text-beige-300">Tu farmacia de confianza en La Cala del Moral.</p>
        </div>
      </div>

      {/* Fondo estilizado en la parte inferior */}
      <div
        className="absolute bottom-0 left-0 w-full h-[150px] bg-white"
        style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%, 0 100%)' }}
      >
      </div>
    </div>
  );
};

export default BeachVideo;
