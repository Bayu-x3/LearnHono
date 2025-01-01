import { Hono } from "hono";

import { getPost, createPost, updatePost, deletePost } from "../controllers/PostControllers";
import { getFilm } from "../controllers/FilmControllers";

const router = new Hono();

router.get('/', (c) => getPost(c));
router.post('/', (c) => createPost(c));
router.put('/:id', (c) => updatePost(c));
router.delete('/:id', (c) => deletePost(c));

router.get('/', (c) => getFilm(c));

export const Routes = router;