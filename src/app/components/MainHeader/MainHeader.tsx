"use client"
import React, { useEffect, useRef, useState } from 'react';
import PharmacyCrossIcon from '../PharmacyCrossIcon/PharmacyCrossIcon';

const MainHeader: React.FC = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number>(0);
    const menuRef = useRef<HTMLUListElement | null>(null);
    const [crossPosition, setCrossPosition] = useState<{ left: number, width: number }>({ left: 0, width: 0 });

    useEffect(() => {
        const updateCrossPosition = () => {
            if (menuRef.current) {
                const children = Array.from(menuRef.current.children) as HTMLElement[];
                const activeChild = children[hoveredIndex];
                if (activeChild) {
                    const rect = activeChild.getBoundingClientRect();
                    setCrossPosition({
                        left: rect.left + window.scrollX,
                        width: rect.width
                    });
                }
            }
        };

        updateCrossPosition();
        window.addEventListener('resize', updateCrossPosition);

        return () => {
            window.removeEventListener('resize', updateCrossPosition);
        };
    }, [hoveredIndex]);

    return (
        <header className="bg-white text-black p-2">
            <div className="container mx-auto flex justify-between items-center">
                <img src="/santamaria.png" alt="Farmacia Local" className="w-52" />
                <nav className="relative flex items-center">
                    <ul className="flex space-x-4 relative" ref={menuRef}>
                        <li
                            className="menu-item"
                            onMouseEnter={() => setHoveredIndex(0)}
                            onMouseLeave={() => setHoveredIndex(0)}
                        >
                            <a href="#home" className="text-gray-800 text-2xl">Home</a>
                        </li>
                        <li
                            className="menu-item"
                            onMouseEnter={() => setHoveredIndex(1)}
                            onMouseLeave={() => setHoveredIndex(1)}
                        >
                            <a href="#services" className="text-gray-800 text-2xl">Services</a>
                        </li>
                        <li
                            className="menu-item"
                            onMouseEnter={() => setHoveredIndex(2)}
                            onMouseLeave={() => setHoveredIndex(2)}
                        >
                            <a href="#contact" className="text-gray-800 text-2xl">Contact</a>
                        </li>

                        {/* Cruz de farmacia */}
                        <div
                            className="cross-icon absolute"
                            style={{
                                left: `${crossPosition.left}px`,
                                width: `${crossPosition.width}px`,
                                height: '100%',
                                transform: `translateX(${crossPosition.left}px)` // Ajuste para el deslizamiento
                            }}
                        >
                            <PharmacyCrossIcon className="w-8 h-8 text-green-500" />
                        </div>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default MainHeader;
