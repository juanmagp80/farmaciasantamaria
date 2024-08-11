"use client"
import emailjs from 'emailjs-com';
import { useEffect, useState } from 'react';
import Calendar, { CalendarProps } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function ReservasPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [date, setDate] = useState<Date | null>(null);
    const [time, setTime] = useState('');
    const [message, setMessage] = useState('');
    const [reservedTimes, setReservedTimes] = useState<string[]>([]);

    useEffect(() => {
        if (date) {
            fetch(`/api/reservas?date=${date.toISOString().split('T')[0]}`)
                .then(response => response.json())
                .then(data => setReservedTimes(data.reservedTimes));
        }
    }, [date]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const templateParams = {
            to_name: name,
            to_email: email,
            date: date?.toISOString().split('T')[0],
            time,
            meeting_id: `${name}-${Date.now()}`,
        };

        try {
            await emailjs.send(
                process.env.NEXT_PUBLIC_RESERVAS_EMAILJS_SERVICE_ID!,
                process.env.NEXT_PUBLIC_RESERVAS_EMAILJS_TEMPLATE_ID!,
                templateParams,
                process.env.NEXT_PUBLIC_RESERVAS_EMAILJS_USER_ID!
            );
            setMessage('Reserva creada exitosamente. Revisa tu correo.');
        } catch (error) {
            console.error('Error al enviar el correo:', error);
            setMessage('Hubo un problema al crear la reserva. Verifica tu clave pública y otros parámetros.');
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
            <h1>Reservar una Cita</h1>
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
                    <Calendar
                        onChange={handleDateChange}
                        value={date}
                        minDate={new Date()}
                        locale="es-ES"
                        tileDisabled={({ date }) => date.getDay() === 0 || date.getDay() === 6}
                        className="calendar"
                    />
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