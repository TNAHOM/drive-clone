import {
  files as fileschema,
  folders as folderschema,
} from "~/server/db/schema";
import { db } from "~/server/db";
import DriveContents from "../../drive-contents";
import { eq } from "drizzle-orm";

export default async function GoogleDriveClone(props: {
  params: Promise<{ folderId: string }>;
}) {
  const params = await props.params;

  const parsedFolderId = parseInt(params.folderId);

  if (isNaN(parsedFolderId)) {
    return <div>Invalid folder ID</div>;
  }

  const files = await db
    .select()
    .from(fileschema)
    .where(eq(fileschema.parent, parsedFolderId));
  const folders = await db
    .select()
    .from(folderschema)
    .where(eq(folderschema.parent, parsedFolderId));
  return <DriveContents files={files} folders={folders} />;
}
