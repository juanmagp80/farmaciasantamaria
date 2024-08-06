"use client";

import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

const PromotionSlider: React.FC = () => {
    const settings = {
        dots: true, // Muestra los puntos de navegación
        infinite: true, // Habilita el desplazamiento infinito
        speed: 400, // Velocidad del desplazamiento
        slidesToShow: 1, // Muestra una diapositiva a la vez
        slidesToScroll: 1, // Desplaza una diapositiva a la vez
        autoplay: true, // Habilita el autoplay
        autoplaySpeed: 3000, // Tiempo entre desplazamientos en ms
    };

    return (
        <div className="w-4/5 max-w-4xl mx-auto bg-cover bg-center rounded-xl p-5" >
            <Slider {...settings}>
                <div>
                    <img src="/promociones1.jpg" alt="Promoción 1" className="w-full h-full object-cover rounded-xl" />
                </div>
                <div>
                    <img src="/promociones2.png" alt="Promoción 2" className="w-full h-full object-cover rounded-xl" />
                </div>
                <div>
                    <img src="/promociones3.jpg" alt="Promoción 1" className="w-full h-full object-cover rounded-xl" />
                </div>
                <div>
                    <img src="/promociones4.jpg" alt="Promoción 1" className="w-full h-full object-cover rounded-xl" />
                </div>
                {/* Añade más diapositivas aquí */}
            </Slider>
        </div>
    );
};

export default PromotionSlider;
