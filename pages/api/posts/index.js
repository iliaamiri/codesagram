import {postsRepository} from "../../../lib/posts/repository";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const posts = await postsRepository.getAll()
        console.log(posts)

        res.status(200).json(posts)
    } else {
        // Handle any other HTTP method
        res.status(404).json({ error: 'Can\'t process this request' })
    }
}