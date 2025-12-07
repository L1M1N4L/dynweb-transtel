export const convertGoogleDriveLink = (url) => {
    if (!url) return '';

    try {
        // Check if it's a Google Drive link
        if (url.includes('drive.google.com')) {
            // Extract File ID
            // Supports formats:
            // 1. /file/d/FILE_ID/view
            // 2. id=FILE_ID
            let id = '';

            const parts = url.split('/');
            const dIndex = parts.indexOf('d');

            if (dIndex !== -1 && parts[dIndex + 1]) {
                id = parts[dIndex + 1];
            } else if (url.includes('id=')) {
                id = new URL(url).searchParams.get('id');
            }

            if (id) {
                // Return direct view link
                return `https://drive.google.com/thumbnail?id=${id}&sz=w1000`;
                // Note: 'uc?export=view' sometimes hits quota limits. 
                // 'thumbnail?id=...&sz=w1000' is often more reliable for images (up to 1000px width).
            }
        }
        return url;
    } catch (e) {
        console.error("Error converting Drive link", e);
        return url;
    }
};

// Convert Google Drive links for PDFs (different format than images)
export const convertGoogleDrivePdfLink = (url) => {
    if (!url) return '';

    try {
        // Check if it's a Google Drive link
        if (url.includes('drive.google.com')) {
            // Extract File ID
            let id = '';

            const parts = url.split('/');
            const dIndex = parts.indexOf('d');

            if (dIndex !== -1 && parts[dIndex + 1]) {
                id = parts[dIndex + 1];
            } else if (url.includes('id=')) {
                id = new URL(url).searchParams.get('id');
            }

            if (id) {
                // Return direct view link for PDFs (opens in browser, allows download)
                // Using 'uc?export=view' for preview with download option
                return `https://drive.google.com/file/d/${id}/preview`;
            }
        }
        return url;
    } catch (e) {
        console.error("Error converting Drive PDF link", e);
        return url;
    }
};

