import { networkInterfaces } from "node:os"
import { Prisma } from "../../generated/prisma/client"
import { Role } from "../../generated/prisma/enums"
import {prisma} from "../../lib/prisma"
import { deletePost } from "../controller/postController"
import { deleteComments } from "../controller/commentController"

class User{
    async createUser(email: string, password: string){
        await prisma.user.create({
            data:{
                email: email,
                password: password,
                role: Role.USER
            }
        })
    }

    async findUserById(userId: number){
        const user = await prisma.user.findUnique({
            where:{
                id: userId
            },
            select:{
                id: true,
                email: true,
                role: true
            }
        })
        return user
    }

    async findUserByEmail(email: string) {
        const user = await prisma.user.findUnique({
            where: {
                email: email
            },
            select: {
                email: true,
                password: true,
                id: true,
            }
        })
        return user
    }
}

class Blog{
    async createPost(userId: number, title: string, text: string, published: boolean): Promise<void>{
        await prisma.posts.create({
            data:{
                title: title,
                userId: userId,
                text: text,
                published: published,
            }
        })
    }

    async editPost(postId: number, title: string, text: string, published: boolean){
        await prisma.posts.update({
            where:{
                id:postId
            },
            data:{
                title: title,
                text: text,
                published: published
            }
        })
    }

    async deletePost(postId: number){
        await prisma.posts.delete({
            where:{
                id:postId
            }
        })
    }

    async findAllPost(userId?: number){
        const posts = await prisma.posts.findMany({
            where:{
                users:{
                    role: Role.ADMIN,
                },
                ...(userId !== undefined && { userId }),
                published: true
            },
            select: {
                id: true,
                title: true,
                text: true,
                date: true,
                users:{
                    select: {
                        email: true
                    }
                }
            }
        })
        return posts
    }
}

class Comments{
    async findAllComments(postId: number){
        const comments = await prisma.comments.findMany({
            where:{
                postId: postId
            },
            select:{
                id: true,
                text: true,
                date: true,
                user:{
                    select:{
                        email:true
                    }
                }
            }
        })
        return comments
    }

    async createComments(postId: number, 
        userId: number,
        text: string){
        const result = await prisma.comments.create({
            data:{
                postId:postId,
                userId:userId,
                text:text
            },
            select:{
                id:true,
                text: true,
                date: true,
                user:{
                    select:{ email: true}
                }
            }
        })
        return result
    }

    async updateComments(id: number, text: string){
        const result = await prisma.comments.update({
            where:{
                id: id
            },
            data:{
                text:text
            },
            select:{
                id: true,
                text: true,
                date: true,
                user:{
                    select: {email: true}
                }
            }
        })
        return result
    }

    async deleteComments(id: number){
        await prisma.comments.delete({
            where:{
                id:id
            }
        })
    }
}

export const blogObj = new Blog()
export const userObj = new User()
export const commnentObj = new Comments()
