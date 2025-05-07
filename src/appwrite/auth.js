import config from "../conf/config";
import { Client,Account,ID} from 'appwrite';

export class AppwriteAuth {
    client = new Client();
    account;

    constructor(){
        this.client
        .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT) 
        .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

        this.account = new Account(this.client);

    }
    async createAccount({email, password, name}){
        try{
           const userAccount= await this.account.create(ID.unique(),email,password,
             name);
             if (userAccount){
                return this.login({email,password});
              } else {
                return userAccount;
             }

        }
        catch(error){
            // console.log("Error creating account", error);
            throw error;
        }
}
async login({email, password}){
    try{
        return await this.account.createSession(email,password);
        
    }
    catch(error){
        // console.log("Error logging in", error);
        throw error;

    }

}

async getCurrentUser(){
    try{
       return await this.account.get();

    }
    catch(error){
        // console.log("Error getting current user", error);
        throw error;
    }
return null;
}
async logout(){
    try{
         await this.account.deleteSessions();
    }
    catch(error){
        throw error;
        // console.log("Error logging out", error);        
    }
    }
} 



const authService = new AppwriteAuth();

export default authService;