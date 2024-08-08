"use client"
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";

const Admin = () => {
    const { data: session, status } = useSession();

    if (status === "loading") return <p>Loading...</p>;
    if (status === "unauthenticated") {
        signIn();
        return null;
    }

    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [image, setImage] = useState<File | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!title || !content || !image) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("image", image);

        const res = await fetch("/api/promotions", {
            method: "POST",
            body: formData,
        });

        if (res.ok) {
            alert("Promoción guardada correctamente.");
            setTitle("");
            setContent("");
            setImage(null);
        } else {
            alert("Error al guardar la promoción.");
        }
    };

    return (
        <div>
            <h1>Administrador - Crear Promoción</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Título:
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Contenido:
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Imagen:
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files?.[0] || null)}
                        required
                    />
                </label>
                <button type="submit">Guardar Promoción</button>
            </form>
        </div>
    );
};

export default Admin;
