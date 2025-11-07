export default function NotFound() {
    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f9fafb'
        }}>
            <div style={{
                maxWidth: '28rem',
                margin: '0 auto',
                textAlign: 'center',
                padding: '2rem'
            }}>
                <h1 style={{
                    fontSize: '6rem',
                    fontWeight: 'bold',
                    color: '#111827',
                    marginBottom: '1rem'
                }}>
                    404
                </h1>
                <h2 style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: '#374151',
                    marginBottom: '1rem'
                }}>
                    Página no encontrada
                </h2>
                <p style={{
                    color: '#4b5563',
                    marginBottom: '1.5rem'
                }}>
                    Lo sentimos, la página que buscas no existe.
                </p>
                <a
                    href="/"
                    style={{
                        backgroundColor: '#2563eb',
                        color: 'white',
                        fontWeight: 'bold',
                        padding: '0.5rem 1rem',
                        borderRadius: '0.25rem',
                        textDecoration: 'none',
                        display: 'inline-block'
                    }}
                >
                    Volver al inicio
                </a>
            </div>
        </div>
    )
}