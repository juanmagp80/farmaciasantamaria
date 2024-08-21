import React from 'react';
import { FaFacebook, FaInstagram, FaMapMarkerAlt, FaPhone, FaWhatsapp } from 'react-icons/fa';

const ContactHeader: React.FC = () => {
    return (
        <div className="bg-green-600 p-4 text-base md:text-lg">
            <div className="container mx-auto text-white flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
                <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4 w-full lg:w-auto">
                    <span className="w-full text-center md:text-left">
                        Apertura: Lunes a Viernes 8:30 a 21:00 - Sábados: 9:00 a 14:00 - Domingos: Cerrado
                    </span>
                    <div className="flex items-center justify-center md:justify-start w-full lg:w-auto">
                        {/* WhatsApp Link */}
                        <a
                            href="https://wa.me/630950016"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center "
                        >
                            <FaWhatsapp className="mr-1" />
                            <span>630950016</span>
                        </a>
                    </div>
                    <div className="flex items-center justify-center md:justify-start w-full lg:w-auto">
                        {/* Phone Link */}
                        <a
                            href="tel:951921399"
                            className="flex items-center"
                        >
                            <FaPhone className="mr-1" />
                            <span>951921399</span>
                        </a>
                    </div>
                    <div className="flex items-center justify-center md:justify-start w-full lg:w-auto">
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
                <div className="flex items-center space-x-4 w-full lg:w-auto justify-center lg:justify-end">
                    <a
                        href="https://www.facebook.com/search/top?q=farmacia%20santa%20maria%20de%20la%20cala"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transform transition-transform duration-200 hover:scale-110"
                    >
                        <FaFacebook />
                    </a>
                    <a
                        href="https://www.instagram.com/farmaciasantamariacb/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transform transition-transform duration-200 hover:scale-110"
                    >
                        <FaInstagram />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ContactHeader;
