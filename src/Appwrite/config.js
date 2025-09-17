import { Client, ID, Databases, Query } from "appwrite";
import env_import from "../env_import/env_import.js";

export class config {
    client = new Client();
    databases;

    constructor() {
        this.client
            .setEndpoint(env_import.AppwriteUrl) // Your API Endpoint
            .setProject(env_import.AppwriteProjectId); // Your project ID
        this.databases = new Databases(this.client);

    }
    async createBlog({ title, slug, content, attachedImage, attachedVideo, status, userId, Name = "Anonymous" }) {
        try {
            const result = await this.databases.createDocument(
                env_import.AppwriteDatabaseId,
                env_import.AppwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    attachedImage,
                    attachedVideo,
                    status,
                    userId,
                    Name

                }
            )
            return result;
        } catch (error) {
            console.error("Error creating document: ", error);
        }
    }
    async getBlog(slug) {
        try {
            const result = await this.databases.getDocument(
                env_import.AppwriteDatabaseId,
                env_import.AppwriteCollectionId,
                slug
            )
            if (result) {
                return result;
            }
        } catch (error) {
            console.error("Error getting document: ", error);
        }
    }
    async updateBlog(slug, { title, content, attachedImage, attachedVideo = "", status, Name }) {
        try {
            const result = await this.databases.updateDocument(
                env_import.AppwriteDatabaseId,
                env_import.AppwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    attachedImage,
                    attachedVideo,
                    status,
                    Name
                }
            )
            if (result) return result;
        } catch (error) {
            console.error("Error updating document: ", error);
        }
    }
    //To be Revisted if got error in the future
    async listBlog() {
        try {
            const result = await this.databases.listDocuments(
                env_import.AppwriteDatabaseId,
                env_import.AppwriteCollectionId,

            )
            return result;

        } catch (error) {
            console.error("Error listing documents: ", error);
            throw error;
        }
    }
    async deleteBlog(slug) {
        try {
            await this.databases.deleteDocument(
                env_import.AppwriteDatabaseId,
                env_import.AppwriteCollectionId,
                slug

            )
            return true;
        } catch (error) {
            console.error("Error deleting document: ", error);
            return false;
        }
    }
    async getUserName(userId) {
        try {
            const response = await this.databases.listDocuments(
                env_import.AppwriteDatabaseId,
                env_import.AppwriteCollectionId,
                [Query.equal('userId', userId)]
            );
            return response.documents[0]?.Name || 'Unknown User';
        } catch (error) {
            console.error('Error fetching user name:', error);
            return 'Unknown User';
        }
    }


}

const Appwrite_service = new config();
export default Appwrite_service;

