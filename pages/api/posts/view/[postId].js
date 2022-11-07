import {postsRepository} from "../../../../lib/posts/repository";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        // Process a POST request
        const { postId } = req.query
        if (!postId || isNaN(parseInt(postId))) {
            res.status(400).send({error: 'No postId provided'})
            return
        }

        const foundPost = await postsRepository.findById(parseInt(postId))
        console.log(foundPost)

        res.status(200).json(foundPost)
    } else {
        // Handle any other HTTP method
        res.status(404).json({ error: 'Can\'t process this request' })
    }
}