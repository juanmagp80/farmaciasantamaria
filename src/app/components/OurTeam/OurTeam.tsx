"use client";
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';

interface Miembro {
    nombre: string;
    imagen: string;
    descripcion: string;
}

const miembros: Miembro[] = [
    {
        nombre: 'Mª PILAR ARGAMASILLA',
        imagen: '/pilar.jpeg', // Reemplaza con la ruta correcta de tu imagen
        descripcion: 'Farmacéutica con más de 10 años de experiencia...'
    },
    {
        nombre: 'Mª CRUZ GONZÁLEZ.',
        imagen: '/cruz.jpeg', // Reemplaza con la ruta correcta de tu imagen
        descripcion: 'Farmacéutica con más de 10 años de experiencia...'
    },
    {
        nombre: 'SILVIA MUÑOZ',
        imagen: '/silvia.jpeg', // Reemplaza con la ruta correcta de tu imagen
        descripcion: 'Técnico en farmacia'
    },
    {
        nombre: 'ROSA TORRES',
        imagen: '/rosa.jpeg', // Reemplaza con la ruta correcta de tu imagen
        descripcion: 'Técnico en farmacia'
    },
    {
        nombre: 'BIBIANA GARCIA',
        imagen: '/bibiana.jpeg', // Reemplaza con la ruta correcta de tu imagen
        descripcion: 'Técnico en farmacia'
    },
    {
        nombre: 'EUGENIO PEIDRO',
        imagen: '/eugenio.jpeg', // Reemplaza con la ruta correcta de tu imagen
        descripcion: 'Técnico en farmacia'
    },
    {
        nombre: 'MARILÓ GAVIÑO',
        imagen: '/marilo.jpeg', // Reemplaza con la ruta correcta de tu imagen
        descripcion: 'Técnico en farmacia'
    },
    // Añade más miembros según sea necesario
];

const Card: React.FC<{ miembro: Miembro }> = ({ miembro }) => {
    const [flipped, setFlipped] = useState(false);

    return (
        <motion.div
            className="relative w-64 h-80 cursor-pointer perspective-1000"
            onClick={() => setFlipped(!flipped)}
        >
            <div
                className={`absolute w-full h-full transition-transform duration-700 ${flipped ? 'rotate-y-180' : ''}`}
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* Front Side */}
                <div className={`absolute w-full h-full backface-hidden flex flex-col items-center justify-center p-4 shadow-lg rounded-lg bg-white border border-gray-200`}>
                    <motion.img
                        src={miembro.imagen}
                        alt={miembro.nombre}
                        className="w-full h-52 object-cover rounded-lg mb-4"
                        whileHover={{ scale: 1.1 }}
                    />
                    <h2 className="text-xl font-semibold text-center">{miembro.nombre}</h2>
                </div>
                {/* Back Side */}
                <div className={`absolute w-full h-full backface-hidden flex flex-col items-center justify-center p-4 shadow-lg rounded-lg bg-white border border-gray-200 rotate-y-180`}>
                    <p className="text-center text-sm">{miembro.descripcion}</p>
                </div>
            </div>
        </motion.div>
    );
};

const NuestroEquipo: React.FC = () => {
    return (
        <div className="relative bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 p-8">
            <div className="absolute inset-0 opacity-60 bg-cover bg-center" style={{ backgroundImage: 'url(/interior.png)' }}></div>
            <div className="relative z-10 flex flex-col items-center p-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-8">Nuestro Equipo</h1>
                <div className="flex flex-wrap gap-8 justify-center">
                    {miembros.map((miembro, index) => (
                        <Card key={index} miembro={miembro} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NuestroEquipo;
