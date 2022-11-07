import {unstable_getServerSession} from "next-auth"
import { authOptions } from "../auth/[...nextauth]"
import {postsRepository} from "../../../lib/posts/repository";
import {usersRepository} from "../../../lib/users/repository";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const session = await unstable_getServerSession(req, res, authOptions)
        if (!session) {
            res.status(401).send({error: 'Unauthorized'})
            return
        }

        const user = await usersRepository.saveToDbFromSession(session.user)

        // Process a POST request
        const { postId, comment } = req.body
        if (!postId || isNaN(parseInt(postId))) {
            res.status(400).send({error: 'No postId provided'})
            return
        }
        if (!comment) {
            res.status(400).send({error: 'No comment provided'})
            return
        }

        const createdComment = await postsRepository.addComment(parseInt(postId), user.id, comment)
        console.log(createdComment)

        res.status(200).json(createdComment)
    } else {
        // Handle any other HTTP method
        res.status(404).json({ error: 'Not found' })
    }
}