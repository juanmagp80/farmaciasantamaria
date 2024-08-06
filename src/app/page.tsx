import React from 'react';
import BeachVideo from './components/BeachVideo/BeachVideo';
import ContactHeader from './components/ContactHeader/ContactHeader';
import MainHeader from './components/MainHeader/MainHeader';
import PromotionSlider from './components/PromotionSlider/PromotionSlider';
const Home: React.FC = () => {
  return (
    <div>

      <ContactHeader />
      <MainHeader />
      <BeachVideo />
      <main className="p-4">

        <PromotionSlider />
      </main>



    </div>
  );
};

export default Home;
