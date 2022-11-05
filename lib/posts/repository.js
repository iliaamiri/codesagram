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

    async createPost({user, code}) {
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
                authorId: userFromDb.id
            }
        })
    }
}