import { Context } from "hono";
import { z } from "zod";

import prisma from "../../prisma/client";

const sendResponse = (c: Context, status: number, success: boolean, message: string, data?: any) => {
    return c.json({ success, message, data });
};

const postSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    sinopsis: z.string().min(1, 'Sinopsis is required'),
    year: z.coerce.number().min(1, 'Year is required'),
});

export const getFilm = async (c: Context) => {
    try {

        const film = await prisma.films.findMany({orderBy: {id: 'desc'}});
        return sendResponse(c, 200, true, "Film found", film);

    } catch (e) {
        console.error(`Error : ${e}`);
    }
}

export async function createFilm(c: Context,) {
    try {

        const body = await c.req.parseBody();
        const parseBody = postSchema.parse(body);

        const films = await prisma.films.create({
            data: parseBody
        })

        return sendResponse(c, 200, true, 'Film created successfully', films);

    } catch (e) {
        console.error(`Error creating films: ${e}`);
        if (e instanceof z.ZodError) {
            return sendResponse(c, 400, false, 'Validation error', e.errors);
        }
            return sendResponse(c, 500, false, 'Failed to create Film');
        }
}

export async function updateFilm(c: Context) {
    try {
        const id = c.req.param('id');
        if (!id) {
            return sendResponse(c, 400, false, 'Film ID is Required');
        }

        const body = await c.req.parseBody();
        const parseBody = postSchema.partial().parse(body);

        const films = await prisma.films.update({
            where: {id: Number(id)},
            data: parseBody
        })

        return sendResponse(c, 200, true, 'Film updated successfully', films);

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
}

export const deleteFilm = async (c: Context) => {
    try {
        const id = c.req.param('id');
        if (!id) {  
            return sendResponse(c, 400, false, 'film ID is required');
        }

        await prisma.films.delete({
            where: { id: Number(id) },
        });

        return sendResponse(c, 200, true, 'film deleted successfully');
    } catch (e: any) {
        console.error(`Error deleting film: ${e}`);
        if (e.code === 'P2025') {
            return sendResponse(c, 404, false, 'film not found');
        }
        return sendResponse(c, 500, false, 'Failed to delete film');
    }
};