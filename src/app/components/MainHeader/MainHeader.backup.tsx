'use client';

import { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { FaHome, FaUsers, FaPhone, FaShoppingCart, FaCog, FaHeartbeat } from 'react-icons/fa';
import { FaPrescriptionBottleAlt } from 'react-icons/fa';

interface MainHeaderProps {
    className?: string;
}

const MainHeader = ({ className = "" }: MainHeaderProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const scrollToSection = (sectionId: string) => {
        if (typeof window !== 'undefined') {
            const element = document.querySelector(sectionId);
            if (element) {
                const headerHeight = 100;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    };

    const handleMenuClick = (href: string) => {
        if (href.startsWith('#')) {
            scrollToSection(href);
        }
        setIsOpen(false);
    };

    const menuItems = [
        { href: "/", label: "Inicio", icon: <FaHome /> },
        { href: "#Servicios", label: "Servicios", icon: <FaHeartbeat /> },
        { href: "#NuestroEquipo", label: "Equipo", icon: <FaUsers /> },
        { href: "/encargos", label: "Encargos", icon: <FaShoppingCart /> },
        { href: "/Reservas", label: "Reservas", icon: <FaCog /> },
        { href: "#Contacto", label: "Contacto", icon: <FaPhone /> }
    ];

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-100 ${className}`}>
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <div className="flex items-center space-x-3 flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                            <FaPrescriptionBottleAlt className="text-white text-2xl" />
                        </div>
                        <div className="hidden sm:block">
                            <h1 className="text-xl font-bold text-gray-800">Farmacia</h1>
                            <p className="text-sm text-blue-600 font-semibold">Santa María</p>
                        </div>
                    </div>

                    {/* Menu Desktop */}
                    <div className="hidden lg:flex items-center space-x-1">
                        {menuItems.map((item, index) => (
                            <button
                                key={item.label}
                                onClick={() => handleMenuClick(item.href)}
                                className="flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                            >
                                <span className="text-lg">{item.icon}</span>
                                <span>{item.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Botón menú móvil */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="lg:hidden w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl flex items-center justify-center text-white shadow-lg"
                    >
                        {isOpen ? <AiOutlineClose className="text-xl" /> : <AiOutlineMenu className="text-xl" />}
                    </button>
                </div>
            </nav>

            {/* Menú móvil */}
            {isOpen && (
                <>
                    <div 
                        className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                        onClick={() => setIsOpen(false)}
                    />
                    
                    <div className="lg:hidden fixed top-0 right-0 h-full w-80 bg-white/95 backdrop-blur-xl shadow-2xl z-50 overflow-y-auto">
                        <div className="p-6 pt-24">
                            <div className="mb-8 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl">
                                <div className="flex items-center space-x-3 mb-3">
                                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                                        <FaPrescriptionBottleAlt className="text-white text-lg" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-800">Farmacia Santa María</h3>
                                        <p className="text-sm text-gray-600">Tu salud es nuestra prioridad</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                {menuItems.map((item) => (
                                    <button
                                        key={item.label}
                                        onClick={() => handleMenuClick(item.href)}
                                        className="w-full flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 hover:bg-gray-50"
                                    >
                                        <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-r from-blue-500 to-green-500 text-white">
                                            <span className="text-xl">{item.icon}</span>
                                        </div>
                                        <div className="flex-1 text-left">
                                            <h4 className="font-semibold">{item.label}</h4>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </header>
    );
};

export default MainHeader;
