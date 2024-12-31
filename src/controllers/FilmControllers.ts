import { Context } from "hono";
import { z } from "zod";

import prisma from "../../prisma/client";

const sendResponse = (c: Context, status: number, success: boolean, message: string, data?: any) => {
    return c.json({ success, message, data });
};

export const getFilm = async (c: Context) => {
    try {

        const film = await prisma.films.findMany({orderBy: {id: 'desc'}});
        return sendResponse(c, 200, true, "Film found", film);

    } catch (e) {
        console.error(`Error : ${e}`);
    }
}