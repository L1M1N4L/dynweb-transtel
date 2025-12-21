import admin from 'firebase-admin';

// Initialize Firebase Admin (Singleton pattern)
if (admin.apps.length === 0) {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY
                ? process.env.FIREBASE_PRIVATE_KEY.replace(/^"(.*)"$/, '$1').replace(/\\n/g, '\n')
                : undefined,
        }),
    });
}

const auth = admin.auth();

export default async function handler(req, res) {
    // 1. Security check: Only allow requests with the secret CRON_SECRET header
    // You need to set CRON_SECRET in your Vercel Environment Variables
    const authHeader = req.headers.authorization;
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        let totalDeleted = 0;
        const now = Date.now();
        const twentyFourHoursAgo = now - 24 * 60 * 60 * 1000;

        // We process one batch. For high volumes, you might need a recursive call or multiple runs.
        const listUsersResult = await auth.listUsers(100);
        const anonymousUsersToDelete = listUsersResult.users.filter((user) => {
            const isAnonymous = user.providerData.length === 0;
            const createdAt = new Date(user.metadata.creationTime).getTime();
            return isAnonymous && createdAt < twentyFourHoursAgo;
        });

        if (anonymousUsersToDelete.length > 0) {
            const uids = anonymousUsersToDelete.map((user) => user.uid);
            const deleteResult = await auth.deleteUsers(uids);
            totalDeleted = deleteResult.successCount;
        }

        return res.status(200).json({
            success: true,
            deletedCount: totalDeleted,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Cleanup Error:', error);
        return res.status(500).json({ error: error.message });
    }
}
