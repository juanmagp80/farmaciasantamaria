// src/app/api/promotions/[id]/route.ts

import fs from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';

const dataFile = path.join(process.cwd(), 'data/promotions.json');

export async function DELETE(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
        return NextResponse.json({ message: "ID no proporcionado" }, { status: 400 });
    }

    try {
        const data = await fs.readFile(dataFile, 'utf8');
        let promotions = JSON.parse(data);

        // Filtra las promociones para eliminar la que coincide con el ID
        promotions = promotions.filter((promotion: any) => promotion.id !== id);

        await fs.writeFile(dataFile, JSON.stringify(promotions, null, 2));
        return NextResponse.json({ message: "Promoción eliminada correctamente" });
    } catch (error) {
        console.error('Error al eliminar la promoción:', error);
        return NextResponse.json({ message: "Error al eliminar la promoción" }, { status: 500 });
    }
}
