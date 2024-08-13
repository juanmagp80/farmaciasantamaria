import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get('date');

    if (!date) {
        return NextResponse.json({ error: 'La fecha es obligatoria.' }, { status: 400 });
    }

    try {
        console.log('Fetching reservations for date:', date);

        const { data: reservasDelDia, error: fetchError } = await supabase
            .from('reservas')
            .select('time')
            .eq('date', date);

        if (fetchError) {
            console.error('Error fetching reservations:', fetchError);
            return NextResponse.json({ error: 'Error al obtener reservas.' }, { status: 500 });
        }

        const reservas = reservasDelDia.map((reserva) => ({
            time: reserva.time.substring(0, 5) // Extraer 'HH:MM'
        }));

        console.log('Reservations fetched:', reservas);

        return NextResponse.json({ reservas });
    } catch (error) {
        console.error('Error al obtener las reservas:', error);
        return NextResponse.json({ error: 'Hubo un problema al obtener las reservas.' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { name, email, date, time } = await req.json();

        console.log('Received data in API:', { name, email, date, time });

        if (!date || !time || !name || !email) {
            console.error('Validation error: Missing required fields');
            return NextResponse.json({ error: 'Todos los campos son obligatorios.' }, { status: 400 });
        }

        if (typeof date !== 'string' || !date.match(/^\d{4}-\d{2}-\d{2}$/)) {
            console.error('Validation error: Invalid date format');
            return NextResponse.json({ error: 'El formato de la fecha es inválido.' }, { status: 400 });
        }

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
