'use client';
import { Navbar, NavbarBrand } from '@nextui-org/react';
import React, { useEffect, useRef, useState } from 'react';
import PharmacyCrossIcon from '../PharmacyCrossIcon/PharmacyCrossIcon';

const MainHeader: React.FC = () => {
    const [show, setShow] = useState(true);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [iconPosition, setIconPosition] = useState<{ left: number; top: number }>({ left: 0, top: 0 });
    const menuRef = useRef<HTMLUListElement | null>(null);
    const headerRef = useRef<HTMLDivElement | null>(null);

    const controlNavbar = () => {
        if (typeof window !== 'undefined' && headerRef.current) {
            const headerHeight = headerRef.current.offsetHeight + 8; // header height + top-8
            setShow(window.scrollY === 0 || window.scrollY < headerHeight);
        }
    };

    useEffect(() => {
        const updateIconPosition = () => {
            if (menuRef.current && hoveredIndex !== null) {
                const children = Array.from(menuRef.current.children) as HTMLElement[];
                const activeChild = children[hoveredIndex];
                if (activeChild) {
                    const rect = activeChild.getBoundingClientRect();
                    setIconPosition({
                        left: rect.left + rect.width / 2,
                        top: rect.top - 20, // Ajustar esta cantidad para centrar el icono encima del texto
                    });
                }
            }
        };

        updateIconPosition();
        window.addEventListener('resize', updateIconPosition);

        return () => {
            window.removeEventListener('resize', updateIconPosition);
        };
    }, [hoveredIndex]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', controlNavbar);
            return () => {
                window.removeEventListener('scroll', controlNavbar);
            };
        }
    }, []);

    return (
        <header
            ref={headerRef}
            className={`fixed top-8 left-0 w-full transition-transform duration-500 z-50 ${show ? 'translate-y-0' : '-translate-y-[calc(100%+8px)]'
                } transform bg-black bg-opacity-20 text-white`}
        >
            <Navbar isBordered className="bg-transparent shadow-xl text-white text-xl">
                <div className="container mx-auto flex justify-between items-center">
                    <NavbarBrand>
                        <img src="/santamaria.png" alt="Farmacia Local" className="w-36" />
                    </NavbarBrand>
                    <ul className="flex space-x-4 relative" ref={menuRef}>
                        <li
                            className="relative flex items-center group p-8 rounded hover:bg-gray-400 hover:shadow-lg"
                            onMouseEnter={() => setHoveredIndex(0)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <a href="/" className="text-white text-xl">Inicio</a>
                        </li>
                        <li
                            className="relative flex items-center group p-4 rounded hover:bg-gray-400 hover:shadow-lg"
                            onMouseEnter={() => setHoveredIndex(1)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <a href="#Servicios" className="text-white text-xl">Servicios</a>
                        </li>
                        <li
                            className="relative flex items-center group p-4 rounded hover:bg-gray-400 hover:shadow-lg"
                            onMouseEnter={() => setHoveredIndex(2)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <a href="#NuestroEquipo" className="text-white text-xl">Nuestro Equipo</a>
                        </li>
                        <li
                            className="relative flex items-center group p-4 rounded hover:bg-gray-400 hover:shadow-lg"
                            onMouseEnter={() => setHoveredIndex(3)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <a href="#Contacto" className="text-white text-xl">Contacto</a>
                        </li>
                        <li
                            className="relative flex items-center group p-4 rounded hover:bg-gray-400 hover:shadow-lg"
                            onMouseEnter={() => setHoveredIndex(4)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <a href="/encargos" className="text-white text-xl">Encargos</a>
                        </li>
                        <li
                            className="relative flex items-center group p-4 rounded hover:bg-gray-400 hover:shadow-lg"
                            onMouseEnter={() => setHoveredIndex(5)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <a href="/Reservas" className="text-white text-xl">Consulta Virtual</a>
                        </li>
                    </ul>

                    <div
                        className="absolute transition-all duration-500"
                        style={{
                            left: `${iconPosition.left}px`,
                            top: `${iconPosition.top}px`,
                            transform: 'translate(-50%, -50%)',
                            zIndex: 10,
                        }}
                    >
                        <PharmacyCrossIcon className="w-8 h-8 text-green-500" />
                    </div>
                </div>
            </Navbar>
        </header>
    );
};

export default MainHeader;
