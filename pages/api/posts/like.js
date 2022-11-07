import {unstable_getServerSession} from "next-auth";
import {authOptions} from "../auth/[...nextauth]";
import {postsRepository} from "../../../lib/posts/repository";
import {usersRepository} from "../../../lib/users/repository";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const session = await unstable_getServerSession(req, res, authOptions)
        if (!session) {
            res.status(401).send({error: 'Unauthorized'})
            return
        }

        const user = await usersRepository.getUserByEmail(session.user.email)

        // Process a POST request
        const { postId } = req.body
        if (!postId || isNaN(parseInt(postId))) {
            res.status(400).send({error: 'No postId provided'})
            return
        }

        await postsRepository.like(parseInt(postId), user.id)

        res.status(200)
    } else {
        // Handle any other HTTP method
        res.status(404).json({ error: 'Can\'t process this request' })
    }
}