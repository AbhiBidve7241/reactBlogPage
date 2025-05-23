import React,{useCallback} from 'react'
import {useForm} from 'react-hook-form'
import {Button,Input,Select,RTE} from '../index'
import service from '../../appwrite/conf'
import {data, useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'

function PostForm() {
    const {register,handleSubmit,watch,setValue,control,getValues} = useForm({
        defaultValues:{
            title:post?.title||"",
            content:post?.content||"",
            slug:post?.slug||"",
            coverImage:post?.coverImage||"",
            status:post?.status||"draft",
           
        }
})

const navigate =useNavigate()
const userData = useSelector((state) => state.user.userData)

const submit = async (data) => {
    if(post){
       const file= data.image[0] ? service.uploadFile(data.image[0]) : null
        if (file){
            service.deleteFile(post.coverImage)
        }
        const dbPost = await service.updatePost(
     post.$id,{
                    ...data,
                    coverImage: file ? file.$id : undefined,
                })
                    if(dbPost){
                        navigate("/posts/${dbPost.$id}")

                    }
                }
                else{
                    const file = await service.uploadFile(data.image[0]);

                    if(file){
                        const fileID= file.$id
                        data.coverImage = fileID
                      const dbPost=  await service.createPost({
                            ...data,
                            userId: userData.$id,
                            coverImage: fileID,
                        })
                        if(dbPost){
                            navigate("/posts/${dbPost.$id}")
                        }
                    }

                }


    }

    const slugTransform = useCallback((value)=>{
         if(value && typeof value === "string"){
            const slug = value
            .toLowerCase()
            .replace(/\s+/g,"-")
            .replace(/[^a-z0-9-]/g,"")
            setValue("slug",slug)
         }
            
  },[])


  React.useEffect(()=>{
    const subscription = watch((value,{name})=>{
        if(name === "title"){
            setValue("slug",
            slugTransform(value.title,{
                shouldValidate:true,
                shouldDirty:true,
                shouldTouch:true, }))
            }
        }

    
        
    )
    
    return () => subscription.unsubscribe()

  },[watch,slugTransform,setValue])
    

   
  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
        <div className="w-2/3 px-2">
            <Input
                label="Title :"
                placeholder="Title"
                className="mb-4"
                {...register("title", { required: true })}
            />
            <Input
                label="Slug :"
                placeholder="Slug"
                className="mb-4"
                {...register("slug", { required: true })}
                onInput={(e) => {
                    setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                }}
            />
            <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
        </div>
        <div className="w-1/3 px-2">
            <Input
                label="Featured Image :"
                type="file"
                className="mb-4"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                {...register("image", { required: !post })}
            />
            {post && (
                <div className="w-full mb-4">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-lg"
                    />
                </div>
            )}
            <Select
                options={["active", "inactive"]}
                label="Status"
                className="mb-4"
                {...register("status", { required: true })}
            />
            <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                {post ? "Update" : "Submit"}
            </Button>
        </div>
    </form>
);
}

export default PostForm