import { networkInterfaces } from "node:os"
import { Prisma } from "../../generated/prisma/client"
import { Role } from "../../generated/prisma/enums"
import {prisma} from "../../lib/prisma"

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
                email: true
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
                id: true
            }
        })
        return user
    }
}

interface Posts{
    title: string
    text: string
    date: object
    users: object
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


    
    async findAllPost(): Promise<Posts[]>{
        const posts = await prisma.posts.findMany({
            where:{
                users:{
                    email: "triphu27@gmail.com"
                }
            },
            select: {
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

export const blogObj = new Blog()
export const userObj = new User()

