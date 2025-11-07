"use client";

import React, { useEffect, useState } from 'react';

interface Promotion {
    title: string;
    content: string;
    image: string;
}

// Datos de ejemplo para promociones (fuera del componente para evitar dependencias)
const defaultPromotions: Promotion[] = [
    {
        title: "Descuento 20% en Vitaminas",
        content: "Aprovecha nuestra oferta especial en toda la gama de vitaminas y suplementos nutricionales.",
        image: "/uploads/promo1.jpg"
    },
    {
        title: "Consulta Farmacéutica Gratuita",
        content: "Agenda tu consulta personalizada con nuestros farmacéuticos especializados.",
        image: "/uploads/promo2.jpg"
    },
    {
        title: "Productos de Parafarmacia -15%",
        content: "Descuento especial en productos de cosmética y cuidado personal.",
        image: "/uploads/promo3.jpg"
    }
];

const PromotionSlider: React.FC = () => {
    const [promotions, setPromotions] = useState<Promotion[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentSlide, setCurrentSlide] = useState<number>(0);

    useEffect(() => {
        const fetchPromotions = async () => {
            try {
                const response = await fetch('/api/promotions');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const uniquePromotions = Array.from(new Set(data.promotions.map((p: Promotion) => p.image)))
                    .map(image => data.promotions.find((p: Promotion) => p.image === image));
                setPromotions(uniquePromotions as Promotion[]);
            } catch (error) {
                console.error('Error fetching promotions:', error);
                setPromotions(defaultPromotions);
            } finally {
                setLoading(false);
            }
        };

        fetchPromotions();
    }, []);

    useEffect(() => {
        if (promotions.length > 1) {
            const interval = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % promotions.length);
            }, 4000);
            return () => clearInterval(interval);
        }
    }, [promotions.length]);

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '16rem',
                fontSize: '1.125rem',
                color: '#6b7280'
            }}>
                Cargando promociones...
            </div>
        );
    }

    const displayPromotions = promotions.length > 0 ? promotions : defaultPromotions;

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % displayPromotions.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + displayPromotions.length) % displayPromotions.length);
    };

    return (
        <div style={{
            width: '100%',
            maxWidth: '64rem',
            margin: '0 auto',
            padding: '1.25rem'
        }}>
            <h1 style={{
                fontSize: '1.875rem',
                fontWeight: 'bold',
                textAlign: 'center',
                marginBottom: '1.5rem',
                color: '#1f2937'
            }}>
                🎯 Ofertas Especiales
            </h1>
            
            <div style={{
                position: 'relative',
                borderRadius: '0.5rem',
                overflow: 'hidden',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
            }}>
                <div style={{
                    position: 'relative',
                    height: '20rem'
                }}>
                    {displayPromotions.map((promotion, index) => (
                        <div
                            key={index}
                            style={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                opacity: index === currentSlide ? 1 : 0,
                                transition: 'opacity 0.5s ease-in-out'
                            }}
                        >
                            <img
                                src={promotion.image}
                                alt={promotion.title}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover'
                                }}
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5YTNhZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlbiBubyBkaXNwb25ibGU8L3RleHQ+Cjwvc3ZnPg==';
                                }}
                            />
                            <div style={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                                color: 'white',
                                padding: '1.5rem'
                            }}>
                                <h2 style={{
                                    fontSize: '1.25rem',
                                    fontWeight: '600',
                                    marginBottom: '0.5rem'
                                }}>
                                    {promotion.title}
                                </h2>
                                <p style={{
                                    fontSize: '0.875rem',
                                    opacity: 0.9
                                }}>
                                    {promotion.content}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {displayPromotions.length > 1 && (
                    <>
                        {/* Botones de navegación */}
                        <button
                            onClick={prevSlide}
                            style={{
                                position: 'absolute',
                                left: '1rem',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                border: 'none',
                                borderRadius: '50%',
                                width: '3rem',
                                height: '3rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                fontSize: '1.25rem',
                                color: '#374151',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                transition: 'all 0.2s'
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                                e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
                                e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                            }}
                        >
                            ←
                        </button>
                        <button
                            onClick={nextSlide}
                            style={{
                                position: 'absolute',
                                right: '1rem',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                border: 'none',
                                borderRadius: '50%',
                                width: '3rem',
                                height: '3rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                fontSize: '1.25rem',
                                color: '#374151',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                transition: 'all 0.2s'
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                                e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
                                e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                            }}
                        >
                            →
                        </button>

                        {/* Indicadores de puntos */}
                        <div style={{
                            position: 'absolute',
                            bottom: '1rem',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            display: 'flex',
                            gap: '0.5rem'
                        }}>
                            {displayPromotions.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    style={{
                                        width: '0.75rem',
                                        height: '0.75rem',
                                        borderRadius: '50%',
                                        border: 'none',
                                        backgroundColor: index === currentSlide ? '#ffffff' : 'rgba(255, 255, 255, 0.5)',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default PromotionSlider;
