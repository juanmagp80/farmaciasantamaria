import emailjs from 'emailjs-com';

const serviceId = 'tu_service_id';
const templateId = 'tu_template_id';
const userId = 'tu_user_id';

const templateParams = {
    user_name: 'Nombre de prueba',
    user_email: 'test@example.com',
    date: '2024-08-10',
    time: '15:00',
    meetingId: 'meeting123',
};

emailjs.send(serviceId, templateId, templateParams, userId)
    .then(response => console.log('Correo enviado:', response))
    .catch(error => console.error('Error al enviar correo:', error));

