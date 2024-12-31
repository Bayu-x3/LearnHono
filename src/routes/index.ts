import { Hono } from "hono";

import { getPost, createPost } from "../controllers/PostControllers";

const router = new Hono();

router.get('/', (c) => getPost(c));
router.post('/', (c) => createPost(c));

export const Routes = router;