import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
);

oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

export async function POST(req: Request) {
    try {
        const { date, timeSlot, email } = await req.json();

        const [startHour] = timeSlot.split(':').map(Number);
        const start = new Date(date);
        start.setHours(startHour);
        start.setMinutes(0);

        const end = new Date(start);
        end.setMinutes(end.getMinutes() + 15); // Intervalo de 15 minutos

        const event = {
            summary: 'Cita de Farmacia',
            description: 'Cita para atender a un cliente por Google Meet',
            start: {
                dateTime: start.toISOString(),
                timeZone: 'America/Los_Angeles',
            },
            end: {
                dateTime: end.toISOString(),
                timeZone: 'America/Los_Angeles',
            },
            attendees: [{ email }],
            conferenceData: {
                createRequest: {
                    requestId: uuidv4(),
                    conferenceSolutionKey: {
                        type: 'hangoutsMeet',
                    },
                },
            },
        };

        const response = await calendar.events.insert({
            calendarId: 'primary',
            conferenceDataVersion: 1,
            requestBody: event,
        });

        const meetLink = response.data.conferenceData?.entryPoints?.[0]?.uri || '';

        // Aquí implementa la lógica para enviar el correo con el meetLink al cliente

        return NextResponse.json({ message: 'Cita reservada con éxito', meetLink });
    } catch (error) {
        if (error instanceof Error) {
            const errorObj: Error = error;
            console.error('Error al crear el evento:', errorObj.message);
            console.error('Stack Trace:', errorObj.stack);
        }
        if ((error as any).response) {
            console.error('Response data:', (error as any).response.data);
            console.error('Response status:', (error as any).response.status);
            console.error('Response headers:', (error as any).response.headers);
        }
        return NextResponse.json({ message: 'Error al crear la cita' }, { status: 500 });
    }
}
