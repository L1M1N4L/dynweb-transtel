// Utility function to convert Google Drive URLs to embeddable format
export const convertGoogleDriveUrl = (url) => {
    if (!url) return url;

    // Check if it's a Google Drive URL
    if (url.includes('drive.google.com')) {
        // Extract file ID from various Google Drive URL formats
        let fileId = null;

        // Format 1: https://drive.google.com/thumbnail?id=FILE_ID&sz=w1000
        const thumbnailMatch = url.match(/[?&]id=([^&]+)/);
        if (thumbnailMatch) {
            fileId = thumbnailMatch[1];
        }

        // Format 2: https://drive.google.com/file/d/FILE_ID/view
        const fileMatch = url.match(/\/file\/d\/([^/]+)/);
        if (fileMatch) {
            fileId = fileMatch[1];
        }

        // Format 3: https://drive.google.com/open?id=FILE_ID
        const openMatch = url.match(/[?&]id=([^&]+)/);
        if (openMatch && !fileId) {
            fileId = openMatch[1];
        }

        // If we found a file ID, convert to direct embeddable URL
        if (fileId) {
            return `https://drive.google.com/uc?export=view&id=${fileId}`;
        }
    }

    // Return original URL if not a Google Drive URL or couldn't extract ID
    return url;
};

// Alternative: Get thumbnail URL with specific size
export const getGoogleDriveThumbnail = (url, size = 'w1000') => {
    if (!url) return url;

    if (url.includes('drive.google.com')) {
        let fileId = null;

        const thumbnailMatch = url.match(/[?&]id=([^&]+)/);
        if (thumbnailMatch) {
            fileId = thumbnailMatch[1];
        }

        const fileMatch = url.match(/\/file\/d\/([^/]+)/);
        if (fileMatch) {
            fileId = fileMatch[1];
        }

        if (fileId) {
            return `https://lh3.googleusercontent.com/d/${fileId}=${size}`;
        }
    }

    return url;
};
