import prisma from '../../prisma'

export const postsRepository = {
    async getAll() {
        return await prisma.post.findMany({
            include: {
                author: true,
                comments: true,
                postLikes: true,
            }
        })
    },

    async addComment(postId, userId, comment) {
        return await prisma.comment.create({
            data: {
                content: comment,
                postId,
                authorId: userId
            },
            include: {
                author: true,
            }
        })
    },

    async findById(postId) {
        return await prisma.post.findUnique({
            where: {
                id: postId
            },
            include: {
                author: true,
                comments: {
                    include: {
                        author: true
                    }
                },
                postLikes: true,
            }
        })
    },

    async createPost({user, code, language}) {
        let userFromDb = await prisma.user.findUnique({
            where: {
                email: user.email
            }
        })
        if (!userFromDb) {
            userFromDb = await prisma.user.create({
                data: {
                    name: user.name,
                    email: user.email,
                    image: user.image ?? null,
                }
            })
        }

        return await prisma.post.create({
            data: {
                postTitle: code.split('\n')[0],
                code,
                language,
                authorId: userFromDb.id
            }
        })
    },

    async like(postId, userId) {
        const foundRelation = await prisma.postLike.findFirst({
            where: {
                postId: postId,
                authorId: userId
            },
        })
        if (foundRelation) {
            // remove like
            await prisma.postLike.delete({
                where: {
                    id: foundRelation.id
                },
            })
            return true
        }
        // add like
        await prisma.postLike.create({
            data: {
                postId,
                authorId: userId
            }
        })
        return true
    },
}