import emailjs from 'emailjs-com';
import { NextResponse } from 'next/server';

let reservas: any[] = [];

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get('date');

    const reservasDelDia = reservas.filter((reserva) => reserva.date === date);
    const horasReservadas = reservasDelDia.map((reserva) => reserva.time);

    return NextResponse.json({ reservedTimes: horasReservadas });
}

export async function POST(req: Request) {
    try {
        const { name, email, date, time } = await req.json();

        // Verificar si la hora ya está reservada
        const reservasDelDia = reservas.filter((reserva) => reserva.date === date);
        const horasReservadas = reservasDelDia.map((reserva) => reserva.time);
        if (horasReservadas.includes(time)) {
            return NextResponse.json({ error: 'La hora ya está reservada.' }, { status: 400 });
        }

        // Generar el enlace de Jitsi Meet
        const meetingId = `${name}-${Date.now()}`;
        const jitsiLink = `https://meet.jit.si/${meetingId}`;

        const templateParams = {
            to_name: name,
            to_email: email,
            date,
            time,
            meeting_id: meetingId,
            jitsi_link: jitsiLink, // Incluir el enlace de Jitsi Meet
        };

        // Agregar registros de depuración
        console.log('templateParams:', templateParams);

        // Enviar el correo usando EmailJS
        await emailjs.send(
            process.env.NEXT_PUBLIC_RESERVAS_EMAILJS_SERVICE_ID!,
            process.env.NEXT_PUBLIC_RESERVAS_EMAILJS_TEMPLATE_ID!,
            templateParams,
            process.env.NEXT_PUBLIC_RESERVAS_EMAILJS_USER_ID!
        );

        // Guardar la reserva en el array en memoria
        reservas.push({ name, email, date, time });

        return NextResponse.json({ message: 'Reserva creada exitosamente. Revisa tu correo.' });
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        return NextResponse.json({ error: 'Hubo un problema al crear la reserva.' }, { status: 500 });
    }
}