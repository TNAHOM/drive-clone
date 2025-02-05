import "server-only";

import { bigint, text, index, singlestoreTableCreator } from
  "drizzle-orm/singlestore-core";


export const createTable = singlestoreTableCreator((name) => `drive-clone-v2_${name}`)

export const files = createTable("files_table", {
  id: bigint("id", { mode: "number", unsigned: true }).primaryKey().autoincrement(),
  name: text("name").notNull(),
  size: text("size").notNull(),
  url: text("url").notNull(),
  parent: bigint("parent", { mode: "number", unsigned: true }).notNull(),
}, (t) => {
  return [index("parent_index").on(t.parent)];
})


export const folders = createTable("folders_table", {
  id: bigint("id", { mode: "number", unsigned: true }).primaryKey().autoincrement(),
  name: text("name").notNull(),
  parent: bigint("parent", { mode: "number", unsigned: true }).notNull(),
}, (t) => {
  return [index('parent_index').on(t.parent)];
})

// @1:12:34