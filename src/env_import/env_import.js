const env_import = {
    AppwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    AppwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    AppwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    AppwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    AppwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    AppwriteLikeCollectionId: String(import.meta.env.VITE_APPWRITE_LIKE_COLLECTION_ID),
}


export default env_import;