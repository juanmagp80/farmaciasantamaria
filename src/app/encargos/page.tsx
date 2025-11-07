'use client';

import emailjs from 'emailjs-com';
import React, { useEffect, useState } from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';
import Modal from 'react-modal';
import MainHeader from '../components/MainHeader/MainHeader';

const OrdersPage: React.FC = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState<boolean | null>(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [userName, setUserName] = useState('');

    useEffect(() => {

        console.log('USER_ID:', process.env.NEXT_PUBLIC_EMAILJS_USER_ID);
        console.log('SERVICE_ID:', process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID);
        console.log('TEMPLATE_ID:', process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID);
    }, []);

    useEffect(() => {
        console.log('Modal is open:', modalIsOpen);
    }, [modalIsOpen]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);
        setSubmitSuccess(null);

        const form = event.currentTarget;
        const formData = new FormData(form);

        const data = {
            nombre: formData.get('nombre'),
            email: formData.get('email'),
            telefono: formData.get('telefono'),
            pedido: formData.get('pedido'),
        };
        console.log('Form data:', data);

        try {
            const userId = process.env.NEXT_PUBLIC_EMAILJS_USER_ID;
            const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
            const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;

            if (!userId || !serviceId || !templateId) {
                throw new Error("Las variables de entorno de EmailJS no están definidas");
            }

            const response = await emailjs.sendForm(serviceId, templateId, form, userId);

            if (response.status === 200) {
                setSubmitSuccess(true);
                setUserName(data.nombre as string);
                setModalIsOpen(true);
                console.log('Modal should open now');
                form.reset();
            } else {
                setSubmitSuccess(false);
                alert(`Error al enviar el mensaje. Código de estado: ${response.status}`);
            }
        } catch (error) {
            console.error('Error al enviar el mensaje:', error);
            if (error instanceof Error) {
                alert(`Error al enviar el mensaje: ${error.message}`);
            } else if (typeof error === 'object') {
                alert(`Error al enviar el mensaje: ${JSON.stringify(error)}`);
            } else {
                alert('Error al enviar el mensaje: Desconocido');
            }
            setSubmitSuccess(false);
        } finally {
            setIsSubmitting(false);
        }
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <>
            <MainHeader className='main-header-solid' />

            <div className="relative w-full pt-24 min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
                <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: 'url(/interior.png)' }}></div>
                
                <div className="relative z-10 max-w-7xl mx-auto p-4 sm:p-8">
                    {/* Header Section */}
                    <div className="text-center mb-12 mt-20">
                        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                            Solicitar <span className="text-gradient">Encargo</span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Realiza tu pedido de forma cómoda y segura. Te contactaremos para confirmar disponibilidad y coordinar la entrega.
                        </p>
                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-6 max-w-2xl mx-auto">
                            <p className="text-yellow-800">
                                <strong>Nota:</strong> Esta funcionalidad no está operativa para medicamentos con receta médica. Para esos casos, contáctanos directamente.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Formulario Principal */}
                        <div className="lg:col-span-2">
                            <div className="card p-8">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="form-label">
                                                <span className="text-red-500">*</span> Nombre completo
                                            </label>
                                            <input 
                                                name="nombre" 
                                                type="text" 
                                                className="form-input" 
                                                placeholder="Tu nombre completo" 
                                                required 
                                            />
                                        </div>
                                        <div>
                                            <label className="form-label">
                                                <span className="text-red-500">*</span> Email
                                            </label>
                                            <input 
                                                name="email" 
                                                type="email" 
                                                className="form-input" 
                                                placeholder="tu@email.com" 
                                                required 
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="form-label">Teléfono de contacto</label>
                                        <input 
                                            name="telefono" 
                                            type="tel" 
                                            className="form-input" 
                                            placeholder="+34 600 000 000" 
                                        />
                                        <p className="text-sm text-gray-500 mt-1">Opcional, pero recomendado para una comunicación más rápida</p>
                                    </div>

                                    <div>
                                        <label className="form-label">
                                            <span className="text-red-500">*</span> Detalle del pedido
                                        </label>
                                        <textarea 
                                            name="pedido" 
                                            className="form-input" 
                                            placeholder="Describe detalladamente los productos que necesitas: nombre, marca, cantidad, etc." 
                                            rows={6} 
                                            required
                                        ></textarea>
                                        <p className="text-sm text-gray-500 mt-1">
                                            Incluye toda la información posible para procesar tu pedido correctamente
                                        </p>
                                    </div>

                                    <div className="bg-blue-50 rounded-lg p-4">
                                        <h3 className="font-semibold text-blue-800 mb-2">¿Qué puedes encargar?</h3>
                                        <ul className="text-sm text-blue-700 space-y-1">
                                            <li>✓ Productos de parafarmacia</li>
                                            <li>✓ Cosméticos y cuidado personal</li>
                                            <li>✓ Suplementos nutricionales</li>
                                            <li>✓ Productos de higiene</li>
                                            <li>✓ Medicamentos sin receta</li>
                                        </ul>
                                    </div>

                                    <button 
                                        type="submit" 
                                        className={`btn-primary w-full ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Enviando pedido...
                                            </>
                                        ) : (
                                            <>
                                                🛒 Enviar Pedido
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Información de Contacto */}
                        <div className="space-y-6">
                            <div className="card p-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Información de Contacto</h2>
                                
                                <div className="space-y-4">
                                    <a
                                        href="https://www.google.com/maps?q=Avda+M%C3%A1laga+36,+La+Cala+del+Moral,+Rinc%C3%B3n+de+la+Victoria"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        <FaMapMarkerAlt className="text-red-500 text-xl mr-3 flex-shrink-0" />
                                        <div>
                                            <div className="font-semibold text-gray-900">Dirección</div>
                                            <div className="text-gray-600">Avda Málaga 36, La Cala del Moral</div>
                                        </div>
                                    </a>

                                    <a
                                        href="https://wa.me/630950016"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center p-3 rounded-lg hover:bg-green-50 transition-colors"
                                    >
                                        <FaWhatsapp className="text-green-500 text-xl mr-3 flex-shrink-0" />
                                        <div>
                                            <div className="font-semibold text-gray-900">WhatsApp</div>
                                            <div className="text-gray-600">630 95 00 16</div>
                                        </div>
                                    </a>

                                    <a
                                        href="tel:951921399"
                                        className="flex items-center p-3 rounded-lg hover:bg-blue-50 transition-colors"
                                    >
                                        <FaPhoneAlt className="text-blue-500 text-xl mr-3 flex-shrink-0" />
                                        <div>
                                            <div className="font-semibold text-gray-900">Teléfono</div>
                                            <div className="text-gray-600">951 921 399</div>
                                        </div>
                                    </a>

                                    <a
                                        href="mailto:contacto@farmaciasantamaria.com"
                                        className="flex items-center p-3 rounded-lg hover:bg-purple-50 transition-colors"
                                    >
                                        <FaEnvelope className="text-purple-500 text-xl mr-3 flex-shrink-0" />
                                        <div>
                                            <div className="font-semibold text-gray-900">Email</div>
                                            <div className="text-gray-600">contacto@farmaciasantamaria.com</div>
                                        </div>
                                    </a>
                                </div>
                            </div>

                            {/* Horarios */}
                            <div className="card p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Horarios de Atención</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="font-medium">Lunes - Viernes</span>
                                        <span>8:30 - 21:00</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-medium">Sábados</span>
                                        <span>9:00 - 14:00</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-medium">Domingos</span>
                                        <span className="text-red-500">Cerrado</span>
                                    </div>
                                </div>
                            </div>

                            {/* Proceso de pedido */}
                            <div className="card p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">¿Cómo funciona?</h3>
                                <div className="space-y-3">
                                    <div className="flex items-start">
                                        <div className="bg-green-100 text-green-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</div>
                                        <p className="text-sm text-gray-600">Envías tu pedido a través del formulario</p>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="bg-green-100 text-green-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</div>
                                        <p className="text-sm text-gray-600">Verificamos disponibilidad y te contactamos</p>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="bg-green-100 text-green-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</div>
                                        <p className="text-sm text-gray-600">Coordinas recogida o entrega</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Confirmación de Envío"
                    className={`modal ${modalIsOpen ? 'modal-open' : ''}`} // Aplica la clase modal-open si el modal está abierto
                    overlayClassName={`modal-overlay ${modalIsOpen ? 'overlay-open' : ''}`} // Aplica la clase overlay-open si el overlay está abierto
                >
                    <h2 className="text-2xl font-bold mb-4">¡Gracias por tu encargo!</h2>
                    <p className="mb-4">Hola {userName},</p>
                    <p className="mb-4">¡Gracias por tu encargo! Nos pondremos en contacto contigo pronto.</p>
                    <img src="/Designer.png" alt="Gracias" className="mb-4" /> {/* Asegúrate de proporcionar la ruta correcta a la imagen */}
                    <button onClick={closeModal} className="bg-blue-500 text-white p-2 rounded">Cerrar</button>
                </Modal>
            </div>
        </>
    );
};

export default OrdersPage;