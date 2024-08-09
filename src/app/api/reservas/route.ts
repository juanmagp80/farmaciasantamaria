import emailjs from 'emailjs-com';

export async function POST(req: Request) {
    try {
        const { date, timeSlot, email } = await req.json();

        // Generar un identificador único para la reunión
        const uniqueMeetingId = `${date}-${timeSlot}-${email}`;
        const meetLink = `https://meet.jit.si/${uniqueMeetingId}`;

        // Configurar los parámetros para EmailJS
        const templateParams = {
            user_email: email,
            meet_link: meetLink,
        };

        // Enviar correo usando EmailJS
        await emailjs.send(
            'your_service_id', // ID del servicio de EmailJS
            'your_template_id', // ID de la plantilla de EmailJS
            templateParams,
            'your_user_id' // Tu user_id de EmailJS
        );

        return Response.json({ message: 'Cita reservada con éxito', meetLink });
    } catch (error) {
        console.error('Error al crear la cita:', error);
        return Response.json({ message: 'Error al crear la cita' }, { status: 500 });
    }
}
