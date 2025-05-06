import config from "../conf/config";
import { Client,ID,Databases,Storage,Query} from "appwrite";

export class DbService{
    client = new Client();
    databases;
    storage;

    constructor(){
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId);

        this.databases =new Databases(this.client);
        this.storage=new Storage(this.client);
 }

 async createPost({title,content,slug,coverImage,status,userId})
 {
    try{
        return await this.databases.createDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            {
                title,
                content,
                slug,
                coverImage,
                status,
                userId,
                
            }
        );
           }
    catch(error){
        console.log("Error creating post", error);
        throw error;
    }}

    async updatePost(slug,{postId,title,content,coverImage,status,userId})
    {
        try{
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title, content,coverImage,status
                }
            )}
        catch(error){
            console.log("Error updating post", error);
            throw error;
        } }

        async deletePost(slug){
            try{
                return await this.databases.deleteDocument(
                    config.appwriteDatabaseId,
                    config.appwriteCollectionId,
                    slug
                )
                return true;
            }
            catch(error){
                console.log("Error deleting post", error);
                throw error;
            }
        }

        async getPost(slug){
            try{
                return await this.databases.getDocument(
                    config.appwriteDatabaseId,
                    config.appwriteCollectionId,
                    slug
                )
            }
            catch(error){
                console.log("Error getting post", error);
                throw error;
            }
        }
            
        async getPosts(queries=[Query.equal("status","active")]){
            try{
                return await this.databases.listDocuments(
                    config.appwriteDatabaseId,
                    config.appwriteCollectionId,
                    queries
                )
            }
            catch(error){
                console.log("Error getting posts", error);
                throw error;
            }

        }


        async uploadFile(file){
            try{
                return await this.storage.createFile(
                    config.appwriteBucketId,
                    ID.unique(),
                    file
                )
            }
            catch(error){
                console.log("Error uploading file", error);
                throw error;
            }
        }

        async deleteFile(fileId){
            try{
                return await this.storage.deleteFile(
                    config.appwriteBucketId,
                    fileId
                )
            }
            catch(error){
                console.log("Error deleting file", error);
                throw error;
            }
        }

        getFileUrl(fileId){
            return this.storage.getFileView(
                config.appwriteBucketId,
                fileId,
                "jpg",
                1000,
                1000,
                1,
                "center"
            )
        }
 } 
            


const service = new DbService();
export default service;