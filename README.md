# 🏥 Farmacia Online - **Farmacia Santa María**

¡Bienvenido al sitio web oficial de **Farmacia Santa María**! Nuestra plataforma no solo ofrece información detallada sobre nuestros servicios y equipo, sino que también permite a nuestros clientes hacer encargos de productos online y reservar citas para consultas de manera rápida y segura.

## 🌟 **Características**

- **🛍️ Información sobre la Farmacia**: Conoce nuestra misión, visión, y los servicios que ofrecemos.
- **👩‍⚕️ Equipo de Profesionales**: Presentamos a nuestro equipo de farmacéuticos y personal especializado.
- **📝 Encargos Online**: Realiza pedidos de productos farmacéuticos a través de un formulario en línea. Recibirás confirmación de tu encargo vía email.
- **📅 Reservas de Citas**: Agenda citas para consultas online con nuestro equipo. Al confirmar la cita, tanto tú como nuestro personal recibirán un enlace automático para una videollamada.
- **💻 Consultas Online**: Asiste a tus consultas desde la comodidad de tu hogar mediante un sistema de videollamadas integrado.

## 💻 **Tecnologías**

- **Frontend**: React
- **Backend**: Next.js (API Routes)
- **Videollamadas**: Integración con servicios de videoconferencia [Jitsi](https://jitsi.org/).
- **Formulario de Encargos**: Gestión de pedidos mediante formularios conectados a una base de datos.
- **Gestión de Citas**: Sistema de reserva y notificación automática por correo electrónico.

## 🚀 **Instalación**

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/juanmagp80/farmaciasantamaria.git
   cd farmaciasantamaria
Instalar las dependencias:

bash
Copiar código
npm install
Configurar variables de entorno:
Crea un archivo .env en la raíz del proyecto con las siguientes variables:

bash
Copiar código
NEXT_PUBLIC_RESERVAS_EMAILJS_SERVICE_ID=your_emailjs_service_id
NEXT_PUBLIC_RESERVAS_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
NEXT_PUBLIC_RESERVAS_EMAILJS_USER_ID=your_emailjs_user_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
NEXT_PUBLIC_EMAILJS_USER_ID=your_emailjs_user_id
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_emailjs_service_id
Ejecutar la aplicación en modo desarrollo:

bash
Copiar código
npm run dev
La aplicación estará disponible en http://localhost:3000.

## 📖 **Uso**

### 🌐 **Navegación**

- **Página Principal**: Información general sobre la farmacia, incluyendo horarios de atención y servicios destacados.
- **Equipo**: Conoce a los miembros del equipo con sus respectivas especialidades.
- **Encargos Online**: Llena el formulario para solicitar productos y recibir confirmación del pedido por correo.
- **Reservar Citas**: Selecciona una fecha y hora para tu consulta. Recibirás un enlace de videollamada automáticamente.

### 📅 **Reservar una Consulta**

1. Selecciona el servicio de consulta en la página de reservas.
2. Elige una fecha y hora disponible.
3. Ingresa tus datos de contacto.
4. Confirma tu cita. Recibirás un enlace de videollamada por correo electrónico.

## 🤝 **Contribuir**

¡Las contribuciones son bienvenidas! Si deseas mejorar este proyecto, sigue estos pasos:

1. Haz un **fork** del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -m 'Añadir nueva funcionalidad'`).
4. Envía tus cambios al repositorio remoto (`git push origin feature/nueva-funcionalidad`).
5. Abre un **Pull Request**.

## 📜 **Licencia**

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo [LICENSE](./LICENSE) para obtener más detalles.

## 📬 **Contacto**

Para más información, por favor envíame un correo a [juangpdev@gmail.com](mailto:juangpdev@gmail.com).

