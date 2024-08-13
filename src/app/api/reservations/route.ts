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

        // Buscar las reservas en la fecha proporcionada
        const { data: reservasDelDia, error: fetchError } = await supabase
            .from('reservas')
            .select('time')
            .eq('date', date);

        if (fetchError) {
            console.error('Error fetching reservations:', fetchError);
            return NextResponse.json({ error: 'Error al obtener reservas.' }, { status: 500 });
        }

        // Asegúrate de que el formato es correcto
        const reservas = reservasDelDia.map((reserva: { time: string }) => ({
            time: reserva.time.split('T')[1].substring(0, 5) // Extraer 'HH:MM'
        }));

        console.log('Reservations fetched:', reservas);

        return NextResponse.json({ reservas });
    } catch (error) {
        console.error('Error al obtener las reservas:', error);
        return NextResponse.json({ error: 'Hubo un problema al obtener las reservas.' }, { status: 500 });
    }
}
