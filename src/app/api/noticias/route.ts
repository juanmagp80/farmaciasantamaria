import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";

const filePath = path.join(process.cwd(), "data", "noticias.json");

export async function GET() {
    const jsonData = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(jsonData);
    return NextResponse.json(data);
}

export async function POST(request: Request) {
    const newNoticia = await request.json();
    const jsonData = fs.readFileSync(filePath).toString(); // Convert buffer to string
    const data = JSON.parse(jsonData);
    newNoticia.id = Date.now();
    data.push(newNoticia);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return NextResponse.json(newNoticia);
}
