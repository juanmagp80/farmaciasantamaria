"use client"// app/promociones/page.tsx
import { useEffect, useState } from 'react';

async function fetchPromociones() {
    const response = await fetch('/api/promociones');
    return response.json();
}

export default function Promociones() {
    const [promociones, setPromociones] = useState<{ id: number, titulo: string, contenido: string }[]>([]);

    useEffect(() => {
        fetchPromociones().then(setPromociones);
    }, []);

    return (
        <div>
            <h1>Promociones</h1>
            <ul>
                {promociones.map((promocion) => (
                    <li key={promocion.id}>
                        <h2>{promocion.titulo}</h2>
                        <p>{promocion.contenido}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
