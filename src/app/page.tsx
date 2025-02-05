import {
  files as fileschema,
  folders as folderschema,
} from "~/server/db/schema";
import { db } from "~/server/db";
import DriveContents from "./drive-contents";

export default async function GoogleDriveClone() {
  const files = await db.select().from(fileschema);
  const folders = await db.select().from(folderschema);
  return <DriveContents files={files} folders={folders} />;
}
