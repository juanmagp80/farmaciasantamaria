import emailjs from 'emailjs-com';
import { NextRequest, NextResponse } from 'next/server';

// Aquí podrías usar una base de datos. Para este ejemplo, usaremos un array en memoria.
let reservas: any[] = [];

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');

    const reservasDelDia = reservas.filter((reserva) => reserva.date === date);
    const horasReservadas = reservasDelDia.map((reserva) => reserva.time);

    return NextResponse.json({ reservedTimes: horasReservadas });
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, date, time } = body;

        // Validar que todos los campos estén presentes
        if (!name || !email || !date || !time) {
            return NextResponse.json({ error: 'Todos los campos son obligatorios.' }, { status: 400 });
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
        reservas.push(body);

        return NextResponse.json({ message: 'Reserva creada exitosamente. Revisa tu correo.', data: body });
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        return NextResponse.json({ error: 'Hubo un problema al crear la reserva.' }, { status: 500 });
    }
}