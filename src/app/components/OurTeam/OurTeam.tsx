"use client"
import React, { useState } from 'react';

interface Miembro {
    nombre: string;
    imagen: string;
    cargo: string;
    descripcion: string;
    especialidades?: string[];
}

const miembros: Miembro[] = [
    {
        nombre: 'Mª PILAR ARGAMASILLA',
        imagen: '/pilar.jpeg',
        cargo: 'Farmacéutica Titular',
        descripcion: 'Farmacéutica colegiada con más de 15 años de experiencia en atención farmacéutica y consultoría de salud.',
        especialidades: ['Dermofarmacia', 'Nutrición', 'Homeopatía']
    },
    {
        nombre: 'Mª CRUZ GONZÁLEZ',
        imagen: '/cruz.jpeg',
        cargo: 'Farmacéutica Adjunta',
        descripcion: 'Especialista en farmacia clínica y atención personalizada con amplia experiencia en medicamentos.',
        especialidades: ['Farmacia Clínica', 'Medicamentos', 'Consultoría']
    },
    {
        nombre: 'SILVIA MUÑOZ',
        imagen: '/silvia.jpeg',
        cargo: 'Técnico en Farmacia',
        descripcion: 'Técnico especializado en dispensación y atención al cliente con formación continua.',
        especialidades: ['Dispensación', 'Atención Cliente']
    },
    {
        nombre: 'ROSA TORRES',
        imagen: '/rosa.jpeg',
        cargo: 'Técnico en Farmacia',
        descripcion: 'Profesional dedicada con experiencia en productos sanitarios y parafarmacia.',
        especialidades: ['Parafarmacia', 'Productos Sanitarios']
    },
    {
        nombre: 'BIBIANA GARCIA',
        imagen: '/bibiana.jpeg',
        cargo: 'Técnico en Farmacia',
        descripcion: 'Técnico especializada en cosmética y productos de cuidado personal.',
        especialidades: ['Cosmética', 'Cuidado Personal']
    },
    {
        nombre: 'EUGENIO PEIDRO',
        imagen: '/eugenio.jpeg',
        cargo: 'Técnico en Farmacia',
        descripcion: 'Técnico con amplia experiencia en gestión de stock y productos ortopédicos.',
        especialidades: ['Ortopedia', 'Gestión']
    },
    {
        nombre: 'MARILÓ GAVIÑO',
        imagen: '/marilo.jpeg',
        cargo: 'Técnico en Farmacia',
        descripcion: 'Profesional especializada en fitoterapia y productos naturales.',
        especialidades: ['Fitoterapia', 'Productos Naturales']
    },
];

const Card: React.FC<{ miembro: Miembro; index: number }> = ({ miembro, index }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div
            className="group relative w-full max-w-sm mx-auto bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden cursor-pointer"
            onClick={() => setIsFlipped(!isFlipped)}
            style={{
                animationDelay: `${index * 150}ms`,
                opacity: 0,
                transform: 'translateY(30px)',
                animation: 'fadeInUp 0.8s ease-out forwards'
            }}
        >
            {/* Gradiente decorativo superior */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-green-500 to-blue-600"></div>

            {/* Contenido principal */}
            <div className={`relative transition-transform duration-700 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                {/* Cara frontal */}
                <div className="backface-hidden">
                    <div className="relative">
                        {/* Imagen con overlay */}
                        <div className="relative h-64 overflow-hidden">
                            <img
                                src={miembro.imagen}
                                alt={miembro.nombre}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                            {/* Badge de cargo - movido a la parte inferior */}
                            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full">
                                <span className="text-xs font-semibold text-blue-700">
                                    {miembro.cargo.includes('Farmacéutica') ? '👩‍⚕️' : '👨‍💼'} {miembro.cargo}
                                </span>
                            </div>

                            {/* Indicador de flip */}
                            <div className="absolute bottom-4 right-4 bg-blue-600/80 backdrop-blur-sm text-white p-2 rounded-full">
                                <span className="text-sm">ℹ️</span>
                            </div>
                        </div>

                        {/* Información básica */}
                        <div className="p-6">
                            <h3 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-blue-700 transition-colors">
                                {miembro.nombre}
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                {miembro.descripcion.substring(0, 80)}...
                            </p>

                            {/* Especialidades */}
                            {miembro.especialidades && (
                                <div className="flex flex-wrap gap-1">
                                    {miembro.especialidades.slice(0, 2).map((esp, idx) => (
                                        <span
                                            key={idx}
                                            className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                                        >
                                            {esp}
                                        </span>
                                    ))}
                                    {miembro.especialidades.length > 2 && (
                                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                            +{miembro.especialidades.length - 2}
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Cara trasera */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-blue-50 to-green-50">
                    <div className="p-6 h-full flex flex-col justify-center">
                        <div className="text-center mb-4">
                            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                                <span className="text-2xl text-white">
                                    {miembro.cargo.includes('Farmacéutica') ? '⚕️' : '💼'}
                                </span>
                            </div>
                            <h4 className="font-bold text-lg text-gray-800 mb-1">{miembro.nombre}</h4>
                            <p className="text-blue-600 font-semibold text-sm">{miembro.cargo}</p>
                        </div>

                        <div className="space-y-4">
                            <p className="text-gray-700 text-sm leading-relaxed text-center">
                                {miembro.descripcion}
                            </p>

                            {/* Todas las especialidades */}
                            {miembro.especialidades && (
                                <div>
                                    <h5 className="font-semibold text-gray-800 mb-2 text-center">Especialidades:</h5>
                                    <div className="flex flex-wrap gap-2 justify-center">
                                        {miembro.especialidades.map((esp, idx) => (
                                            <span
                                                key={idx}
                                                className="px-3 py-1 bg-white/80 text-blue-700 text-xs rounded-full border border-blue-200"
                                            >
                                                {esp}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Botón para volver */}
                        <div className="mt-6 text-center">
                            <button
                                className="text-blue-600 text-sm font-semibold hover:text-blue-800 transition-colors"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsFlipped(false);
                                }}
                            >
                                ← Volver
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const OurTeam: React.FC = () => {
    return (
        <section id="NuestroEquipo" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
            <div className="container mx-auto px-4">
                {/* Encabezado mejorado */}
                <div className="text-center mb-16">
                    <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                            <span className="text-3xl text-white">👥</span>
                        </div>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                        Nuestro <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">Equipo</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Profesionales cualificados comprometidos con tu salud y bienestar.
                        Cada miembro de nuestro equipo aporta experiencia y dedicación personal.
                    </p>
                    <div className="mt-6 flex justify-center">
                        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-green-500 rounded-full"></div>
                    </div>
                </div>

                {/* Grid de tarjetas */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {miembros.map((miembro, index) => (
                        <Card key={index} miembro={miembro} index={index} />
                    ))}
                </div>

                {/* Call to action */}
                <div className="mt-16 text-center">
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">
                            ¿Necesitas consulta personalizada?
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Nuestro equipo está aquí para ayudarte con cualquier consulta sobre medicamentos,
                            productos de salud y bienestar.
                        </p>
                        <button className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                            📞 Contactar con nosotros
                        </button>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .preserve-3d {
                    transform-style: preserve-3d;
                }
                
                .backface-hidden {
                    backface-visibility: hidden;
                }
                
                .rotate-y-180 {
                    transform: rotateY(180deg);
                }
            `}</style>
        </section>
    );
};

export default OurTeam;
