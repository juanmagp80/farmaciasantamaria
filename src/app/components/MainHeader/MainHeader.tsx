'use client';

import { useState } from 'react';

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
        setIsOpen(false);
        
        if (href.startsWith('#')) {
            scrollToSection(href);
        } else {
            // Navegación a otras páginas
            if (typeof window !== 'undefined') {
                window.location.href = href;
            }
        }
    };

    const menuItems = [
        { href: "/", label: "🏠 Inicio" },
        { href: "#Servicios", label: "💊 Servicios" },
        { href: "#NuestroEquipo", label: "👥 Equipo" },
        { href: "/encargos", label: "🛒 Encargos" },
        { href: "/Reservas", label: "📅 Reservas" },
        { href: "#Contacto", label: "📞 Contacto" }
    ];

    const headerBgClass = className?.includes('main-header-solid') 
        ? 'bg-gradient-to-br from-blue-50 via-white to-green-50' 
        : 'bg-white';
    
    const textColorClass = className?.includes('main-header-solid') 
        ? 'text-gray-800' 
        : 'text-gray-800';

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 ${headerBgClass} shadow-lg border-b border-gray-200 ${className}`}>
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-24 py-2">
                    <div className="flex items-center space-x-3 flex-shrink-0">
                        <div className="relative flex items-center justify-center">
                            <img
                                src="/santamaria2.png"
                                alt="Farmacia Santa María"
                                className="w-16 sm:w-18 md:w-20 lg:w-24 max-h-20 object-contain transition-all duration-300"
                            />
                        </div>
                        <div className="hidden sm:block">
                            <h1 className={`text-xl font-bold ${textColorClass}`}>Farmacia</h1>
                            <p className={`text-sm font-semibold ${className?.includes('main-header-solid') ? 'text-blue-600' : 'text-blue-600'}`}>Santa María</p>
                        </div>
                    </div>

                    <div className="hidden lg:flex items-center space-x-1">
                        {menuItems.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                onClick={(e) => {
                                    if (item.href.startsWith('#')) {
                                        e.preventDefault();
                                        scrollToSection(item.href);
                                    }
                                }}
                                className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                                    className?.includes('main-header-solid') 
                                        ? 'text-gray-800 hover:bg-blue-100/60 hover:text-blue-700 border border-transparent hover:border-blue-200' 
                                        : 'text-gray-800 hover:bg-gradient-to-r hover:from-blue-50 hover:to-green-50 hover:text-blue-700 border border-transparent hover:border-blue-200'
                                } cursor-pointer`}
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={`lg:hidden w-10 h-10 rounded-xl flex items-center justify-center shadow-lg ${
                            className?.includes('main-header-solid') 
                                ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white hover:from-blue-700 hover:to-green-700' 
                                : 'bg-gradient-to-r from-blue-600 to-green-600 text-white'
                        }`}
                    >
                        {isOpen ? '✕' : '☰'}
                    </button>
                </div>
            </nav>

            {isOpen && (
                <>
                    <div 
                        className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                        onClick={() => setIsOpen(false)}
                    />
                    
                    <div className="lg:hidden fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 overflow-y-auto">
                        <div className="p-6 pt-24">
                            <div className="mb-8 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl">
                                <div className="flex items-center space-x-3 mb-3">
                                    <div className="w-12 h-12 overflow-hidden rounded-lg flex items-center justify-center">
                                        <img
                                            src="/santamaria2.png"
                                            alt="Farmacia Santa María"
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-800">Farmacia Santa María</h3>
                                        <p className="text-sm text-gray-600">Tu salud es nuestra prioridad</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                {menuItems.map((item) => (
                                    <a
                                        key={item.label}
                                        href={item.href}
                                        onClick={(e) => {
                                            if (item.href.startsWith('#')) {
                                                e.preventDefault();
                                                scrollToSection(item.href);
                                            }
                                            setIsOpen(false);
                                        }}
                                        className="w-full flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-green-50 border border-transparent hover:border-blue-200 cursor-pointer"
                                    >
                                        <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg">
                                            <span className="text-xl">{item.label.split(' ')[0]}</span>
                                        </div>
                                        <div className="flex-1 text-left">
                                            <h4 className="font-semibold text-gray-800">{item.label.split(' ').slice(1).join(' ')}</h4>
                                        </div>
                                    </a>
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
