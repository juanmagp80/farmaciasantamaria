"use client";

import emailjs from 'emailjs-com';
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Swal from 'sweetalert2';
import MainHeader from '../components/MainHeader/MainHeader';

export interface CalendarProps {
    onChange?: (value: Date | Date[]) => void;
    value?: Date | Date[];
    minDate?: Date;
    locale?: string;
}

interface Reserva {
    name: string;
    email: string;
    date: string;
    time: string;
}

export default function ReservasPage() {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [date, setDate] = useState<Date>(new Date());
    const [time, setTime] = useState<string>('');
    const [reservedTimes, setReservedTimes] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    useEffect(() => {
        const fetchReservedTimes = async () => {
            const formattedDate = date.toISOString().split('T')[0];
            const response = await fetch(`/api/reservas?date=${formattedDate}`);

            if (!response.ok) {
                console.error('Error fetching reserved times:', response.statusText);
                return;
            }

            const data = await response.json();
            const times = (data?.reservas || []).map((reserva: Reserva) => reserva.time.slice(0, 5));
            setReservedTimes(times);
        };

        fetchReservedTimes();
    }, [date]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (isSubmitting) return;
        setIsSubmitting(true);

        const formattedDate = date.toISOString().split('T')[0];
        const formattedTime = `${time}:00`;

        try {
            const response = await fetch('/api/reservas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    email,
                    date: formattedDate,
                    time: formattedTime
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                Swal.fire({
                    title: 'Error',
                    text: data.error || 'Hubo un problema al crear la reserva.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
                setIsSubmitting(false);
                return;
            }

            setReservedTimes((prevReservedTimes) => [...prevReservedTimes, time]);

            const templateParams = {
                to_name: name,
                to_email: email,
                date: formattedDate,
                time: formattedTime,
                jitsi_link: `https://meet.jit.si/${name}-${Date.now()}`
            };

            try {
                await emailjs.send(
                    process.env.NEXT_PUBLIC_RESERVAS_EMAILJS_SERVICE_ID!,
                    process.env.NEXT_PUBLIC_RESERVAS_EMAILJS_TEMPLATE_ID!,
                    templateParams,
                    process.env.NEXT_PUBLIC_RESERVAS_EMAILJS_USER_ID!
                );

                Swal.fire({
                    title: 'Éxito',
                    text: 'Reserva creada exitosamente. Revisa tu correo.',
                    imageUrl: '/santamaria.png',
                    imageAlt: 'Success Image',
                    confirmButtonText: 'OK'
                });
            } catch (emailError) {
                console.error('Error sending email:', emailError);
                Swal.fire({
                    title: 'Éxito',
                    text: 'Reserva creada, pero hubo un problema al enviar el correo.',
                    icon: 'warning',
                    confirmButtonText: 'OK'
                });
            }
        } catch (error) {
            console.error('Error al crear la reserva:', error);
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al crear la reserva.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const generateTimeSlots = () => {
        const slots: string[] = [];
        const start = new Date();
        start.setHours(10, 0, 0, 0);
        const end = new Date();
        end.setHours(12, 0, 0, 0);

        while (start < end) {
            const timeString = start.toTimeString().split(' ')[0].substring(0, 5);
            slots.push(timeString);
            start.setMinutes(start.getMinutes() + 15);
        }

        return slots;
    };

    const handleDateChange: CalendarProps['onChange'] = (value) => {
        if (Array.isArray(value)) {
            if (value.length > 0 && value[0] !== null) {
                setDate(new Date(value[0] as Date));
            }
        } else if (value !== null) {
            setDate(new Date(value as Date));
        }
        setTime('');
    };

    return (
        <>
            <MainHeader />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 pt-32 pb-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header Section */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-full mb-6">
                            <span className="text-white text-2xl">📅</span>
                        </div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            Consultas Telemáticas
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Programa tu consulta farmacéutica desde la comodidad de tu hogar. 
                            Atención personalizada y profesional.
                        </p>
                    </div>

                    {/* Benefits Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                <span className="text-2xl">⏰</span>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Rápido y Cómodo</h3>
                            <p className="text-gray-600">Consulta desde casa sin esperas ni desplazamientos.</p>
                        </div>
                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                                <span className="text-2xl">👨‍⚕️</span>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Atención Profesional</h3>
                            <p className="text-gray-600">Farmacéuticos colegiados con amplia experiencia.</p>
                        </div>
                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                                <span className="text-2xl">🔒</span>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Confidencial</h3>
                            <p className="text-gray-600">Todas las consultas son privadas y seguras.</p>
                        </div>
                    </div>

                    {/* Booking Form */}
                    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-600 to-green-600 px-8 py-6">
                            <h2 className="text-2xl font-bold text-white">Reservar Cita</h2>
                            <p className="text-blue-100">Completa los datos y selecciona tu horario preferido</p>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Personal Information */}
                                <div className="space-y-6">
                                    <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                                        Información Personal
                                    </h3>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Nombre Completo *
                                        </label>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                            placeholder="Introduce tu nombre completo"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Correo Electrónico *
                                        </label>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            placeholder="tu@email.com"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        />
                                    </div>

                                    {/* Selected appointment info */}
                                    {date && time && (
                                        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                                            <h4 className="font-semibold text-green-800 mb-2">Cita Seleccionada:</h4>
                                            <p className="text-green-700">
                                                📅 {date.toLocaleDateString('es-ES', { 
                                                    weekday: 'long', 
                                                    year: 'numeric', 
                                                    month: 'long', 
                                                    day: 'numeric' 
                                                })}
                                            </p>
                                            <p className="text-green-700">🕐 {time}</p>
                                        </div>
                                    )}
                                </div>

                                {/* Date and Time Selection */}
                                <div className="space-y-6">
                                    <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                                        Fecha y Hora
                                    </h3>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3">
                                            Selecciona una Fecha
                                        </label>
                                        <div className="flex justify-center bg-gray-50 rounded-xl p-4">
                                            <Calendar
                                                onChange={handleDateChange}
                                                value={date}
                                                minDate={new Date()}
                                                locale="es-ES"
                                                className="react-calendar border-none shadow-none"
                                            />
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3">
                                            Horarios Disponibles
                                        </label>
                                        <div className="grid grid-cols-2 gap-3">
                                            {generateTimeSlots().map((slot) => (
                                                <button
                                                    key={slot}
                                                    type="button"
                                                    onClick={() => setTime(slot)}
                                                    disabled={reservedTimes.includes(slot)}
                                                    className={`py-3 px-4 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 ${
                                                        reservedTimes.includes(slot)
                                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed hover:scale-100'
                                                            : time === slot
                                                                ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg'
                                                                : 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200'
                                                    }`}
                                                >
                                                    {slot}
                                                    {reservedTimes.includes(slot) && (
                                                        <span className="block text-xs">Ocupado</span>
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <button 
                                    type="submit" 
                                    disabled={isSubmitting || !name || !email || !time}
                                    className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-4 px-8 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center justify-center">
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                                            Procesando Reserva...
                                        </span>
                                    ) : (
                                        <span className="flex items-center justify-center">
                                            <span className="mr-2">📅</span>
                                            Confirmar Reserva
                                        </span>
                                    )}
                                </button>
                                
                                <p className="text-center text-sm text-gray-500 mt-4">
                                    * Recibirás un email de confirmación con los detalles de tu cita
                                </p>
                            </div>
                        </form>
                    </div>

                    {/* Contact Info */}
                    <div className="mt-12 text-center">
                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 max-w-2xl mx-auto">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">¿Necesitas ayuda?</h3>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a href="tel:+34123456789" className="inline-flex items-center justify-center px-6 py-3 bg-blue-50 text-blue-700 rounded-xl hover:bg-blue-100 transition-colors">
                                    <span className="mr-2">📞</span>
                                    Llamar Farmacia
                                </a>
                                <a href="https://wa.me/+34123456789" className="inline-flex items-center justify-center px-6 py-3 bg-green-50 text-green-700 rounded-xl hover:bg-green-100 transition-colors">
                                    <span className="mr-2">💬</span>
                                    WhatsApp
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
