import { Hono } from 'hono';
import { PostRoutes } from './routes/post';
import { FilmRoutes } from './routes/film';
import { CategoryRoutes } from './routes/category';
import { AuthRoutes } from './routes/auth';

const app = new Hono().basePath('/api');

const registeredRoutes: string[] = [];

const logRoute = (prefix: string, routes: any) => {
  registeredRoutes.push(`${prefix}`);
  console.log(`Registered routes: ${prefix}`);
};

// Daftar semua route
app.route('/posts', PostRoutes);
logRoute('/api/posts', PostRoutes);

app.route('/films', FilmRoutes);
logRoute('/api/films', FilmRoutes);

app.route('/category', CategoryRoutes);
logRoute('/api/category', CategoryRoutes);

app.route('/', AuthRoutes);
logRoute('/api', AuthRoutes);

console.log('All registered routes:', registeredRoutes);

app.fire();

export default app;
