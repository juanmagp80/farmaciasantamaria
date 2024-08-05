import React from 'react';
import BeachVideo from './components/BeachVideo/BeachVideo';
import ContactHeader from './components/ContactHeader/ContactHeader';
import MainHeader from './components/MainHeader/MainHeader';

const Home: React.FC = () => {
  return (
    <div>
      <ContactHeader />
      <MainHeader />
      <BeachVideo />
      <main className="p-4">
        <h2 className="text-xl mb-4">Bienvenidos a la Farmacia Local</h2>
        <p>Encuentra las mejores promociones y noticias de salud aquí.</p>
      </main>
    </div>
  );
};

export default Home;
