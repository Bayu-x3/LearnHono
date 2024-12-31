import { Hono } from "hono";

import { getPost, createPost, updatePost, deletePost } from "../controllers/PostControllers";

const router = new Hono();

router.get('/', (c) => getPost(c));
router.post('/', (c) => createPost(c));
router.put('/:id', (c) => updatePost(c));
router.delete('/:id', (c) => deletePost(c));

export const Routes = router;