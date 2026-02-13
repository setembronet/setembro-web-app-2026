import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://setembro.net';

    // Base routes that exist for all locales
    const routes = [
        '',
        '/admin/dashboard',
        '/admin/leads',
        '/admin/posts',
        '/admin/agents'
    ];

    return routes.flatMap((route) => {
        return routing.locales.map((locale) => {
            return {
                url: `${baseUrl}/${locale}${route}`,
                lastModified: new Date(),
                changeFrequency: 'daily',
                priority: route === '' ? 1 : 0.8,
            };
        });
    });
}
