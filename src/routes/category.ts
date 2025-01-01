import { Hono } from "hono";
import { createCategory, getCategory, updateCategory, deleteCategory} from "../controllers/CategoryControllers";

const CategoryRoutes = new Hono();

CategoryRoutes.get('/', (c) => getCategory(c));
CategoryRoutes.post('/', (c) => createCategory(c));
CategoryRoutes.put('/:id', (c) => updateCategory(c));
CategoryRoutes.delete('/:id', (c) => deleteCategory(c));

export { CategoryRoutes };
