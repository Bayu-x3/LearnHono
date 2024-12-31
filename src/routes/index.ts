import { Hono } from "hono";

import { getPost } from "../controllers/PostControllers";

const router = new Hono();

router.get('/', (c) => getPost(c));

export const Routes = router;