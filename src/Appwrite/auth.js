import { Client, Account, ID } from "appwrite";
import env_import from "../env_import/env_import.js";
// const client = new Client()
//     .setEndpoint(env_import.AppwriteUrl) // Your API Endpoint
//     .setProject(env_import.AppwriteProjectId); // Your project ID

export class AuthService {
    client = new Client();
    account;
    constructor() {
        this.client
            .setEndpoint(env_import.AppwriteUrl) // Your API Endpoint
            .setProject(env_import.AppwriteProjectId); // Your project ID
        this.account = new Account(this.client);
    }
    async createAccount({ email, password, name }) {
        try {
            console.log("creating Account", email, password, name);
            const userAccount = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            )
            if (userAccount) {
                //Call the login function
                return await this.loginAccount({ email, password });
            }
        }
        catch (error) {
            console.log("Error creating account: ", error);

        }
    }
    async loginAccount({ email, password }) {
        try {
            console.log("Logging in with: ", email, password);
            await this.account.createEmailPasswordSession(
                email,
                password
            )
            const loggedInUser = await this.account.get();

            console.log("User: ", this.loggedInUser);
            return loggedInUser;
        } catch (error) {
            console.log("Error logging in: ", error);
            // this.createAccount({ email, password });
        }
    }
    async getCurrentUser() {
        try {
            if (this.account) {
                const currUser = await this.account.get();
                console.log("Current user: ", currUser);
                if (currUser) {
                    return currUser;
                }
            }
        } catch (error) {
            console.log("Error getting current user: ", error);
        }
    }
    async logoutAccount() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Error Logging out", error);
        }
    }
    async createEmailVerification() {
        try {
            const result = await this.account.createVerification('http://localhost:3000/verify-email');
            return await this.EmailConformation({ result });
        } catch (error) {
            console.log("Error verifying email: ", error);
        }
    }
    async EmailConformation({ userId, secret }) {
        try {
            const result = await this.account.updateVerification(userId, secret);
            return result;
        } catch (error) {
            console.log("Error confirming email: ", error);
            throw error;
        }
    }



}

const authService = new AuthService();
export default authService;


