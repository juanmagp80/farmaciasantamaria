// src/components/BeachVideo.tsx

const BeachVideo = () => {
  return (
    <div className="relative w-full h-[800px] overflow-hidden">
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

      <div
        className="absolute bottom-0 left-0 w-full h-[150px] bg-white"
        style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%, 0 100%)' }}
      ></div>
    </div>
  );
};

export default BeachVideo;
