export default function robots() {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/admin/',
        },
        sitemap: 'https://car-deluxe.vercel.app/sitemap.xml',
    }
}
