import admin from 'firebase-admin';
import 'dotenv/config';

// Initialize Firebase Admin
const serviceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY
        ? process.env.FIREBASE_PRIVATE_KEY.replace(/^"(.*)"$/, '$1').replace(/\\n/g, '\n')
        : undefined,
};

if (!serviceAccount.privateKey) {
    console.error('❌ Error: FIREBASE_PRIVATE_KEY is missing in .env');
    process.exit(1);
}

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const auth = admin.auth();

async function deleteAnonymousUsers(nextPageToken) {
    try {
        const listUsersResult = await auth.listUsers(100, nextPageToken);
        const now = Date.now();
        const twentyFourHoursAgo = now - 24 * 60 * 60 * 1000;

        const anonymousUsersToDelete = listUsersResult.users.filter((user) => {
            // Anonymous users have no provider data
            const isAnonymous = user.providerData.length === 0;
            const createdAt = new Date(user.metadata.creationTime).getTime();
            const isOldEnough = createdAt < twentyFourHoursAgo;

            return isAnonymous && isOldEnough;
        });

        if (anonymousUsersToDelete.length > 0) {
            const uids = anonymousUsersToDelete.map((user) => user.uid);
            console.log(`[${new Date().toISOString()}] 🗑️ Deleting ${uids.length} anonymous users...`);
            const deleteResult = await auth.deleteUsers(uids);
            console.log(`[${new Date().toISOString()}] ✅ Successfully deleted ${deleteResult.successCount} users. Errors: ${deleteResult.failureCount}`);
        } else {
            console.log(`[${new Date().toISOString()}] ✨ No old anonymous users found in this batch.`);
        }

        if (listUsersResult.pageToken) {
            await deleteAnonymousUsers(listUsersResult.pageToken);
        }
    } catch (error) {
        console.error(`[${new Date().toISOString()}] ❌ Error listing/deleting users:`, error);
    }
}

console.log(`[${new Date().toISOString()}] 🚀 Starting anonymous user cleanup sequence...`);
deleteAnonymousUsers().then(() => {
    console.log(`[${new Date().toISOString()}] 🏁 Cleanup process complete.`);
    process.exit(0);
});
