"use client"
import { useEffect, useState } from 'react';
import Calendar, { CalendarProps } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { supabase } from '../../../lib/supabaseClient'; // Asegúrate de que la ruta es correcta

export default function ReservasPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [date, setDate] = useState<Date | null>(null);
    const [time, setTime] = useState('');
    const [message, setMessage] = useState('');
    const [reservedTimes, setReservedTimes] = useState<string[]>([]);

    useEffect(() => {
        if (date) {
            const fetchReservedTimes = async () => {
                const { data, error } = await supabase
                    .from('reservas')
                    .select('time')
                    .eq('date', date.toISOString().split('T')[0]);

                if (error) {
                    console.error('Error fetching reserved times:', error);
                    return;
                }

                const times = data?.map((item) => item.time) || [];
                setReservedTimes(times);
            };

            fetchReservedTimes();
        }
    }, [date]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Formatear la fecha correctamente
        const formattedDate = date ? date.toISOString().split('T')[0] : null;

        console.log('Submitting reservation with data:', { name, email, date: formattedDate, time });

        try {
            const response = await fetch('/api/reservas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    email,
                    date: formattedDate,
                    time
                }),
            });

            console.log('Response status:', response.status);
            const data = await response.json();

            console.log('Response data:', data);

            if (!response.ok) {
                setMessage(data.error || 'Hubo un problema al crear la reserva.');
                return;
            }

            setMessage('Reserva creada exitosamente. Revisa tu correo.');
        } catch (error) {
            console.error('Error al crear la reserva:', error);
            setMessage('Hubo un problema al crear la reserva.');
        }
    };


    const generateTimeSlots = () => {
        const slots = [];
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
            setDate(value[0]);
        } else {
            setDate(value);
        }
    };

    return (
        <div className="reservas-container">
            <h1 className='text-2xl text-center mb-4'>Reservar una Cita Telemática</h1>
            <form onSubmit={handleSubmit} className="reservas-form">
                <div className="form-group">
                    <label>Nombre:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label>Fecha:</label>
                    <div className="calendar-container"> {/* Contenedor centrado */}
                        <Calendar
                            onChange={handleDateChange}
                            value={date}
                            minDate={new Date()}
                            locale="es-ES"
                            tileDisabled={({ date }) => date.getDay() === 0 || date.getDay() === 6}
                            className="calendar"
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label>Hora:</label>
                    <div className="time-slots">
                        {generateTimeSlots().map((slot) => (
                            <button
                                key={slot}
                                type="button"
                                onClick={() => setTime(slot)}
                                disabled={reservedTimes.includes(slot)}
                                className={`time-slot-button ${reservedTimes.includes(slot) ? 'disabled' : ''} ${time === slot ? 'selected' : ''}`}
                            >
                                {slot}
                            </button>
                        ))}
                    </div>
                </div>
                <button type="submit" className="submit-button">Reservar</button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
}
