import config from "../conf/config";
import { Client,Account,ID} from 'appwrite';

export class AppwriteAuth {
    client = new Client();
    account;

    constructor(){
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId);

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
            console.log("Error creating account", error);
            throw error;
        }
}
async login({email, password}){
    try{
        return await this.account.createEmailSession(email,password);
        
    }
    catch(error){
        console.log("Error logging in", error);
        throw error;

    }

}

async getCurrentUser(){
    try{
        return

    }
    catch(error){
        console.log("Error getting current user", error);
        throw error;
    }
return null;
}
async logout(){
    try{
        return await this.account.deleteSession("current");
    }
    catch(error){
        throw error;
        console.log("Error logging out", error);        
    }
    }
} 



const authService =new AppwriteAuth();

export default authService;