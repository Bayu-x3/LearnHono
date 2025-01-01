import { Hono } from "hono";
import { register, login, logout } from "../controllers/AuthControllers";

export const AuthRoutes = new Hono();

AuthRoutes.post('/register', (c) => register(c));
AuthRoutes.post('/login', (c) => login(c));
AuthRoutes.post('/logout', (c) => logout(c));



export const Routes = AuthRoutes;