"use client";
import emailjs from 'emailjs-com';
import React, { useState } from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';
import Modal from 'react-modal';

// Configura el modal para que use el elemento raíz correcto

const Orders: React.FC = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState<boolean | null>(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [userName, setUserName] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);
        setSubmitSuccess(null);

        const form = event.currentTarget;
        const formData = new FormData(form);

        // Extraer los valores del formulario
        const data = {
            nombre: formData.get('nombre'),
            email: formData.get('email'),
            telefono: formData.get('telefono'),
            pedido: formData.get('pedido'),
        };

        try {
            // Enviar el correo con EmailJS
            const response = await emailjs.sendForm(
                process.env.REACT_APP_EMAILJS_SERVICE_ID!,
                process.env.REACT_APP_EMAILJS_TEMPLATE_ID!,
                form,
                process.env.REACT_APP_EMAILJS_USER_ID!
            );
            if (response.status === 200) {
                setSubmitSuccess(true);
                setUserName(data.nombre as string);
                setModalIsOpen(true); // Abre el modal

                form.reset(); // Limpia el formulario
            } else {
                setSubmitSuccess(false);
                alert(`Error al enviar el mensaje. Código de estado: ${response.status}`);
            }
        } catch (error) {
            console.error('Error al enviar el mensaje:', error);
            if (error instanceof Error) {
                alert(`Error al enviar el mensaje: ${error.message}`);
            } else if (typeof error === 'object') {
                // Mostrar detalles del error si es un objeto
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
        <div className="relative w-full h-screen bg-cover bg-center" style={{ backgroundImage: 'url(/interior.png)' }}>
            <div className="absolute inset-0 bg-black opacity-10"></div> {/* Fondo oscuro para el contraste del texto */}
            <div className="relative z-10 p-8 max-w-5xl mx-auto">
                <div className="bg-white bg-opacity-80 rounded-lg shadow-lg p-8 mt-20"> {/* Fondo blanco con opacidad */}
                    <h1 className="text-3xl font-bold text-uppercase mb-6 text-center">Solicitar encargo
                        (Esta funcionalidad no está operativa para medicamentos)</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            {/* Formulario de contacto */}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-gray-900">Nombre</label>
                                    <input name="nombre" type="text" className="mt-1 block w-full p-2 border rounded" placeholder="Nombre" required />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-900">Email</label>
                                    <input name="email" type="email" className="mt-1 block w-full p-2 border rounded" placeholder="Email" required />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-900">Teléfono</label>
                                    <input name="telefono" type="tel" className="mt-1 block w-full p-2 border rounded" placeholder="Teléfono" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-900">Pedido</label>
                                    <textarea name="pedido" className="mt-1 block w-full p-2 border rounded" placeholder="Escribe tu pedido aquí" rows={4} required></textarea>
                                </div>
                                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded" disabled={isSubmitting}>
                                    {isSubmitting ? 'Enviando...' : 'Enviar'}
                                </button>
                            </form>
                        </div>
                        <div className="space-y-4">
                            {/* Información de contacto */}
                            <h2 className="text-2xl font-semibold">Contacto</h2>
                            <p>
                                <a
                                    href="https://www.google.com/maps?q=Avda+M%C3%A1laga+36,+La+Cala+del+Moral,+Rinc%C3%B3n+de+la+Victoria"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center text-blue-500 underline"
                                >
                                    <FaMapMarkerAlt className="mr-2" />
                                    <strong>Dirección: Avda Málaga 36, La Cala del Moral</strong>
                                </a>
                            </p>
                            <p>
                                <a
                                    href="https://wa.me/630950016"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex text-lg items-center text-green-600"
                                >
                                    <FaWhatsapp className="mr-2" />
                                    <strong>Teléfono Móvil: 630 95 00 16</strong>
                                </a>
                            </p>
                            <p>
                                <a
                                    href="tel:951921399"
                                    className="flex items-center text-gray-800"
                                >
                                    <FaPhoneAlt className="mr-2" />
                                    <strong>Teléfono Fijo: 951921399 </strong>
                                </a>
                            </p>
                            <p>
                                <a
                                    href="mailto:contacto@ejemplo.com"
                                    className="flex items-center text-blue-500 underline"
                                >
                                    <FaEnvelope className="mr-2" />
                                    <strong>Email: contacto@ejemplo.com</strong>
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal */}
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
    );
};

export default Orders;
