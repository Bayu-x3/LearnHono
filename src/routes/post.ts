import { Hono } from "hono";
import { getPost, createPost, updatePost, deletePost } from "../controllers/PostControllers";

const PostRoutes = new Hono();

PostRoutes.get('/', (c) => getPost(c));
PostRoutes.post('/', (c) => createPost(c));
PostRoutes.put('/:id', (c) => updatePost(c));
PostRoutes.delete('/:id', (c) => deletePost(c));

export { PostRoutes };
