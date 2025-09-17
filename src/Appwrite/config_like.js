import { Client, ID, Databases, Query } from "appwrite";
import env_import from "../env_import/env_import.js";
import Appwrite_service from "./config.js";
import { useState } from "react";
export class config_like {
    client = new Client();
    databases;

    constructor() {
        this.client
            .setEndpoint(env_import.AppwriteUrl)
            .setProject(env_import.AppwriteProjectId)
        this.databases = new Databases(this.client);

    }
    async createLike({ blogId, userId }) {
        try {
            const result = await this.databases.createDocument(
                env_import.AppwriteDatabaseId,
                env_import.AppwriteLikeCollectionId,
                ID.unique(),
                {
                    blogId,
                    userId
                }
            )
            return result;
        } catch (error) {
            console.error("Error creating document: ", error);
            throw error;
        }
    }
    async countLike({ blogId }) {
        try {
            const res = await this.databases.listDocuments(
                env_import.AppwriteDatabaseId,
                env_import.AppwriteLikeCollectionId,
                [
                    Query.equal('blogId', blogId)
                ]
            )
            const likecnt = res.total
            return likecnt;
        } catch (error) {
            console.error("Error creating document: ", error);
            throw error;
        }
    }
    async getLikedBlogs({ userId }) {
        const blogs = [];
        try {
            const res = await this.databases.listDocuments(
                env_import.AppwriteDatabaseId,
                env_import.AppwriteLikeCollectionId,
                [
                    Query.equal('userId', userId)
                ]
            )
            console.log(res.documents[0]?.blogId);
            for (let i = 0; i < res.documents.length; i++) {
                let postid = await res.documents[i].blogId;
                if (postid) {
                    const doc = await Appwrite_service.getBlog(postid);
                    blogs.push(doc);
                } else {
                    console.log("Unable to get Blog Id");
                }
            }
            return blogs;

        } catch (error) {
            console.error("Error getting Liked document: ", error);
            throw error;
        }
    }

}
const config_like_service = new config_like();
export default config_like_service;