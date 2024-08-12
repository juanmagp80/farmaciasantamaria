import { createClient } from '@supabase/supabase-js';
import emailjs from 'emailjs-com';
import { NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function POST(req: Request) {
    try {
        const { name, email, date, time } = await req.json();

        // Logging para depuración
        console.log('Received data in API:', { name, email, date, time });
        console.log('Type of date:', typeof date);

        // Verificar si los campos están presentes
        if (!date || !time || !name || !email) {
            console.error('Validation error: Missing required fields');
            return NextResponse.json({ error: 'Todos los campos son obligatorios.' }, { status: 400 });
        }

        // Verificar que 'date' sea un string de fecha válido
        if (typeof date !== 'string' || !date.match(/^\d{4}-\d{2}-\d{2}$/)) {
            console.error('Validation error: Invalid date format');
            return NextResponse.json({ error: 'El formato de la fecha es inválido.' }, { status: 400 });
        }

        // Verificar si la hora ya está reservada
        const { data: reservasDelDia, error: fetchError } = await supabase
            .from('reservas')
            .select('time')
            .eq('date', date);

        if (fetchError) {
            console.error('Error fetching reservations:', fetchError);
            throw fetchError;
        }

        const horasReservadas = reservasDelDia.map((reserva) => reserva.time);
        if (horasReservadas.includes(time)) {
            console.error('Time slot already reserved:', time);
            return NextResponse.json({ error: 'La hora ya está reservada.' }, { status: 400 });
        }

        const meetingId = `${name}-${Date.now()}`;
        const jitsiLink = `https://meet.jit.si/${meetingId}`;

        const templateParams = {
            to_name: name,
            to_email: email,
            date,
            time,
            jitsi_link: jitsiLink,
        };

        // Logging para parámetros del correo
        console.log('Sending email with params:', templateParams);

        // Enviar el correo usando EmailJS
        try {
            await emailjs.send(
                process.env.NEXT_PUBLIC_RESERVAS_EMAILJS_SERVICE_ID!,
                process.env.NEXT_PUBLIC_RESERVAS_EMAILJS_TEMPLATE_ID!,
                templateParams,
                process.env.NEXT_PUBLIC_RESERVAS_EMAILJS_USER_ID!
            );
        } catch (emailError) {
            console.error('Error sending email:', emailError);
            return NextResponse.json({ error: 'Error al enviar el correo.' }, { status: 500 });
        }

        // Guardar la reserva en Supabase
        const { error: insertError } = await supabase
            .from('reservas')
            .insert([{ name, email, date, time }]);

        if (insertError) {
            console.error('Error inserting reservation:', insertError);
            throw insertError;
        }

        return NextResponse.json({ message: 'Reserva creada exitosamente. Revisa tu correo.' });
    } catch (error) {
        console.error('Error al crear la reserva:', error);
        return NextResponse.json({ error: 'Hubo un problema al crear la reserva.' }, { status: 500 });
    }
}
