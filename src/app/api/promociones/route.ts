import formidable, { File } from "formidable";
import fs from "fs/promises";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";

export const config = {
    api: {
        bodyParser: false,
    },
};

const uploadDir = path.join(process.cwd(), "public/uploads");

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const form = new formidable.IncomingForm({
        uploadDir,
        keepExtensions: true,
        multiples: false,
    });

    form.parse(req, async (err, fields, files) => {
        if (err) {
            console.error("Error parsing form:", err);
            return res.status(500).json({ message: "Error processing the request" });
        }

        // Manejo seguro de los campos
        const title = Array.isArray(fields.title) ? fields.title[0] : fields.title;
        const content = Array.isArray(fields.content) ? fields.content[0] : fields.content;

        // Verificar que title y content sean strings
        if (typeof title !== "string" || typeof content !== "string") {
            return res.status(400).json({ message: "Invalid fields" });
        }

        // Verificar si files.image es un archivo o una lista de archivos
        const file = Array.isArray(files.image) ? files.image[0] : files.image;

        // Verificar si el archivo tiene las propiedades esperadas
        if (!(file && typeof file === 'object' && 'filepath' in file && 'originalFilename' in file)) {
            return res.status(400).json({ message: "Invalid file" });
        }

        // Asegurarse de que file sea de tipo `formidable.File`
        const fileDetails = file as File;

        if (!title || !content || !fileDetails) {
            return res.status(400).json({ message: "Missing fields or file" });
        }

        try {
            const filePath = path.join(uploadDir, fileDetails.newFilename || fileDetails.originalFilename || 'unknown');

            // Mover el archivo a la ubicación final
            await fs.rename(fileDetails.filepath, filePath);

            // Aquí puedes guardar la información en la base de datos
            console.log("Title:", title);
            console.log("Content:", content);
            console.log("File Path:", filePath);

            return res.status(200).json({ message: "Promotion saved successfully" });
        } catch (error) {
            console.error("Error saving the promotion:", error);
            return res.status(500).json({ message: "Error saving the promotion" });
        }
    });
};

export default handler;
