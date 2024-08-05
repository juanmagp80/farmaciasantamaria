// app/subir-noticia/page.tsx
import { useState } from 'react';

export default function SubirNoticia() {
    const [titulo, setTitulo] = useState('');
    const [contenido, setContenido] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch('/api/noticias', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ titulo, contenido }),
        });
        if (res.ok) {
            alert('Noticia subida con éxito');
            setTitulo('');
            setContenido('');
        }
    };

    return (
        <div>
            <h1>Subir Noticia</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Título:</label>
                    <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
                </div>
                <div>
                    <label>Contenido:</label>
                    <textarea value={contenido} onChange={(e) => setContenido(e.target.value)} required />
                </div>
                <button type="submit">Subir Noticia</button>
            </form>
        </div>
    );
}
