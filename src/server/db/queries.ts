import "server-only"

import {
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