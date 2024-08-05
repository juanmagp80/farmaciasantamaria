// app/subir-promocion/page.tsx
import { useState } from 'react';

export default function SubirPromocion() {
    const [titulo, setTitulo] = useState('');
    const [contenido, setContenido] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch('/api/promociones', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ titulo, contenido }),
        });
        if (res.ok) {
            alert('Promoción subida con éxito');
            setTitulo('');
            setContenido('');
        }
    };

    return (
        <div>
            <h1>Subir Promoción</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Título:</label>
                    <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
                </div>
                <div>
                    <label>Contenido:</label>
                    <textarea value={contenido} onChange={(e) => setContenido(e.target.value)} required />
                </div>
                <button type="submit">Subir Promoción</button>
            </form>
        </div>
    );
}
