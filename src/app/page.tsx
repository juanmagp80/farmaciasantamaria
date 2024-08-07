import React from 'react';
import BeachVideo from './components/BeachVideo/BeachVideo';
import OurTeam from './components/OurTeam/OurTeam';
import PromotionSlider from './components/PromotionSlider/PromotionSlider';


const Home: React.FC = () => {
  return (
    <div>

      <BeachVideo />
      <main className="p-4">

        <PromotionSlider />
        <OurTeam />
      </main>



    </div>
  );
};

export default Home;
