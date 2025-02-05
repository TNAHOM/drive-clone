import {
  files as fileschema,
  folders as folderschema,
} from "~/server/db/schema";
import { db } from "~/server/db";
import DriveContents from "../../drive-contents";
import { eq } from "drizzle-orm";

async function getAllParents(folderId: number) {
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

export default async function GoogleDriveClone(props: {
  params: Promise<{ folderId: string }>;
}) {
  const params = await props.params;

  const parsedFolderId = parseInt(params.folderId);

  if (isNaN(parsedFolderId)) {
    return <div>Invalid folder ID</div>;
  }

  const filesPromise = db
    .select()
    .from(fileschema)
    .where(eq(fileschema.parent, parsedFolderId));
  const foldersPromise = db
    .select()
    .from(folderschema)
    .where(eq(folderschema.parent, parsedFolderId));

  const parentsPromise = getAllParents(parsedFolderId);
  // avoids using the await for each featching(files, foldersPromise), make it faster using this method because it makes it in parallel fetching
  const [files, folders, parents] = await Promise.all([
    filesPromise,
    foldersPromise,
    parentsPromise,
  ]);
  return <DriveContents files={files} folders={folders} parents={parents} />;
}
