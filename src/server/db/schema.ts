// import "server-only";

import { bigint, int, text, index, singlestoreTableCreator } from
  "drizzle-orm/singlestore-core";
import { timestamp } from "drizzle-orm/mysql-core";
import { sql } from 'drizzle-orm';


export const createTable = singlestoreTableCreator((name) => `drive_clone_v2_${name}`)

export const files_table = createTable("files_table", {
  id: bigint("id", { mode: "number", unsigned: true }).primaryKey().autoincrement(),
  ownerId: text("owner_id").notNull(),
  name: text("name").notNull(),
  size: int("size").notNull(),
  url: text("url").notNull(),
  parent: bigint("parent", { mode: "number", unsigned: true }).notNull(),
  // createdAt: timestamp("created_at").notNull().default(sql`now()`),
}, (t) => {
  return [
    index("parent_index").on(t.parent),
    index('owner_id_index').on(t.ownerId)
  ];
})

export type DB_FILETYPE = typeof files_table.$inferSelect;


export const folders_table = createTable("folders_table", {
  id: bigint("id", { mode: "number", unsigned: true }).primaryKey().autoincrement(),
  name: text("name").notNull(),
  ownerId: text("owner_id").notNull(),
  parent: bigint("parent", { mode: "number", unsigned: true }),
  // createdAt: timestamp("created_at").notNull().default(sql`now()`),

}, (t) => {
  return [
    index('parent_index').on(t.parent),
    index('owner_id_index').on(t.ownerId)
  ];
})

export type DB_FOLDER_TYPE = typeof folders_table.$inferSelect;