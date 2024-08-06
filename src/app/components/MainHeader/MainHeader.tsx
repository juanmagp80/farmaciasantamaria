"use client"
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
                        top: rect.top + window.scrollY - 20 // Adjust this value to move the icon up
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
        <header className="relative bg-white text-black p-2">
            <div className="container mx-auto flex justify-between items-center">
                <img src="/santamaria.png" alt="Farmacia Local" className="w-52" />
                <nav className="relative flex items-center">
                    <ul className="flex space-x-4 relative" ref={menuRef}>
                        <li
                            className="relative flex items-center group"
                            onMouseEnter={() => setHoveredIndex(0)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <a href="#home" className="text-gray-800">Home</a>
                        </li>
                        <li
                            className="relative flex items-center group"
                            onMouseEnter={() => setHoveredIndex(1)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <a href="#services" className="text-gray-800">Services</a>
                        </li>
                        <li
                            className="relative flex items-center group"
                            onMouseEnter={() => setHoveredIndex(2)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <a href="#contact" className="text-gray-800">Contact</a>
                        </li>
                    </ul>
                </nav>
                {/* Cruz de farmacia */}
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
