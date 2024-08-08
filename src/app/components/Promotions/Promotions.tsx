import fs from "fs/promises";
import { GetServerSideProps } from "next";
import path from "path";

interface Promotion {
    title: string;
    content: string;
    imageUrl: string;
}

const Promotions = ({ promotions }: { promotions: Promotion[] }) => {
    return (
        <div>
            <h1>Promociones</h1>
            {promotions.map((promotion, index) => (
                <div key={index}>
                    <h2>{promotion.title}</h2>
                    <p>{promotion.content}</p>
                    {promotion.imageUrl && (
                        <img src={promotion.imageUrl} alt={promotion.title} />
                    )}
                </div>
            ))}
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async () => {
    const promotionsDir = path.join(process.cwd(), "public/uploads");

    const files = await fs.readdir(promotionsDir);

    const promotions = files.map((file) => {
        return {
            title: "Título de Ejemplo",
            content: "Contenido de Ejemplo",
            imageUrl: `/uploads/${file}`,
        };
    });

    return {
        props: {
            promotions,
        },
    };
};

export default Promotions;
