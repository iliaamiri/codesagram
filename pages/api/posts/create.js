import {unstable_getServerSession} from "next-auth"
import { authOptions } from "../auth/[...nextauth]"
import {postsRepository} from "../../../lib/posts/repository";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const session = await unstable_getServerSession(req, res, authOptions)
        if (!session) {
            res.status(401).send({error: 'Unauthorized'})
            return
        }

        // Process a POST request
        const { code } = req.body
        if (!code) {
            res.status(400).send({error: 'No code provided'})
            return
        }

        const createdPost = await postsRepository.createPost({user: session.user, code})
        console.log(createdPost)

        res.status(200).json(createdPost)
    } else {
        // Handle any other HTTP method
        res.status(404).json({ error: 'Not found' })
    }
}