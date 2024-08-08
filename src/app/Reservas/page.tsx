"use client"; // Importante para el renderizado del lado del cliente en Next.js

import axios from 'axios';
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Asegúrate de importar el CSS


const ReservaCita: React.FC = () => {
    const [date, setDate] = useState<Date>(new Date());
    const [timeSlot, setTimeSlot] = useState<string>('');
    const [clientEmail, setClientEmail] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    // Manejar el cambio de fecha

    const handleDateChange = (newDate: Date) => {
        console.log('Nueva fecha seleccionada:', newDate);
        setDate(newDate);
    };

    // Manejar el cambio de la hora
    const handleTimeSlotChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTimeSlot(e.target.value);
    };

    // Manejar el cambio del correo electrónico
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setClientEmail(e.target.value);
    };

    // Enviar el formulario
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await axios.post('/api/reservas', {
                date: date.toISOString(),
                timeSlot,
                email: clientEmail,
            });

            if (response.status === 200) {
                alert('Cita reservada con éxito. Te hemos enviado un enlace de Meet a tu correo.');
            } else {
                alert('Error al reservar la cita.');
            }
        } catch (error) {
            console.error('Error al reservar la cita:', error);
            alert('Error al reservar la cita.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-semibold text-center mb-6">Reserva tu Cita</h1>
            <div className="flex flex-col items-center mb-6">
                <Calendar
                    onChange={handleDateChange}
                    value={date}
                    className="bg-white shadow-lg rounded-lg"
                />
            </div>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 shadow-lg rounded-lg">
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Hora:</label>
                    <select value={timeSlot} onChange={handleTimeSlotChange} className="block w-full mt-1 border-gray-300 rounded-md shadow-sm">
                        <option value="">Selecciona una hora</option>
                        {[...Array(24 * 4)].map((_, i) => {
                            const hour = Math.floor(i / 4);
                            const minute = (i % 4) * 15;
                            const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                            return <option key={time} value={time}>{time}</option>;
                        })}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Correo Electrónico:</label>
                    <input
                        type="email"
                        value={clientEmail}
                        onChange={handleEmailChange}
                        required
                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    {isSubmitting ? 'Reservando...' : 'Reservar Cita'}
                </button>
            </form>
        </div>
    );
};

export default ReservaCita;
