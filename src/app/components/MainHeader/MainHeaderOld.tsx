'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { 
    FaHome, 
    FaCog, 
    FaUsers, 
    FaPhone, 
    FaShoppingCart, 
    FaVideo, 
    FaWhatsapp,
    FaClock,
    FaMapMarkerAlt,
    FaStar,
    FaHeartbeat,
    FaPrescriptionBottleAlt
} from 'react-icons/fa';

interface MainHeaderProps {
    className?: string;
}

// Utilidades del menú
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

const isExternalUrl = (url: string): boolean => {
    return url.startsWith('http://') || url.startsWith('https://') || url.startsWith('mailto:') || url.startsWith('tel:');
};

const getActiveSection = (): number => {
    if (typeof window === 'undefined') return 0;
    
    const sections = ['Servicios', 'NuestroEquipo', 'Contacto'];
    const scrollPosition = window.scrollY + 150;
    
    for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element && element.offsetTop <= scrollPosition) {
            return i + 1;
        }
    }
    
    return 0;
};

const throttle = <T extends (...args: any[]) => any>(
    func: T,
    limit: number
): ((...args: Parameters<T>) => void) => {
    let inThrottle: boolean;
    return function (this: any, ...args: Parameters<T>) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
};

interface MenuItem {
    href: string;
    label: string;
    shortLabel?: string;
    icon: JSX.Element;
    description: string;
    color: string;
    gradient: string;
    isExternal?: boolean;
}

const menuItems: MenuItem[] = [
    { 
        href: "/", 
        label: "Inicio", 
        shortLabel: "Home",
        icon: <FaHome />, 
        description: "Página principal",
        color: "text-blue-600",
        gradient: "from-blue-500 to-blue-600"
    },
    { 
        href: "#Servicios", 
        label: "Servicios", 
        icon: <FaHeartbeat />, 
        description: "Nuestros servicios farmacéuticos",
        color: "text-green-600",
        gradient: "from-green-500 to-green-600"
    },
    { 
        href: "#NuestroEquipo", 
        label: "Nuestro Equipo", 
        shortLabel: "Equipo",
        icon: <FaUsers />, 
        description: "Conoce a nuestro equipo profesional",
        color: "text-indigo-600",
        gradient: "from-indigo-500 to-indigo-600"
    },
    { 
        href: "/encargos", 
        label: "Encargos", 
        icon: <FaShoppingCart />, 
        description: "Realiza tus encargos online",
        color: "text-purple-600",
        gradient: "from-purple-500 to-purple-600"
    },
    { 
        href: "/Reservas", 
        label: "Reservas", 
        icon: <FaCog />, 
        description: "Reserva tu cita",
        color: "text-orange-600",
        gradient: "from-orange-500 to-orange-600"
    },
    { 
        href: "#Contacto", 
        label: "Contacto", 
        icon: <FaPhone />, 
        description: "Ponte en contacto con nosotros",
        color: "text-red-600",
        gradient: "from-red-500 to-red-600"
    }
];

const MainHeader = ({ className = "" }: MainHeaderProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = throttle(() => {
            const currentScrollY = window.scrollY;
            
            // Determinar si debe estar visible
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
            
            // Determinar si está scrolled
            setIsScrolled(currentScrollY > 50);
            
            // Actualizar sección activa
            setActiveSection(getActiveSection());
            
            setLastScrollY(currentScrollY);
        }, 100);

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleMenuClick = (href: string) => {
        if (href.startsWith('#')) {
            scrollToSection(href);
        }
        setIsOpen(false);
    };

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ 
                y: isVisible ? 0 : -100,
                opacity: isVisible ? 1 : 0
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${className} ${
                isScrolled 
                    ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-100' 
                    : 'bg-white/90 backdrop-blur-sm'
            }`}
            ref={menuRef}
        >
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <motion.div 
                        className="flex items-center space-x-3 flex-shrink-0"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                        <div className="relative">
                            <motion.div
                                className="w-12 h-12 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl flex items-center justify-center shadow-lg"
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.6, ease: "easeInOut" }}
                            >
                                <FaPrescriptionBottleAlt className="text-white text-2xl" />
                            </motion.div>
                            <motion.div
                                className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                            </motion.div>
                        </div>
                        <div className="hidden sm:block">
                            <h1 className="text-xl font-bold text-gray-800">Farmacia</h1>
                            <p className="text-sm text-blue-600 font-semibold">Santa María</p>
                        </div>
                    </motion.div>

                    {/* Menu Desktop */}
                    <div className="hidden lg:flex items-center space-x-1">
                        {menuItems.map((item, index) => (
                            <motion.div
                                key={item.label}
                                whileHover={{ y: -2 }}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            >
                                {item.isExternal ? (
                                    <a
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`group relative flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:bg-gradient-to-r hover:${item.gradient} hover:text-white ${
                                            activeSection === index ? 
                                            `bg-gradient-to-r ${item.gradient} text-white shadow-lg` : 
                                            `${item.color} hover:scale-105`
                                        }`}
                                    >
                                        <span className="text-lg">{item.icon}</span>
                                        <span className="hidden xl:inline">{item.label}</span>
                                        <span className="xl:hidden">{item.shortLabel || item.label}</span>
                                        
                                        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                                            {item.description}
                                        </div>
                                    </a>
                                ) : (
                                    <button
                                        onClick={() => handleMenuClick(item.href)}
                                        className={`group relative flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:bg-gradient-to-r hover:${item.gradient} hover:text-white ${
                                            activeSection === index ? 
                                            `bg-gradient-to-r ${item.gradient} text-white shadow-lg` : 
                                            `${item.color} hover:scale-105`
                                        }`}
                                    >
                                        <span className="text-lg">{item.icon}</span>
                                        <span className="hidden xl:inline">{item.label}</span>
                                        <span className="xl:hidden">{item.shortLabel || item.label}</span>
                                        
                                        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                                            {item.description}
                                        </div>
                                    </button>
                                )}
                            </motion.div>
                        ))}
                    </div>

                    {/* Información de contacto (Desktop) */}
                    <div className="hidden xl:flex items-center space-x-6">
                        <motion.div 
                            className="flex items-center space-x-2 text-sm text-gray-600"
                            whileHover={{ scale: 1.05 }}
                        >
                            <FaClock className="text-blue-600" />
                            <div>
                                <div className="font-semibold">L-V: 9:00-21:00</div>
                                <div className="text-xs">S: 9:00-14:00</div>
                            </div>
                        </motion.div>
                        
                        <motion.div 
                            className="flex items-center space-x-2 text-sm text-gray-600"
                            whileHover={{ scale: 1.05 }}
                        >
                            <FaMapMarkerAlt className="text-red-600" />
                            <div>
                                <div className="font-semibold">Calle Principal 123</div>
                                <div className="text-xs">Centro, Ciudad</div>
                            </div>
                        </motion.div>

                        <motion.a
                            href="https://wa.me/+34123456789"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-xl font-medium flex items-center space-x-2 hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <FaWhatsapp className="text-lg" />
                            <span>WhatsApp</span>
                        </motion.a>
                    </div>

                    {/* Botón menú móvil */}
                    <motion.button
                        onClick={() => setIsOpen(!isOpen)}
                        className="lg:hidden relative z-10 w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl flex items-center justify-center text-white shadow-lg"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <AnimatePresence mode="wait">
                            {isOpen ? (
                                <motion.div
                                    key="close"
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <AiOutlineClose className="text-xl" />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="menu"
                                    initial={{ rotate: 90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: -90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <AiOutlineMenu className="text-xl" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.button>
                </div>
            </nav>

            {/* Menú móvil */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                            onClick={() => setIsOpen(false)}
                        />
                        
                        {/* Menú */}
                        <motion.div
                            initial={{ x: "100%", opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: "100%", opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="lg:hidden fixed top-0 right-0 h-full w-80 bg-white/95 backdrop-blur-xl shadow-2xl z-50 overflow-y-auto"
                        >
                            <div className="p-6 pt-24">
                                {/* Información de contacto móvil */}
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
                                    
                                    <div className="space-y-2 text-sm text-gray-600">
                                        <div className="flex items-center space-x-2">
                                            <FaClock className="text-blue-600 w-4 h-4" />
                                            <span>L-V: 9:00-21:00, S: 9:00-14:00</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <FaMapMarkerAlt className="text-red-600 w-4 h-4" />
                                            <span>Calle Principal 123, Centro</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Items del menú */}
                                <div className="space-y-2">
                                    {menuItems.map((item, index) => (
                                        <motion.div
                                            key={item.label}
                                            initial={{ x: 50, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            {item.isExternal ? (
                                                <a
                                                    href={item.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:${item.gradient} hover:text-white group ${
                                                        activeSection === index ? 
                                                        `bg-gradient-to-r ${item.gradient} text-white shadow-lg` : 
                                                        'hover:scale-105'
                                                    }`}
                                                    onClick={() => setIsOpen(false)}
                                                >
                                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                                                        activeSection === index ? 
                                                        'bg-white/20' : 
                                                        `bg-gradient-to-r ${item.gradient} text-white group-hover:bg-white/20`
                                                    }`}>
                                                        <span className="text-xl">{item.icon}</span>
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="font-semibold">{item.label}</h4>
                                                        <p className="text-sm opacity-80">{item.description}</p>
                                                    </div>
                                                </a>
                                            ) : (
                                                <button
                                                    onClick={() => handleMenuClick(item.href)}
                                                    className={`w-full flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:${item.gradient} hover:text-white group ${
                                                        activeSection === index ? 
                                                        `bg-gradient-to-r ${item.gradient} text-white shadow-lg` : 
                                                        'hover:scale-105'
                                                    }`}
                                                >
                                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                                                        activeSection === index ? 
                                                        'bg-white/20' : 
                                                        `bg-gradient-to-r ${item.gradient} text-white group-hover:bg-white/20`
                                                    }`}>
                                                        <span className="text-xl">{item.icon}</span>
                                                    </div>
                                                    <div className="flex-1 text-left">
                                                        <h4 className="font-semibold">{item.label}</h4>
                                                        <p className="text-sm opacity-80">{item.description}</p>
                                                    </div>
                                                </button>
                                            )}
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Botón WhatsApp móvil */}
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                    className="mt-8"
                                >
                                    <a
                                        href="https://wa.me/+34123456789"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-xl font-medium flex items-center justify-center space-x-3 hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <FaWhatsapp className="text-2xl" />
                                        <div className="text-left">
                                            <div className="font-bold">Contactar por WhatsApp</div>
                                            <div className="text-sm opacity-90">Respuesta inmediata</div>
                                        </div>
                                    </a>
                                </motion.div>

                                {/* Rating y testimonios móvil */}
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.7 }}
                                    className="mt-6 p-4 bg-gray-50 rounded-2xl text-center"
                                >
                                    <div className="flex items-center justify-center space-x-1 mb-2">
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar key={i} className="text-yellow-400 text-lg" />
                                        ))}
                                    </div>
                                    <p className="text-sm font-semibold text-gray-800">4.9/5 - Excelente servicio</p>
                                    <p className="text-xs text-gray-600">Basado en 250+ reseñas</p>
                                </motion.div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </motion.header>
    );
};

export default MainHeader;
