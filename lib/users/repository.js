import prisma from "../../prisma";

export const usersRepository = {
    async saveToDbFromSession(user) {
        const foundUser = await prisma.user.findUnique({
            where: {
                email: user.email,
            }
        })
        if (foundUser) {
            return foundUser
        }
        return await prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                image: user.image ?? null,
            }
        })
    }
}