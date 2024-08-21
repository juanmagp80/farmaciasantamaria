"use client"
import { motion, useAnimation } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';

interface Miembro {
    nombre: string;
    imagen: string;
    descripcion: string;
}

const miembros: Miembro[] = [
    {
        nombre: 'Mª PILAR ARGAMASILLA',
        imagen: '/pilar.jpeg',
        descripcion: 'Farmacéutica con más de 10 años de experiencia...'
    },
    {
        nombre: 'Mª CRUZ GONZÁLEZ.',
        imagen: '/cruz.jpeg',
        descripcion: 'Farmacéutica con más de 10 años de experiencia...'
    },
    {
        nombre: 'SILVIA MUÑOZ',
        imagen: '/silvia.jpeg',
        descripcion: 'Técnico en farmacia'
    },
    {
        nombre: 'ROSA TORRES',
        imagen: '/rosa.jpeg',
        descripcion: 'Técnico en farmacia'
    },
    {
        nombre: 'BIBIANA GARCIA',
        imagen: '/bibiana.jpeg',
        descripcion: 'Técnico en farmacia'
    },
    {
        nombre: 'EUGENIO PEIDRO',
        imagen: '/eugenio.jpeg',
        descripcion: 'Técnico en farmacia'
    },
    {
        nombre: 'MARILÓ GAVIÑO',
        imagen: '/marilo.jpeg',
        descripcion: 'Técnico en farmacia'
    },
];

const Card: React.FC<{ miembro: Miembro }> = ({ miembro }) => {
    const [flipped, setFlipped] = useState(false);
    const controls = useAnimation();
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    controls.start({ opacity: 1, y: 0 });
                } else {
                    controls.start({ opacity: 0, y: 100 });
                }
            },
            { threshold: 0.2 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [controls]);

    return (
        <motion.div
            ref={ref}
            className="relative w-full sm:w-80 md:w-64 lg:w-80 h-[400px] cursor-pointer perspective-1000 mx-auto"
            onClick={() => setFlipped(!flipped)}
            initial={{ opacity: 0, y: 100 }}
            animate={controls}
            transition={{ duration: 1, ease: "easeOut" }}
        >
            <div
                className={`absolute w-full h-full transition-transform duration-700 ${flipped ? 'rotate-y-180' : ''}`}
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* Front Side */}
                <div className="absolute w-full h-full backface-hidden flex flex-col items-center justify-center p-4 shadow-lg rounded-lg bg-white border border-gray-200">
                    <motion.img
                        src={miembro.imagen}
                        alt={miembro.nombre}
                        className="w-full h-72 object-cover rounded-lg mb-4"
                        whileHover={{ scale: 1.1 }}
                    />
                    <h2 className="text-lg sm:text-xl font-semibold text-center">{miembro.nombre}</h2>
                </div>
                {/* Back Side */}
                <div className="absolute w-full h-full backface-hidden flex flex-col items-center justify-center p-4 shadow-lg rounded-lg bg-white border border-gray-200 rotate-y-180">
                    <p className="text-sm sm:text-lg text-center">{miembro.descripcion}</p>
                    <img
                        src="/santamaria2.png"
                        alt={miembro.nombre}
                        className="w-20 h-20 sm:w-32 sm:h-32 mt-4"
                    />
                </div>
            </div>
        </motion.div>
    );
};

const NuestroEquipo: React.FC = () => {
    return (
        <div className="relative bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 p-4 sm:p-8 min-h-screen">
            <div className="absolute inset-0 rounded-lg opacity-60 bg-cover bg-center" style={{ backgroundImage: 'url(/interior.png)' }}></div>
            <div className="relative z-10 flex flex-col items-center p-4 sm:p-8">
                <div className="bg-white bg-opacity-20 p-4 sm:p-6 rounded-lg shadow-xl backdrop-blur-md">
                    <h1 className="text-2xl sm:text-4xl font-bold text-gray-700 pb-4 sm:pb-6">Nuestro Equipo</h1>
                </div>
                <div className="flex flex-wrap gap-6 mt-8 justify-center">
                    {miembros.map((miembro, index) => (
                        <Card key={index} miembro={miembro} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NuestroEquipo;
