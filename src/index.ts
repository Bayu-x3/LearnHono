import { Hono } from 'hono';
import { PostRoutes } from './routes/post';
import { FilmRoutes } from './routes/film';
import { CategoryRoutes } from './routes/category';

const app = new Hono().basePath('/api');

app.route('/posts', PostRoutes);
app.route('/films', FilmRoutes);
app.route('/category', CategoryRoutes);

export default app;
