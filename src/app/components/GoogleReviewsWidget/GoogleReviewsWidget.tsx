"use client"
import React, { useState } from 'react';

interface Review {
    id: string;
    author: string;
    rating: number;
    text: string;
    date: string;
    avatar?: string;
}

const GoogleReviewsWidget: React.FC = () => {
    const [showWidget, setShowWidget] = useState(false);

    // Reviews de ejemplo (en producción vendrían de la API de Google)
    const mockReviews: Review[] = [
        {
            id: '1',
            author: 'María González',
            rating: 5,
            text: 'Excelente atención y profesionalidad. Siempre tienen todo lo que necesito y me asesoran muy bien.',
            date: '2024-10-15',
        },
        {
            id: '2',
            author: 'Carlos Ruiz',
            rating: 5,
            text: 'Farmacia de confianza con un trato muy personalizado. El servicio de consultas online es fantástico.',
            date: '2024-10-12',
        },
        {
            id: '3',
            author: 'Ana Martín',
            rating: 5,
            text: 'Muy profesionales y cercanos. Los encargos online funcionan perfectamente y siempre están puntuales.',
            date: '2024-10-08',
        },
        {
            id: '4',
            author: 'José Luis',
            rating: 4,
            text: 'Gran variedad de productos y precios competitivos. El equipo es muy amable y conocedor.',
            date: '2024-10-05',
        },
        {
            id: '5',
            author: 'Laura Pérez',
            rating: 5,
            text: 'Llevo años viniendo aquí. Siempre me han tratado como a familia. Altamente recomendable.',
            date: '2024-09-28',
        },
        {
            id: '6',
            author: 'Francisco J.',
            rating: 5,
            text: 'Servicio excepcional y horarios muy convenientes. La atención farmacéutica es de primera calidad.',
            date: '2024-09-25',
        }
    ];

    const averageRating = mockReviews.reduce((acc, review) => acc + review.rating, 0) / mockReviews.length;
    const totalReviews = mockReviews.length;

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, index) => (
            <span
                key={index}
                style={{
                    color: index < Math.floor(rating) ? '#fbbf24' : index < rating ? '#fde047' : '#d1d5db',
                    fontSize: '1rem'
                }}
            >
                ★
            </span>
        ));
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-green-50">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                            <span className="text-3xl text-white">⭐</span>
                        </div>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                        Opiniones de <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">Clientes</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        La confianza de nuestros clientes es nuestro mayor logro.
                        Lee lo que dicen sobre nuestra farmacia.
                    </p>

                    {/* Estadísticas de reseñas */}
                    <div className="mt-8 flex justify-center">
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                            <div className="flex items-center justify-center space-x-6">
                                <div className="text-center">
                                    <div className="flex justify-center space-x-1 mb-2">
                                        {renderStars(averageRating)}
                                    </div>
                                    <div className="text-3xl font-bold text-gray-800">{averageRating.toFixed(1)}</div>
                                    <div className="text-sm text-gray-600">Puntuación media</div>
                                </div>
                                <div className="w-px h-16 bg-gray-300"></div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-blue-600">{totalReviews}+</div>
                                    <div className="text-sm text-gray-600">Reseñas verificadas</div>
                                </div>
                                <div className="w-px h-16 bg-gray-300"></div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-green-600">98%</div>
                                    <div className="text-sm text-gray-600">Clientes satisfechos</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Toggle between custom reviews and widget */}
                <div className="text-center mb-8">
                    <div className="inline-flex bg-white/80 backdrop-blur-sm rounded-xl p-2 shadow-lg">
                        <button
                            onClick={() => setShowWidget(false)}
                            className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${!showWidget
                                ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-md'
                                : 'text-gray-600 hover:text-blue-600'
                                }`}
                        >
                            Destacadas
                        </button>
                        <button
                            onClick={() => setShowWidget(true)}
                            className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${showWidget
                                ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-md'
                                : 'text-gray-600 hover:text-blue-600'
                                }`}
                        >
                            Todas las reseñas
                        </button>
                    </div>
                </div>

                {/* Content */}
                {!showWidget ? (
                    <div>
                        {/* Custom Reviews Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                            {mockReviews.map((review, index) => (
                                <div
                                    key={review.id}
                                    className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                                    style={{
                                        animationDelay: `${index * 100}ms`,
                                        opacity: 0,
                                        animation: 'fadeInUp 0.6s ease-out forwards'
                                    }}
                                >
                                    <div className="flex items-start space-x-4 mb-4">
                                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                            {review.author.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-gray-800">{review.author}</h4>
                                            <div className="flex items-center space-x-2">
                                                <div className="flex space-x-1">
                                                    {renderStars(review.rating)}
                                                </div>
                                                <span className="text-sm text-gray-500">
                                                    {formatDate(review.date)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="relative">
                                        <span className="absolute -top-1 -left-1 text-blue-300 text-lg">&ldquo;</span>
                                        <p className="text-gray-700 leading-relaxed pl-6 italic">
                                            &ldquo;{review.text}&rdquo;
                                        </p>
                                    </div>

                                    <div className="mt-4 flex items-center justify-between">
                                        <div className="flex items-center space-x-2 text-green-600">
                                            <span className="text-xs">👍</span>
                                            <span className="text-xs">Reseña verificada</span>
                                        </div>
                                        <span className="text-blue-500">🔍</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Call to Action */}
                        <div className="text-center">
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
                                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                                    ¿Ya has visitado nuestra farmacia?
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    Tu opinión es muy importante para nosotros y para otros clientes.
                                    Comparte tu experiencia en Google.
                                </p>
                                <a
                                    href="https://www.google.com/search?q=farmacia+santa+maria+la+cala+del+moral+malaga&rlz=1C1GCEA_enES1019ES1019&oq=farmacia+santa+maria+la+cala+del+moral+malaga&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIHCAEQIRigATIHCAIQIRigATIHCAMQIRigATIKCAQQIRgWGB0YHjIKCAUQIRgWGB0YHjIKCAYQIRgWGB0YHjIKCAcQIRgWGB0YHjIKCAgQIRgWGB0YHjIKCAkQIRgWGB0YHtIBCDg3ODBqMGo3qAIAsAIA&sourceid=chrome&ie=UTF-8#lrd=0x8da7629f0d096b5:0xc6404bbf6186b96e,3"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                                >
                                    <span>🔍</span>
                                    <span>Escribir reseña en Google</span>
                                    <span>↗️</span>
                                </a>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center">
                        {/* Elfsight Widget */}
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
                            <div className="elfsight-app-5154ee20-02b9-4cab-917c-6da598b18266" data-elfsight-app-lazy></div>
                        </div>
                    </div>
                )}
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
            `}</style>
        </section>
    );
};

export default GoogleReviewsWidget;
