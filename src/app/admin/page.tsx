"use client"; // Importante para el renderizado del lado del cliente en Next.js

import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface Promotion {
    id: string;
    title: string;
    content: string;
    image: string;
}

const Admin = () => {
    const { data: session, status } = useSession();
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [image, setImage] = useState<File | null>(null);
    const [promotions, setPromotions] = useState<Promotion[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (status === "unauthenticated") {
            signIn();
        }
    }, [status]);

    useEffect(() => {
        const fetchPromotions = async () => {
            try {
                const response = await fetch('/api/promotions');
                const data = await response.json();
                setPromotions(data.promotions);
            } catch (error) {
                console.error('Error fetching promotions:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPromotions();
    }, []);

    if (status === "loading") return <p>Loading...</p>;
    if (status === "unauthenticated") return null;

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

        try {
            const res = await fetch("/api/promotions", {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                alert("Promoción guardada correctamente.");
                setTitle("");
                setContent("");
                setImage(null);
                // Refrescar la lista de promociones
                const response = await fetch('/api/promotions');
                const data = await response.json();
                setPromotions(data.promotions);
            } else {
                const errorData = await res.json();
                console.error("Error al guardar la promoción:", errorData);
                alert(`Error al guardar la promoción: ${errorData.message || "Error desconocido"}`);
            }
        } catch (error) {
            console.error("Error de red:", error);
            alert("Error de red al guardar la promoción.");
        }
    };

    const deletePromotion = async (id: string) => {
        try {
            const res = await fetch(`/api/promotions?id=${id}`, { method: 'DELETE' });

            if (res.ok) {
                alert("Promoción eliminada correctamente.");
                setPromotions(promotions.filter(promotion => promotion.id !== id));
            } else {
                const errorData = await res.json();
                console.error("Error al eliminar la promoción:", errorData);
                alert(`Error al eliminar la promoción: ${errorData.message || "Error desconocido"}`);
            }
        } catch (error) {
            console.error("Error de red:", error);
            alert("Error de red al eliminar la promoción.");
        }
    };

    if (loading) return <p>Cargando...</p>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Administrador - Crear Promoción</h1>
            <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-lg shadow-md">
                <label className="block mb-4">
                    <span className="text-gray-700">Título:</span>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </label>
                <label className="block mb-4">
                    <span className="text-gray-700">Contenido:</span>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </label>
                <label className="block mb-4">
                    <span className="text-gray-700">Imagen:</span>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files?.[0] || null)}
                        required
                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                    />
                </label>
                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    Guardar Promoción
                </button>
            </form>
            <h2 className="text-xl font-semibold mt-8 mb-4">Promociones Existentes</h2>
            <ul className="space-y-4">
                {promotions.map(promotion => (
                    <li key={promotion.id} className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
                        <img src={promotion.image} alt={promotion.title} className="w-24 h-auto rounded-md" />
                        <div className="flex-1">
                            <h3 className="text-lg font-bold">{promotion.title}</h3>
                            <p className="text-gray-600">{promotion.content}</p>
                        </div>
                        <button
                            onClick={() => deletePromotion(promotion.id)}
                            className="bg-red-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        >
                            Eliminar
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Admin;
