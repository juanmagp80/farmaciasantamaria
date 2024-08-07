// send-test-email.mjs
import axios from 'axios';
const apiKey = 'DC69F30C670CC6A91803EEBE91592576879D22AA1A220730F05E2A2CEB05F7A11E742094D0C071A82F8700B64BAC5AA1';  // Reemplaza con tu API Key de Elastic Email

const sendEmail = async () => {
    try {
        const response = await axios.post('https://api.elasticemail.com/v2/email/send', null, {
            params: {
                apikey: apiKey,
                from: 'juangpdev@gmail.com',  // Reemplaza con el remitente
                to: 'juangpdev@gmail.com',    // Reemplaza con el destinatario
                subject: 'Hello World',
                bodyHtml: '<html><body><h1>Welcome</h1><p>This is a test email.</p></body></html>',
                isTransactional: true,
            }
        });

        console.log('Email sent successfully:', response.data);
    } catch (error) {
        console.error('Error sending email:', error.response ? error.response.data : error.message);
    }
};

sendEmail();