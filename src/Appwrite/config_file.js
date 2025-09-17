import { Client, ID, Storage } from "appwrite";
import env_import from "../env_import/env_import.js";

export class config_file {
    client = new Client();
    storage;

    constructor() {
        this.client
            .setEndpoint(env_import.AppwriteUrl)
            .setProject(env_import.AppwriteProjectId);
        this.storage = new Storage(this.client);
    }
    async createFile(file) {
        try {
            const createdFile = await this.storage.createFile(
                env_import.AppwriteBucketId,
                ID.unique(),
                file
            )
            if (createdFile) console.log("Successfully created File", createdFile);
            return createdFile;
        } catch (error) {
            console.error("Error creating file:", error);
            throw (error);
        }
    }
    async getFile(fileId) {
        try {
            return await this.storage.getFile(
                env_import.AppwriteBucketId,
                fileId
            )
        } catch (error) {
            console.error("Error getting file:", error);
        }
    }
    async updateFile(fileId, file) {
        try {
            return await this.storage.updateFile(
                env_import.AppwriteBucketId,
                fileId,
                file
            )
        } catch (error) {
            console.error("Error updating file:", error);

        }
    }
    async deleteFile(fileId) {
        try {
            await this.storage.deleteFile(
                env_import.AppwriteBucketId,
                fileId

            )
            return true;
        } catch (error) {
            console.error("Error deleting file:", error);
            return false;
        }
    }
    async downloadFile(fileId) {
        try {
            return this.storage.getFileDownload(
                env_import.AppwriteBucketId,
                fileId,
            )
        } catch (error) {
            console.error("Error downloading file:", error);
        }
    }
    async getFileView(fileId) {
        try {
            const url = this.storage.getFileView(
                env_import.AppwriteBucketId,
                fileId
            )
            return url.href;
        }
        catch (error) {
            console.log("Error while using getFileView Method", error);
        }
    }
}

const Appwrite_file_service = new config_file();
export default Appwrite_file_service;