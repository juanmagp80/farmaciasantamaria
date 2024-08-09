"use client"
import emailjs from 'emailjs-com';
import { useState } from 'react';

const ReservaCita = () => {
    const [meetLink, setMeetLink] = useState(null);

    const handleReserva = async () => {
        const response = await fetch('/api/reservas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ date: '2024-08-09', timeSlot: '10:00', email: 'cliente@correo.com' }),
        });

        const data = await response.json();
        if (response.ok) {
            setMeetLink(data.meetLink);

            // Enviar el enlace por correo
            sendEmail('cliente@correo.com', data.meetLink);
        } else {
            console.error(data.message);
        }
    };

    const sendEmail = (email: string, meetLink: string) => {
        const templateParams = {
            user_email: email,
            meet_link: meetLink,
        };

        emailjs.send('your_service_id', 'your_template_id', templateParams, 'your_user_id')
            .then((response) => {
                console.log('Correo enviado exitosamente!', response.status, response.text);
            })
            .catch((error) => {
                console.error('Error al enviar el correo:', error);
            });
    };

    return (
        <div>
            <button onClick={handleReserva}>Reservar Cita</button>
            {meetLink && <p>Enlace a la reunión: <a href={meetLink} target="_blank">{meetLink}</a></p>}
        </div>
    );
};

export default ReservaCita;
