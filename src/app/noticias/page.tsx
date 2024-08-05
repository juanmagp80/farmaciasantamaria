// app/noticias/page.tsx
import { useEffect, useState } from 'react';

async function fetchNoticias() {
    const response = await fetch('/api/noticias');
    return response.json();
}

export default function Noticias() {
    const [noticias, setNoticias] = useState([]);

    useEffect(() => {
        fetchNoticias().then(setNoticias);
    }, []);

    return (
        <div>
            <h1>Noticias</h1>
            <ul>
                {noticias.map((noticia) => (
                    <li key={noticia.id}>
                        <h2>{noticia.titulo}</h2>
                        <p>{noticia.contenido}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
