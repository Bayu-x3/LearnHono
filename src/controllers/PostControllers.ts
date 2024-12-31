import { Context } from "hono";

import prisma from "../../prisma/client";

export const getPost = async (c: Context) => {
    try{
        const posts = await prisma.post.findMany({ orderBy: {id: 'desc'}});

        return c.json({
            success: true,
            message: 'List Data Post',
            data: posts
        }, 200);
    } catch (e) {
        console.error(`Error getting post': ${e}`);
    }
}