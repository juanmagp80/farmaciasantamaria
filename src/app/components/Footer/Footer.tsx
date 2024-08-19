import React from 'react';
import { FaFacebook, FaInstagram, FaMapMarkerAlt, FaPhone, FaWhatsapp } from 'react-icons/fa';

const ContactHeader: React.FC = () => {
    return (
        <div className="bg-green-500 p-4 text-lg ">
            <div className="container mx-auto text-black flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <span> Apertura: Lunes a Viernes 8:30 a 21:00 - Sabados: 9:00 a 14:00 - Domingos: Cerrado </span>
                    <div className="flex items-center ">
                        {/* WhatsApp Link */}

                        <a
                            href="https://wa.me/644205732"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center transform transition-transform duration-200 hover:scale-80"
                        >
                            <FaWhatsapp className="mr-1" />
                            <span>630 95 00 16</span>
                        </a>
                    </div>
                    <div className="flex items-center ">
                        {/* Phone Link */}
                        <a
                            href="tel:951921399"
                            className="flex items-center "
                        >
                            <FaPhone className="mr-1" />
                            <span>952485849</span>
                        </a>
                    </div>
                    <div className="flex items-center ">
                        {/* Google Maps Link */}
                        <a
                            href="https://www.google.com/maps?q=Avda+M%C3%A1laga+36,+La+cala+del+Moral,+M%C3%A1laga"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center t"
                        >
                            <FaMapMarkerAlt className="mr-1" />
                            <span>Avda Málaga 36, La cala del Moral, Málaga</span>
                        </a>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
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
