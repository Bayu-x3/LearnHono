import { Context } from "hono";

export interface CustomContext {
  user?: {
    id: number;
    username: string;
    role: "Admin" | "User";
  };
}

export type AppContext = Context & CustomContext;
