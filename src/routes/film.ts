import { Hono } from "hono";
import { getFilm } from "../controllers/FilmControllers";

const FilmRoutes = new Hono();

FilmRoutes.get('/', (c) => getFilm(c));

export { FilmRoutes };
