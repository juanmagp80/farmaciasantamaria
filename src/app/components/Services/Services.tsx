import React from 'react';

const Services = () => {
  const services = [
    {
      title: "Medicamentos",
      description: "Amplio catálogo de medicamentos con receta y de venta libre",
      icon: "💊"
    },
    {
      title: "Consultas",
      description: "Asesoramiento farmacéutico profesional personalizado",
      icon: "👩‍⚕️"
    },
    {
      title: "Dermofarmacia",
      description: "Productos especializados para el cuidado de la piel",
      icon: "🧴"
    },
    {
      title: "Nutrición",
      description: "Suplementos nutricionales y asesoramiento dietético",
      icon: "🥗"
    },
    {
      title: "Ortopedia",
      description: "Productos ortopédicos y material sanitario",
      icon: "🦴"
    },
    {
      title: "Encargos Online",
      description: "Solicita tus medicamentos desde casa",
      icon: "📱"
    },
    {
      title: "Pediatría",
      description: "Especializado en medicamentos y productos infantiles",
      icon: "👶"
    },
    {
      title: "Fitoterapia",
      description: "Medicina natural y productos herbales",
      icon: "🌿"
    }
  ];

  return (
    <section 
      id="Servicios" 
      style={{
        padding: '80px 20px',
        backgroundColor: '#f8fafc',
        minHeight: '600px'
      }}
    >
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '60px'
        }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '20px'
          }}>
            Nuestros <span style={{color: '#059669'}}>Servicios</span>
          </h2>
          <p style={{
            fontSize: '1.2rem',
            color: '#6b7280',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            En Farmacia Santa María ofrecemos una amplia gama de servicios profesionales 
            para cuidar de tu salud y la de tu familia.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '30px',
          marginBottom: '60px'
        }}>
          {services.map((service, index) => (
            <div
              key={index}
              style={{
                backgroundColor: 'white',
                padding: '30px',
                borderRadius: '15px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                textAlign: 'center',
                border: '1px solid #e5e7eb'
              }}
            >
              <div style={{
                fontSize: '3rem',
                marginBottom: '20px'
              }}>
                {service.icon}
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#1f2937',
                marginBottom: '15px'
              }}>
                {service.title}
              </h3>
              <p style={{
                color: '#6b7280',
                lineHeight: '1.5',
                fontSize: '1rem'
              }}>
                {service.description}
              </p>
            </div>
          ))}
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #059669 0%, #2563eb 100%)',
          borderRadius: '20px',
          padding: '50px 30px',
          textAlign: 'center',
          color: 'white'
        }}>
          <h3 style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            marginBottom: '15px'
          }}>
            ¿Necesitas ayuda personalizada?
          </h3>
          <p style={{
            fontSize: '1.2rem',
            marginBottom: '30px',
            opacity: '0.9'
          }}>
            Nuestro equipo de profesionales está aquí para ayudarte
          </p>
          <div style={{
            display: 'flex',
            gap: '20px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <a
              href="/Reservas"
              style={{
                backgroundColor: 'white',
                color: '#059669',
                padding: '15px 30px',
                borderRadius: '25px',
                textDecoration: 'none',
                fontWeight: 'bold',
                fontSize: '1.1rem',
                display: 'inline-block'
              }}
            >
              📅 Reservar Consulta
            </a>
            <a
              href="/encargos"
              style={{
                backgroundColor: 'transparent',
                color: 'white',
                padding: '15px 30px',
                borderRadius: '25px',
                textDecoration: 'none',
                fontWeight: 'bold',
                fontSize: '1.1rem',
                border: '2px solid white',
                display: 'inline-block'
              }}
            >
              🛒 Hacer Encargo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
