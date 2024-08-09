// src/app/api/reservas/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { date, timeSlot, email } = await req.json();

        // Generar un identificador único para la reunión
        const uniqueMeetingId = `${date}-${timeSlot}-${email}`;
        const meetLink = `https://meet.jit.si/${uniqueMeetingId}`;

        // Aquí podrías agregar la lógica para enviar el enlace de Meet al correo del usuario
        // usando algún servicio de correo como Nodemailer o una API de terceros.

        return NextResponse.json({ message: 'Cita reservada con éxito', meetLink });
    } catch (error) {
        console.error('Error al crear la cita:', error);
        return NextResponse.json({ message: 'Error al crear la cita' }, { status: 500 });
    }
}
