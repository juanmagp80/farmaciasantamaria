"use client"
import emailjs from 'emailjs-com';
import { useEffect, useState } from 'react';
import Calendar, { CalendarProps } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function ReservasPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [date, setDate] = useState<Date>(new Date()); // Inicializar con la fecha actual
    const [time, setTime] = useState('');
    const [message, setMessage] = useState('');
    const [reservedTimes, setReservedTimes] = useState<string[]>([]);
    useEffect(() => {
        const fetchReservedTimes = async () => {
            const formattedDate = date.toISOString().split('T')[0];
            console.log('Fetching reserved times for date:', formattedDate);

            // Hacer la solicitud GET a tu API para obtener las horas reservadas
            const response = await fetch(`/api/reservas?date=${formattedDate}`);

            if (!response.ok) {
                console.error('Error fetching reserved times:', response.statusText);
                return;
            }

            const data = await response.json();

            const times = data?.reservas?.map((item: { time: string }) => item.time) || [];
            setReservedTimes(times);
        };

        fetchReservedTimes();
    }, [date]); // Se ejecutará cada vez que cambie la fecha

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Formatear la fecha correctamente
        const formattedDate = date.toISOString().split('T')[0];

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

            // Enviar el correo usando EmailJS
            const templateParams = {
                to_name: name,
                to_email: email,
                date: formattedDate,
                time,
                jitsi_link: `https://meet.jit.si/${name}-${Date.now()}`
            };

            try {
                await emailjs.send(
                    process.env.NEXT_PUBLIC_RESERVAS_EMAILJS_SERVICE_ID!,
                    process.env.NEXT_PUBLIC_RESERVAS_EMAILJS_TEMPLATE_ID!,
                    templateParams,
                    process.env.NEXT_PUBLIC_RESERVAS_EMAILJS_USER_ID!
                );

                setMessage('Reserva creada exitosamente. Revisa tu correo.');

                // Actualizar el estado de las horas reservadas
                setReservedTimes((prevReservedTimes) => [...prevReservedTimes, time]);
            } catch (emailError) {
                console.error('Error sending email:', emailError);
                setMessage('Reserva creada, pero hubo un problema al enviar el correo.');
            }
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
        console.log('handleDateChange called with value:', value);
        if (Array.isArray(value)) {
            if (value.length > 0 && value[0] !== null) {
                setDate(new Date(value[0] as Date));
            }
        } else if (value !== null) {
            setDate(new Date(value as Date));
        }
        setTime(''); // Limpiar la hora seleccionada al cambiar la fecha
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