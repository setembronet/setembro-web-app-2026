import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Setembro.net',
        short_name: 'Setembro',
        description: 'Agência de Desenvolvimento Web e Inteligência Artificial',
        start_url: '/',
        display: 'standalone',
        background_color: '#0A0A0A',
        theme_color: '#D4AF37',
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
        ],
    };
}
