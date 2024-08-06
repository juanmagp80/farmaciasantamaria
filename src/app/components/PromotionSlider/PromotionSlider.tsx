"use client";

import useEmblaCarousel from 'embla-carousel-react';
import React, { useEffect, useRef } from 'react';

const PromotionSlider: React.FC = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
    const autoplayRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (emblaApi) {
            const autoplay = () => {
                autoplayRef.current = setInterval(() => {
                    if (emblaApi) {
                        emblaApi.scrollNext();
                    }
                }, 3000); // Cambia de diapositiva cada 3 segundos
            };

            autoplay();

            return () => {
                if (autoplayRef.current) {
                    clearInterval(autoplayRef.current);
                }
            };
        }
    }, [emblaApi]);

    return (
        <div className="embla">
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                    <div className="embla__slide">
                        <img src="/promociones1.jpg" alt="Promoción 1" />
                    </div>
                    <div className="embla__slide">
                        <img src="/promociones2.png" alt="Promoción 2" />
                    </div>
                    {/* Añade más diapositivas aquí */}
                </div>
            </div>
        </div>
    );
};

export default PromotionSlider;
