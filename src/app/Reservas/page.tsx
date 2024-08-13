"use client";
import emailjs from 'emailjs-com';
import { useEffect, useState } from 'react';
import Calendar, { CalendarProps } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Swal from 'sweetalert2';

interface Reserva {
    name: string;
    email: string;
    date: string; // Formato 'YYYY-MM-DD'
    time: string; // Formato 'HH:MM:SS'
}

export default function ReservasPage() {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [date, setDate] = useState<Date>(new Date()); // Inicializar con la fecha actual
    const [time, setTime] = useState<string>('');
    const [reservedTimes, setReservedTimes] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false); // Estado para controlar el envío

    useEffect(() => {
        const fetchReservedTimes = async () => {
            const formattedDate = date.toISOString().split('T')[0];
            console.log('Fetching reserved times for date:', formattedDate);

            const response = await fetch(`/api/reservas?date=${formattedDate}`);

            if (!response.ok) {
                console.error('Error fetching reserved times:', response.statusText);
                return;
            }

            const data = await response.json();
            const times = (data?.reservas || []).map((reserva: Reserva) => reserva.time.slice(0, 5)); // Extraer solo 'HH:MM'
            setReservedTimes(times);
        };

        fetchReservedTimes();
    }, [date]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (isSubmitting) return;
        setIsSubmitting(true);

        const formattedDate = date.toISOString().split('T')[0];
        const formattedTime = `${time}:00`; // Convertir a 'HH:MM:SS'

        console.log('Submitting reservation with data:', { name, email, date: formattedDate, time: formattedTime });

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

            console.log('Response status:', response.status);
            const data = await response.json();
            console.log('Response data:', data);

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

            // Enviar el correo usando EmailJS
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
                    imageUrl: '/santamaria.png', // Cambia esta URL por la de tu imagen
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
            <h1 className='text-2xl text-3d text-center mb-4'>Reservar una Cita Telemática</h1>
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
                <div className="reservas-container">

                    <div className="calendar-container">
                        <Calendar
                            onChange={handleDateChange}
                            value={date}
                            minDate={new Date()}
                            locale="es-ES"
                            className="react-calendar" // Asegúrate de usar esta clase para aplicar los estilos personalizados
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
                <button type="submit" className="submit-button" disabled={isSubmitting}>
                    {isSubmitting ? 'Enviando...' : 'Reservar'}
                </button>
            </form>
        </div>
    );
}
