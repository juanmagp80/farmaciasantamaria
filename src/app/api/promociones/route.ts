import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";

const filePath = path.join(process.cwd(), "data", "promociones.json");

export async function GET() {
    const jsonData = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(jsonData);
    return NextResponse.json(data);
}

export async function POST(request: Request) {
    const newPromocion = await request.json();
    const jsonData = fs.readFileSync(filePath, "utf8"); // Convert the buffer to a string
    const data = JSON.parse(jsonData);
    newPromocion.id = Date.now();
    data.push(newPromocion);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return NextResponse.json(newPromocion);
}
