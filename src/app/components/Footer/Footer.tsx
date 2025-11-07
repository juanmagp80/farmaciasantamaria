"use client"
import React from 'react';
import { FaFacebook, FaInstagram, FaMapMarkerAlt, FaPhone, FaWhatsapp, FaEnvelope, FaClock, FaHeart, FaCertificate, FaShieldAlt, FaUserMd } from 'react-icons/fa';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-green-900 text-white">
            {/* Sección principal del footer */}
            <div className="container mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    
                    {/* Información de la farmacia */}
                    <div className="space-y-6">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl flex items-center justify-center shadow-lg">
                                <span className="text-white text-2xl">⚕️</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white">Farmacia</h3>
                                <p className="text-blue-300 font-semibold">Santa María</p>
                            </div>
                        </div>
                        <p className="text-gray-300 leading-relaxed">
                            Tu farmacia de confianza en La Cala del Moral. 
                            Comprometidos con tu salud y bienestar desde hace más de una década.
                        </p>
                        <div className="flex items-center space-x-2 text-green-300">
                            <FaCertificate className="w-4 h-4" />
                            <span className="text-sm">Farmacia colegiada y certificada</span>
                        </div>
                    </div>

                    {/* Información de contacto */}
                    <div className="space-y-6">
                        <h4 className="text-lg font-bold text-white mb-4 flex items-center">
                            <FaPhone className="mr-2 text-blue-400" />
                            Contacto
                        </h4>
                        <div className="space-y-4">
                            <a 
                                href="tel:951921399"
                                className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors group"
                            >
                                <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center group-hover:bg-blue-600/40 transition-colors">
                                    <FaPhone className="w-4 h-4 text-blue-400" />
                                </div>
                                <span>951 921 399</span>
                            </a>
                            
                            <a 
                                href="https://wa.me/630950016"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors group"
                            >
                                <div className="w-8 h-8 bg-green-600/20 rounded-lg flex items-center justify-center group-hover:bg-green-600/40 transition-colors">
                                    <FaWhatsapp className="w-4 h-4 text-green-400" />
                                </div>
                                <span>630 950 016</span>
                            </a>
                            
                            <a 
                                href="mailto:info@farmaciasantamaria.com"
                                className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors group"
                            >
                                <div className="w-8 h-8 bg-purple-600/20 rounded-lg flex items-center justify-center group-hover:bg-purple-600/40 transition-colors">
                                    <FaEnvelope className="w-4 h-4 text-purple-400" />
                                </div>
                                <span>info@farmaciasantamaria.com</span>
                            </a>
                        </div>
                    </div>

                    {/* Horarios y ubicación */}
                    <div className="space-y-6">
                        <h4 className="text-lg font-bold text-white mb-4 flex items-center">
                            <FaClock className="mr-2 text-green-400" />
                            Horarios
                        </h4>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-300">Lun - Vie:</span>
                                <span className="text-white font-semibold">8:30 - 21:00</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-300">Sábados:</span>
                                <span className="text-white font-semibold">9:00 - 14:00</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-300">Domingos:</span>
                                <span className="text-red-300 font-semibold">Cerrado</span>
                            </div>
                        </div>
                        
                        <a 
                            href="https://www.google.com/maps?q=Avda+M%C3%A1laga+36,+La+cala+del+Moral,+M%C3%A1laga"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-start space-x-3 text-gray-300 hover:text-white transition-colors group mt-6"
                        >
                            <div className="w-8 h-8 bg-red-600/20 rounded-lg flex items-center justify-center group-hover:bg-red-600/40 transition-colors mt-1">
                                <FaMapMarkerAlt className="w-4 h-4 text-red-400" />
                            </div>
                            <div>
                                <div className="font-semibold">Avda Málaga 36</div>
                                <div className="text-sm">La Cala del Moral, Málaga</div>
                            </div>
                        </a>
                    </div>

                    {/* Servicios y certificaciones */}
                    <div className="space-y-6">
                        <h4 className="text-lg font-bold text-white mb-4 flex items-center">
                            <FaUserMd className="mr-2 text-purple-400" />
                            Servicios
                        </h4>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-2 text-gray-300">
                                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                <span className="text-sm">Consultas telemáticas</span>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-300">
                                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                <span className="text-sm">Encargos online</span>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-300">
                                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                                <span className="text-sm">Asesoramiento farmacéutico</span>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-300">
                                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                                <span className="text-sm">Productos sanitarios</span>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-300">
                                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                <span className="text-sm">Dermofarmacia</span>
                            </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 text-green-300 mt-6">
                            <FaShieldAlt className="w-4 h-4" />
                            <span className="text-sm">Calidad garantizada</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sección de redes sociales y enlaces adicionales */}
            <div className="border-t border-gray-700">
                <div className="container mx-auto px-6 py-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
                        
                        {/* Enlaces rápidos */}
                        <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm">
                            <a href="/" className="text-gray-300 hover:text-white transition-colors">Inicio</a>
                            <a href="/Reservas" className="text-gray-300 hover:text-white transition-colors">Reservas</a>
                            <a href="/encargos" className="text-gray-300 hover:text-white transition-colors">Encargos</a>
                            <a href="/noticias" className="text-gray-300 hover:text-white transition-colors">Noticias</a>
                        </div>

                        {/* Redes sociales */}
                        <div className="flex items-center space-x-6">
                            <span className="text-gray-400 text-sm">Síguenos:</span>
                            <div className="flex space-x-4">
                                <a
                                    href="https://www.facebook.com/search/top?q=farmacia%20santa%20maria%20de%20la%20cala"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center hover:bg-blue-600/40 transition-all duration-300 transform hover:scale-110"
                                >
                                    <FaFacebook className="w-5 h-5 text-blue-400" />
                                </a>
                                <a
                                    href="https://www.instagram.com/farmaciasantamariacb/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 bg-pink-600/20 rounded-lg flex items-center justify-center hover:bg-pink-600/40 transition-all duration-300 transform hover:scale-110"
                                >
                                    <FaInstagram className="w-5 h-5 text-pink-400" />
                                </a>
                                <a
                                    href="https://wa.me/630950016"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center hover:bg-green-600/40 transition-all duration-300 transform hover:scale-110"
                                >
                                    <FaWhatsapp className="w-5 h-5 text-green-400" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright y información legal */}
            <div className="border-t border-gray-700 bg-black/20">
                <div className="container mx-auto px-6 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="flex items-center space-x-2 text-gray-400 text-sm">
                            <span>© {currentYear} Farmacia Santa María.</span>
                            <FaHeart className="w-3 h-3 text-red-400 mx-1" />
                            <span>Hecho con dedicación para tu salud.</span>
                        </div>
                        <div className="flex space-x-6 text-xs text-gray-500">
                            <span>Política de Privacidad</span>
                            <span>•</span>
                            <span>Términos de Servicio</span>
                            <span>•</span>
                            <span>Aviso Legal</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
