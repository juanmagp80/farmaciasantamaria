'use client'

export default function Loading() {
    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f9fafb'
        }}>
            <div style={{
                textAlign: 'center'
            }}>
                <div
                    style={{
                        width: '8rem',
                        height: '8rem',
                        border: '2px solid #e5e7eb',
                        borderBottom: '2px solid #2563eb',
                        borderRadius: '50%',
                        margin: '0 auto 1rem auto'
                    }}
                    className="animate-spin"
                ></div>
                <h2 style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: '#111827',
                    marginBottom: '0.5rem'
                }}>
                    Cargando...
                </h2>
                <p style={{
                    color: '#4b5563'
                }}>
                    Por favor espera un momento
                </p>
            </div>

            <style jsx global>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
        </div>
    )
}