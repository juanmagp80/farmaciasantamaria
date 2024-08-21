import React from 'react';
import { FaFacebook, FaInstagram, FaMapMarkerAlt, FaPhone, FaWhatsapp } from 'react-icons/fa';

const ContactHeader: React.FC = () => {
  return (
    <div className="bg-gray-600 p-2 text-sm">
      <div className="container mx-auto text-white flex flex-col sm:flex-row justify-between items-center">
        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center">
            {/* WhatsApp Link */}
            <a
              href="https://wa.me/644205732"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
              <FaWhatsapp className="mr-1" />
              <span>630 95 00 16</span>
            </a>
          </div>
          <div className="flex items-center">
            {/* Phone Link */}
            <a
              href="tel:951921399"
              className="flex items-center"
            >
              <FaPhone className="mr-1" />
              <span>952485849</span>
            </a>
          </div>
          <div className="flex items-center">
            {/* Google Maps Link */}
            <a
              href="https://www.google.com/maps?q=Avda+M%C3%A1laga+36,+La+cala+del+Moral,+M%C3%A1laga"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
              <FaMapMarkerAlt className="mr-1" />
              <span>Avda Málaga 36, La cala del Moral, Málaga</span>
            </a>
          </div>
        </div>
        <div className="flex items-center space-x-4 mt-2 sm:mt-0">
          <a
            href="https://www.facebook.com/search/top?q=farmacia%20santa%20maria%20de%20la%20cala"
            target="_blank"
            rel="noopener noreferrer"
            className="transform transition-transform duration-200 hover:scale-150"
          >
            <FaFacebook />
          </a>
          <a
            href="https://www.instagram.com/farmaciasantamariacb/"
            target="_blank"
            rel="noopener noreferrer"
            className="transform transition-transform duration-200 hover:scale-150"
          >
            <FaInstagram />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactHeader;
