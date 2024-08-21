import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const { placeId } = req.query;
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY; // Asegúrate de tener esta variable de entorno configurada

        try {
            const response = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json`, {
                params: {
                    place_id: placeId,
                    key: apiKey,
                    fields: 'reviews'
                }
            });

            const reviews = response.data.result.reviews;
            res.status(200).json(reviews);
        } catch (error) {
            console.error('Error al obtener las reseñas de Google Places:', error);
            res.status(500).json({ error: 'Error al obtener las reseñas de Google Places' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}