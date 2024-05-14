import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap | any {
    return [
        {
            url: 'https://fakharnia.com',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: .5,
            alternates: {
                languages: {
                    es: 'https://fakharnia.com/en',
                    de: 'https://fakharnia.com/fa',
                },
            },
        },
        {
            url: 'https://fakharnia.com/blog',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.5,
            alternates: {
                languages: {
                    es: 'https://fakharnia.com/en/blog',
                    de: 'https://fakharnia.com/fa/blog',
                },
            },
        },
        {
            url: 'https://fakharnia.com/portfolio',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
            alternates: {
                languages: {
                    es: 'https://fakharnia.com/en/portfolio',
                    de: 'https://fakharnia.com/fa/portfolio',
                },
            },
        },
        {
            url: 'https://fakharnia.com/services',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
            alternates: {
                languages: {
                    es: 'https://fakharnia.com/en/services',
                    de: 'https://fakharnia.com/fa/services',
                },
            },
        },
    ]
}