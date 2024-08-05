import React from 'react';
import { FaFacebook, FaInstagram, FaMapMarkerAlt, FaPhone, FaWhatsapp } from 'react-icons/fa';

const ContactHeader: React.FC = () => {
  return (
    <div className="bg-gray-600 p-2 text-sm">
      <div className="container mx-auto text-white flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <FaWhatsapp className="mr-1" />
            <span>+644205732</span>
          </div>
          <div className="flex items-center">
            <FaPhone className="mr-1" />
            <span>952485849</span>
          </div>
          <div className="flex items-center">
            <FaMapMarkerAlt className="mr-1" />
            <span>Avda Málaga 36, La cala del Moral, Málaga</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transform transition-transform duration-200 hover:scale-125"
          >
            <FaFacebook />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="transform transition-transform duration-200 hover:scale-125"
          >
            <FaInstagram />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactHeader;
