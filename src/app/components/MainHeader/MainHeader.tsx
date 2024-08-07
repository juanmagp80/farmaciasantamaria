// src/components/MainHeader.tsx

'use client';
import React, { useEffect, useRef, useState } from 'react';
import PharmacyCrossIcon from '../PharmacyCrossIcon/PharmacyCrossIcon';

const MainHeader: React.FC = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(0); // Start with 0 to default position
    const [iconPosition, setIconPosition] = useState<{ left: number; top: number }>({ left: 0, top: 0 });
    const menuRef = useRef<HTMLUListElement | null>(null);

    useEffect(() => {
        const updateIconPosition = () => {
            if (menuRef.current) {
                const children = Array.from(menuRef.current.children) as HTMLElement[];
                const activeChild = children[hoveredIndex ?? 0];
                if (activeChild) {
                    const rect = activeChild.getBoundingClientRect();
                    setIconPosition({
                        left: rect.left + window.scrollX + rect.width / 2,
                        top: rect.top + window.scrollY - 30 // Adjust this value to move the icon up
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

    return (
        <header className="relative bg-blue-50 text-black rounded shadow-xl p-4">
            <div className="container mx-auto flex justify-between items-center">
                <img src="/santamaria.png" alt="Farmacia Local" className="w-40" />
                <nav className="relative flex items-center">
                    <ul className="flex space-x-4 relative" ref={menuRef}>
                        <li
                            className="relative flex items-center group p-8 rounded hover:bg-gray-200 hover:shadow-lg"
                            onMouseEnter={() => setHoveredIndex(0)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <a href="#Inicio" className="text-gray-800 text-xl">Inicio</a>
                        </li>
                        <li
                            className="relative flex items-center group p-4 rounded hover:bg-gray-200 hover:shadow-lg"
                            onMouseEnter={() => setHoveredIndex(1)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <a href="#Servicios" className="text-gray-800 text-xl">Servicios</a>
                        </li>
                        <li
                            className="relative flex items-center group p-4 rounded hover:bg-gray-200 hover:shadow-lg"
                            onMouseEnter={() => setHoveredIndex(2)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <a href="#NuestroEquipo" className="text-gray-800 text-xl">Nuestro Equipo</a>
                        </li>
                        <li
                            className="relative flex items-center group p-4 rounded hover:bg-gray-200 hover:shadow-lg"
                            onMouseEnter={() => setHoveredIndex(3)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <a href="#Contacto" className="text-gray-800 text-xl">Contacto</a>
                        </li>
                        <li
                            className="relative flex items-center group p-4 rounded hover:bg-gray-200 hover:shadow-lg"
                            onMouseEnter={() => setHoveredIndex(4)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <a href="/encargos" className="text-gray-800 text-xl">Encargos</a>
                        </li>
                    </ul>
                </nav>
                <div
                    className="absolute transition-all duration-500"
                    style={{
                        left: `${iconPosition.left}px`,
                        top: `${iconPosition.top}px`,
                        transform: 'translate(-50%, -50%)',
                        zIndex: 10
                    }}
                >
                    <PharmacyCrossIcon className="w-8 h-8 text-green-500" />
                </div>
            </div>
        </header>
    );
};

export default MainHeader;
