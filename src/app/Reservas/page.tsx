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
            <MainHeader className='main-header-transparent' />
            <div className="flex flex-col items-center p-4 sm:p-8 bg-gray-100 min-h-screen mt-28">

                <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">Reservar una Cita Telemática</h1>
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                    <div className="mb-4">
                        <label className="block text-gray-700">Nombre:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="mt-1 block w-full p-2 border rounded-md border-gray-300"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 block w-full p-2 border rounded-md border-gray-300"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Fecha:</label>
                        <div className="w-full flex justify-center">
                            <Calendar
                                onChange={handleDateChange}
                                value={date}
                                minDate={new Date()}
                                locale="es-ES"
                                className="react-calendar w-full max-w-md"
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Hora:</label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {generateTimeSlots().map((slot) => (
                                <button
                                    key={slot}
                                    type="button"
                                    onClick={() => setTime(slot)}
                                    disabled={reservedTimes.includes(slot)}
                                    className={`py-2 px-4 rounded-md border transition-all duration-150 ease-in-out
                                    ${reservedTimes.includes(slot)
                                            ? 'bg-gray-400 text-white cursor-not-allowed'
                                            : 'bg-blue-500 text-white hover:bg-blue-600'} 
                                    ${time === slot
                                            ? 'bg-green-600 text-white'
                                            : 'bg-blue-500 text-white hover:bg-blue-600'} 
                                    focus:outline-none focus:ring-2 focus:ring-blue-700 active:bg-green-700`}
                                >
                                    {slot}
                                </button>
                            ))}
                        </div>
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md" disabled={isSubmitting}>
                        {isSubmitting ? 'Enviando...' : 'Reservar'}
                    </button>
                </form>
            </div>
        </>
    );
}
