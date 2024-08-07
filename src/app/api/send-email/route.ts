// src/app/api/send-email/route.ts

import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    const { nombre, email, telefono, pedido } = await request.json();

    const transporter = nodemailer.createTransport({
        service: 'Gmail', // Puedes usar otros servicios como 'SendGrid', 'Mailgun', etc.
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: 'tu-email@gmail.com',
        to: 'juangpdev@gmail.com',
        subject: 'Nuevo encargo',
        text: `
      Nombre: ${nombre}
      Email: ${email}
      Teléfono: ${telefono}
      Pedido: ${pedido}
    `,
    };

    try {
        await transporter.sendMail(mailOptions);
        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
        console.error('Error enviando el email:', error);
        return new Response(JSON.stringify({ success: false }), { status: 500 });
    }
}
