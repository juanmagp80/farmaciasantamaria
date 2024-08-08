"use client"; // Importante para el renderizado del lado del cliente en Next.js

import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

interface Promotion {
    title: string;
    content: string;
    image: string;
}

const PromotionSlider: React.FC = () => {
    const [promotions, setPromotions] = useState<Promotion[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

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
            } finally {
                setLoading(false);
            }
        };

        fetchPromotions();
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center h-64">Cargando...</div>;
    }

    if (promotions.length === 0) {
        return <div className="flex justify-center items-center h-64">No hay promociones disponibles.</div>;
    }

    return (
        <div className="w-full max-w-4xl mx-auto p-5">
            <h1 className="text-3xl font-bold text-center mb-6">Ofertas Especiales</h1>
            <Slider {...settings}>
                {promotions.map((promotion, index) => (
                    <div key={index} className="relative group">
                        <img
                            src={promotion.image}
                            alt={promotion.title}
                            className="w-full h-64 object-cover rounded-lg transition-transform transform group-hover:scale-105"
                        />
                        <div className="absolute bottom-0 left-0 bg-black bg-opacity-60 text-white p-4 rounded-b-lg w-full opacity-0 group-hover:opacity-100 transition-opacity">
                            <h2 className="text-lg font-semibold mb-2">{promotion.title}</h2>
                            <p className="text-sm">{promotion.content}</p>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default PromotionSlider;
