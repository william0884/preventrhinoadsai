// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import {
  pgTableCreator,
  text,
  pgTable,
  serial,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `prevent-rhino-ads-ai_${name}`);

export const accidentAd = pgTable(
  "accidentAd",
  {
    id: serial("id").primaryKey(),
    defaultId: text("defaultId").notNull(),
    sentence: text("sentence").notNull(),
    url: text("url").notNull(),
    imgdescribe: text("imgdescribe").notNull(),
    userId: text("userId").notNull(),
  },
)