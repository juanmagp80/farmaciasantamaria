import fs from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';
import { v4 as uuidv4 } from 'uuid'; // Importar uuid para generar IDs únicos

const uploadDir = path.join(process.cwd(), 'public/uploads');
const dataFile = path.join(process.cwd(), 'data/promotions.json');

// Asegúrate de que el directorio de carga exista
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Handler GET
export async function GET() {
    if (!fs.existsSync(dataFile)) {
        return NextResponse.json({ promotions: [] });
    }

    try {
        const promotions = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
        return NextResponse.json({ promotions });
    } catch (error) {
        console.error("Error al leer el archivo de promociones:", error);
        return NextResponse.json({ message: "Error al leer las promociones" }, { status: 500 });
    }
}

// Handler POST
export async function POST(req: Request) {
    const formData = await req.formData();
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const image = formData.get('image') as File;

    if (!title || !content || !image) {
        return NextResponse.json({ message: "Faltan campos" }, { status: 400 });
    }

    const fileName = image.name;
    const filePath = path.join(uploadDir, fileName);

    // Usa Buffer para leer el archivo
    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Guarda el archivo en el directorio 'public/uploads'
    try {
        fs.writeFileSync(filePath, buffer);

        // Guarda la promoción en un archivo JSON
        const promotions = fs.existsSync(dataFile) ? JSON.parse(fs.readFileSync(dataFile, 'utf8')) : [];
        const newPromotion = {
            id: uuidv4(), // Genera un ID único para la nueva promoción
            title,
            content,
            image: `/uploads/${fileName}`,
        };
        promotions.push(newPromotion);
        fs.writeFileSync(dataFile, JSON.stringify(promotions, null, 2));

        return NextResponse.json({ message: "Promoción guardada correctamente" });
    } catch (error) {
        console.error("Error al guardar el archivo o la promoción:", error);
        return NextResponse.json({ message: "Error al guardar el archivo o la promoción" }, { status: 500 });
    }
}

// Handler DELETE
export async function DELETE(req: Request) {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    if (!id) {
        return NextResponse.json({ message: "ID de promoción no proporcionado" }, { status: 400 });
    }

    try {
        const promotions = fs.existsSync(dataFile) ? JSON.parse(fs.readFileSync(dataFile, 'utf8')) : [];
        const promotionIndex = promotions.findIndex((promo: { id: string }) => promo.id === id);

        if (promotionIndex === -1) {
            return NextResponse.json({ message: "Promoción no encontrada" }, { status: 404 });
        }

        const deletedPromotion = promotions.splice(promotionIndex, 1)[0];

        // Eliminar el archivo de imagen
        if (deletedPromotion.image) {
            const filePath = path.join(uploadDir, path.basename(deletedPromotion.image));
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        // Guardar los cambios en el archivo JSON
        fs.writeFileSync(dataFile, JSON.stringify(promotions, null, 2));

        return NextResponse.json({ message: "Promoción eliminada correctamente" });
    } catch (error) {
        console.error("Error al eliminar la promoción:", error);
        return NextResponse.json({ message: "Error al eliminar la promoción" }, { status: 500 });
    }
}
