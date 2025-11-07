'use client'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
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
                <h2 style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: '#111827',
                    marginBottom: '1rem'
                }}>
                    ¡Algo salió mal!
                </h2>
                <p style={{
                    color: '#4b5563',
                    marginBottom: '1.5rem'
                }}>
                    Ha ocurrido un error inesperado. Por favor, inténtalo de nuevo.
                </p>
                <button
                    onClick={() => reset()}
                    style={{
                        backgroundColor: '#2563eb',
                        color: 'white',
                        fontWeight: 'bold',
                        padding: '0.5rem 1rem',
                        borderRadius: '0.25rem',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                >
                    Intentar de nuevo
                </button>
            </div>
        </div>
    )
}