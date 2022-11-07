import {unstable_getServerSession} from "next-auth";
import {authOptions} from "../auth/[...nextauth]";
import {usersRepository} from "../../../lib/users/repository";

export default async function handler(req, res) {
    const session = await unstable_getServerSession(req, res, authOptions)
    if (!session) {
        res.status(401).send({error: 'Unauthorized'})
        return
    }

    const user = await usersRepository.getUserByEmail(session.user.email)

    if (req.method === 'GET') {
        const posts = await usersRepository.getPostsByUser(user.id)
        const comments = await usersRepository.getCommentsByUser(user.id)
        console.log(posts, comments)

        res.status(200).json({
            posts,
            comments
        })
    } else {
        // Handle any other HTTP method
        res.status(404).json({ error: 'Can\'t process this request' })
    }
}