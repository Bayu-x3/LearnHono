import { Hono } from "hono";
import { authMiddleware, roleMiddleware } from "../middlewares/authMiddleware";
import { getPost, createPost, updatePost, deletePost } from "../controllers/PostControllers";

const PostRoutes = new Hono();
PostRoutes.use('*', authMiddleware);

PostRoutes.get('/',roleMiddleware('Admin'), getPost);
PostRoutes.post('/', roleMiddleware('Admin'), createPost);
PostRoutes.put('/:id', roleMiddleware('Admin'), updatePost); 
PostRoutes.delete('/:id', roleMiddleware('Admin'), deletePost);

export { PostRoutes };
