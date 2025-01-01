import { Context } from "hono";
import { z } from "zod";

import prisma from "../../prisma/client";

const sendResponse = (c: Context, status: number, success: boolean, message: string, data?: any) => {
    return c.json({ success, message, data });
};

export const getPost = async (c: Context) => {
    try {
        const posts = await prisma.post.findMany({ orderBy: { id: 'desc' } });
        return sendResponse(c, 200, true, 'List Data Post', posts);
    } catch (e) {
        console.error(`Error getting posts: ${e}`);
        return sendResponse(c, 500, false, 'Failed to fetch posts');
    }
};

const postSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    content: z.string().min(1, 'Content is required'),
    categoryId: z.coerce.number().min(1, 'CategoryID is required'),
})

export async function createPost(c: Context) {
    try {
        const body = await c.req.parseBody();
        const parseBody = postSchema.parse(body);

        const post = await prisma.post.create({
            data: parseBody
        })

        return sendResponse(c, 201, true, 'Post created success', post);

    } catch (e) {
        console.error(`Error creating post: ${e}`);
        if (e instanceof z.ZodError) {
            return sendResponse(c, 400, false, 'Validation error', e.errors);
        }
        return sendResponse(c, 500, false, 'Failed to create post');
    }
};

export const updatePost = async (c: Context) => {
    try {
        const id = c.req.param('id');
        if (!id) {
            return sendResponse(c, 400, false, 'Post ID is required');
        }

        const body = await c.req.parseBody();
        const parsedBody = postSchema.partial().parse(body); 

        const post = await prisma.post.update({
            where: { id: Number(id) },
            data: parsedBody,
        });

        return sendResponse(c, 200, true, 'Post updated successfully', post);

    } catch (e: any) {
        console.error(`Error updating post: ${e}`);
        if (e instanceof z.ZodError) {
            return sendResponse(c, 400, false, 'Validation error', e.errors);
        }
        if (e.code === 'P2025') {
            return sendResponse(c, 404, false, 'Post not found');
        }
        return sendResponse(c, 500, false, 'Failed to update post');
    }   
};

export const deletePost = async (c: Context) => {
    try {
        const id = c.req.param('id');
        if (!id) {  
            return sendResponse(c, 400, false, 'Post ID is required');
        }

        await prisma.post.delete({
            where: { id: Number(id) },
        });

        return sendResponse(c, 200, true, 'Post deleted successfully');
    } catch (e: any) {
        console.error(`Error deleting post: ${e}`);
        if (e.code === 'P2025') {
            return sendResponse(c, 404, false, 'Post not found');
        }
        return sendResponse(c, 500, false, 'Failed to delete post');
    }
};