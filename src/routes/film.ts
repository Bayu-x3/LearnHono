import { Hono } from "hono";
import { createFilm, getFilm, updateFilm, deleteFilm} from "../controllers/FilmControllers";

const FilmRoutes = new Hono();

FilmRoutes.get('/', (c) => getFilm(c));
FilmRoutes.post('/', (c) => createFilm(c));
FilmRoutes.put('/:id', (c) => updateFilm(c));
FilmRoutes.delete('/:id', (c) => deleteFilm(c));

export { FilmRoutes };
