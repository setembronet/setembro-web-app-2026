import React from 'react';

export const JsonLd = () => {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "Setembro.net",
        "description": "Transformamos negócios com inteligência artificial e soluções de software sob medida.",
        "url": "https://setembro.net",
        "logo": "https://setembro.net/logo.png",
        "image": "https://setembro.net/og-image.jpg",
        "founder": {
            "@type": "Person",
            "name": "Sergio",
            "jobTitle": "Lead Developer & AI Consultant"
        },
        "telephone": "+5531999999999",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Belo Horizonte",
            "addressRegion": "MG",
            "addressCountry": "BR"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": -19.9166813,
            "longitude": -43.9344931
        },
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday"
                ],
                "opens": "09:00",
                "closes": "18:00"
            }
        ],
        "priceRange": "$$"
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
    );
};
