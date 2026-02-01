import { Role } from "../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
class User {
    async createUser(email, password) {
        await prisma.user.create({
            data: {
                email: email,
                password: password,
                role: Role.USER
            }
        });
    }
    async findUserById(userId) {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                id: true,
                email: true,
                role: true
            }
        });
        return user;
    }
    async findUserByEmail(email) {
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
            select: {
                email: true,
                password: true,
                id: true,
            }
        });
        return user;
    }
    async findUserByEmailAdmin(email) {
        const user = await prisma.user.findUnique({
            where: {
                email: email,
                role: Role.ADMIN
            },
            select: {
                email: true,
                password: true,
                id: true,
            }
        });
        return user;
    }
}
class Blog {
    async createPost(userId, title, text, published) {
        await prisma.posts.create({
            data: {
                title: title,
                userId: userId,
                text: text,
                published: published,
            }
        });
    }
    async editPost(postId, title, text, published) {
        await prisma.posts.update({
            where: {
                id: postId
            },
            data: {
                title: title,
                text: text,
                published: published
            }
        });
    }
    async deletePost(postId) {
        await prisma.posts.delete({
            where: {
                id: postId
            }
        });
    }
    async findAllPost(published, userId) {
        const posts = await prisma.posts.findMany({
            where: {
                users: {
                    role: Role.ADMIN,
                },
                ...(userId !== undefined && { userId }),
                ...(published !== undefined && { published })
            },
            orderBy: {
                date: "desc"
            },
            select: {
                id: true,
                title: true,
                text: true,
                date: true,
                published: true,
                users: {
                    select: {
                        email: true
                    }
                }
            }
        });
        return posts;
    }
}
class Comments {
    async findAllComments(postId) {
        const comments = await prisma.comments.findMany({
            where: {
                postId: postId
            },
            orderBy: {
                date: "asc"
            },
            select: {
                id: true,
                text: true,
                date: true,
                user: {
                    select: {
                        email: true,
                        id: true
                    }
                }
            }
        });
        return comments;
    }
    async createComments(postId, userId, text) {
        const result = await prisma.comments.create({
            data: {
                postId: postId,
                userId: userId,
                text: text
            },
            select: {
                id: true,
                text: true,
                date: true,
                user: {
                    select: { email: true, id: true }
                }
            }
        });
        return result;
    }
    async updateComments(id, text) {
        const result = await prisma.comments.update({
            where: {
                id: id
            },
            data: {
                text: text
            },
            select: {
                id: true,
                text: true,
                date: true,
                user: {
                    select: {
                        email: true,
                        id: true
                    }
                }
            }
        });
        return result;
    }
    async deleteComments(id) {
        const result = await prisma.comments.delete({
            where: {
                id: id
            }
        });
        return result;
    }
    async findSelfComments(id) {
        const result = await prisma.comments.findMany({
            where: {
                userId: id
            },
            orderBy: {
                date: "desc"
            },
            select: {
                id: true,
                text: true,
                date: true,
                postId: true,
                user: {
                    select: {
                        email: true
                    }
                },
                posts: {
                    select: {
                        title: true,
                        users: {
                            select: {
                                email: true
                            }
                        }
                    }
                }
            }
        });
        return result;
    }
}
export const blogObj = new Blog();
export const userObj = new User();
export const commnentObj = new Comments();
//# sourceMappingURL=queries.js.map