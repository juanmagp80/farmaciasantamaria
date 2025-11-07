// src/app/layout.tsx
"use client"
import { SessionProvider } from 'next-auth/react';
import { Poppins } from 'next/font/google';
import { ReactNode, useEffect } from 'react';
import Modal from 'react-modal';
import '../../src/app/globals.css';
import ContactHeader from './components/ContactHeader/ContactHeader';
import Footer from './components/Footer/Footer';
import GoogleReviewsWidget from './components/GoogleReviewsWidget/GoogleReviewsWidget';
import MainHeader from './components/MainHeader/MainHeader';

const poppins = Poppins({ 
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

interface LayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {

  useEffect(() => {
    Modal.setAppElement('body');
  }, []);

  return (
    <SessionProvider>
      <html lang="es" className="scroll-smooth">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="description" content="Farmacia Santa María - Tu farmacia de confianza en La Cala del Moral. Servicios profesionales, consultas online y atención personalizada." />
          <meta name="keywords" content="farmacia, salud, medicamentos, La Cala del Moral, Málaga, consultas online, encargos" />
          <meta name="author" content="Farmacia Santa María" />
          <link rel="icon" href="/farmacia.png" />
          <title>Farmacia Santa María - Tu Salud, Nuestra Prioridad</title>
        </head>
        <body className={`${poppins.className} antialiased bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen`}>
          <div className="flex flex-col min-h-screen">
            <ContactHeader />
            <MainHeader className="main-header-transparent" />
            <main className="flex-grow">
              {children}
            </main>
            <GoogleReviewsWidget />
            <Footer />
          </div>
        </body>
      </html>
    </SessionProvider>
  );
}