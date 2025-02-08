import "server-only"

import {
    type DB_FILETYPE,
    files_table as fileschema,
    folders_table as folderschema,
} from "~/server/db/schema";
import { db } from "~/server/db";
import { eq } from "drizzle-orm";

export async function getAllParentsForFolder(folderId: number) {
    const parents = [];

    let currentId: number | null = folderId;

    while (currentId !== null) {
        const folder = await db
            .select()
            .from(folderschema)
            .where(eq(folderschema.id, currentId));

        if (!folder[0]) {
            throw new Error("Folder not found");
        }
        parents.unshift(folder[0]);
        currentId = folder[0]?.parent;
    }
    return parents;
}

export function getFiles(folderId: number) {

    return db
        .select()
        .from(fileschema)
        .where(eq(fileschema.parent, folderId));

}
export function getFolders(folderId: number) {
    return db
        .select()
        .from(folderschema)
        .where(eq(folderschema.parent, folderId));

}

export async function getFolderId(folderId: number) {
    const folder = await db
        .select()
        .from(folderschema)
        .where(eq(folderschema.id, folderId));

    return folder[0]
}

export const MUTATIONS = {
    createFiles: async function (input: {
        file: {
            name: string;
            size: number;
            url: string;
            parent: number;
        };
        userId: string;
    }) {

        return await db.insert(fileschema).values({
            ...input.file,
            ownerId: input.userId,
        })
    }
}