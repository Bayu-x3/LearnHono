import { Context } from "hono";
import { z } from "zod";

import prisma from "../../prisma/client";

const sendResponse = (c: Context, status: number, success: boolean, message: string, data?: any) => {
    return c.json({ success, message, data });
};

const postSchema = z.object({
    name: z.string().min(1, 'Name is required')
})

export const getCategory = async (c: Context) => {
    try {

        const body = await prisma.category.findMany({orderBy: {id: 'desc'}})
        return sendResponse(c, 200, true, 'Category fetched successfully', body);

    } catch (e) {
        console.error(`Error : ${e}`);
    }
}

export async function createCategory(c:Context) {
    try {

        const body = await c.req.parseBody();
        const parseBody = postSchema.parse(body)

        const category = await prisma.category.create({
            data: parseBody,
        })

        return sendResponse(c, 201, true, 'Category created successfully', category);

    } catch (e) {
        console.error(`Error creating films: ${e}`);
            if (e instanceof z.ZodError) {
                return sendResponse(c, 400, false, 'Validation error', e.errors);
                }
                return sendResponse(c, 500, false, 'Failed to create Film');
                }
}
    
export async function updateCategory(c: Context) {
    try {

        const id = c.req.param('id');

        if (!id) {
            return sendResponse(c, 400, false, 'ID is required');
        }

        const body = await c.req.parseBody();
        const parseBody = postSchema.partial().parse(body);

        const category = await prisma.category.update({
            where: {id: Number(id)},
            data: parseBody,
        })

        return sendResponse(c, 200, true, 'Category updated successfully', category);

    } catch (e) {
        console.error(`Error updating films: ${e}`);
        if (e instanceof z.ZodError) {
            return sendResponse(c, 400, false, 'Validation error', e.errors);
            }
    }
}

export async function deleteCategory(c: Context) {
    try {

        const id = c.req.param('id')
        if (!id) {
            return sendResponse(c, 400, false, 'ID is required');
        }

        await prisma.category.delete({
            where: {id: Number(id)}
        })

        return sendResponse(c, 200, true, 'Category deleted successfully')

    } catch (e) {
        console.error(`Error deleting films: ${e}`);
    }
}