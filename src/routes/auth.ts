import { Hono } from "hono";
import { Context } from "express-validator/lib/context";
import { authMiddleware } from "../middlewares/authMiddleware";
import { register, login, logout } from "../controllers/AuthControllers";

export const AuthRoutes = new Hono();

AuthRoutes.post('/register', (c) => register(c));
AuthRoutes.post('/login', (c) => login(c));
AuthRoutes.post('/logout', (c) => logout(c));

AuthRoutes.get('/me', authMiddleware, async (c) => {
    const user = c.get('user');
    return c.json({ success: true, data: user });
});

export const Routes = AuthRoutes;