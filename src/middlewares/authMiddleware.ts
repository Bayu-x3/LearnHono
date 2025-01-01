import { Next } from "hono";
import * as jwt from "jsonwebtoken";
import { AppContext } from "../types/context";

const JWT_SECRET = 'bceb313112646bce60e1b84e4e9fbcb770545e4082663e535312757aaf732e7b';

export const authMiddleware = async (c: AppContext, next: Next) => {
    const authHeader = c.req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return c.json({ success: false, message: "Unauthorized: Token is required" }, 401);
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as {
            id: number;
            username: string;
            role: "Admin" | "User";
        };
        c.set('user', decoded);
        await next();
    } catch (err) {
        return c.json({ success: false, message: "Unauthorized: Invalid token" }, 401);
    }
};

export const roleMiddleware = (requiredRole: "Admin" | "User") => {
    return async (c: AppContext, next: Next) => {
        const user = c.get('user');

        if (!user || user.role !== requiredRole) {
            return c.json({ success: false, message: "Forbidden: Insufficient permissions" }, 403);
        }

        await next();
    };
};
