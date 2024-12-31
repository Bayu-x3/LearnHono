import { Hono } from 'hono';
import { PostRoutes } from './routes/post';
import { FilmRoutes } from './routes/film';

const app = new Hono().basePath('/api');

app.route('/posts', PostRoutes);
app.route('/films', FilmRoutes);

export default app;
