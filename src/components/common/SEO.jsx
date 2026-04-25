import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, image, url, keywords, noIndex = false }) {
    const siteTitle = 'Transtel Communications';
    const defaultDescription = 'Global provider of enterprise communication infrastructure — PABX systems, Nurse Call, Voice Loggers, Voice Gateways, GPON fiber networks, and IP Telephones for healthcare, hospitality, government, and corporate environments.';
    const defaultImage = '/transtel-logo.png';
    const siteUrl = 'https://transtelcommunications.co';

    const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
    const canonicalUrl = url ? `${siteUrl}${url}` : siteUrl;

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{fullTitle}</title>
            <meta name="description" content={description || defaultDescription} />
            {keywords && <meta name="keywords" content={keywords} />}
            <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow'} />
            <link rel="canonical" href={canonicalUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description || defaultDescription} />
            <meta property="og:image" content={image ? `${siteUrl}${image}` : `${siteUrl}${defaultImage}`} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:site_name" content={siteTitle} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description || defaultDescription} />
            <meta name="twitter:image" content={image ? `${siteUrl}${image}` : `${siteUrl}${defaultImage}`} />
        </Helmet>
    );
}
