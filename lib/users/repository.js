import prisma from "../../prisma";

export const usersRepository = {
    async getUserByEmail(email) {
        return await prisma.user.findUnique({
            where: { email }
        })
    },

    async getCommentsByUser(userId) {
        return await prisma.comment.findMany({
            where: {
                authorId: userId
            },
            include: {
                post: true,
                author: true,
            }
        })
    },

    async getPostsByUser(userId) {
        return await prisma.post.findMany({
            where: {
                authorId: userId
            },
            include: {
                author: true,
                comments: true,
                postLikes: true,
            }
        })
    }
}