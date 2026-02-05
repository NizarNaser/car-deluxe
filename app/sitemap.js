import { dbConnect } from '@/lib/config/db';
import Car from '@/lib/models/Car';

const BASE_URL = 'https://car-deluxe.vercel.app';

export default async function sitemap() {
    try {
        await dbConnect();
        const cars = await Car.find({});

        const carEntries = cars.map((car) => ({
            url: `${BASE_URL}/blogs/${car._id}`,
            lastModified: new Date(car.date || new Date()),
            changeFrequency: 'weekly',
            priority: 0.7,
        }));

        return [
            {
                url: BASE_URL,
                lastModified: new Date(),
                changeFrequency: 'daily',
                priority: 1,
            },
            ...carEntries,
        ];
    } catch (error) {
        console.error("Sitemap generation error:", error);
        return [
            {
                url: BASE_URL,
                lastModified: new Date(),
                changeFrequency: 'daily',
                priority: 1,
            },
        ];
    }
}
