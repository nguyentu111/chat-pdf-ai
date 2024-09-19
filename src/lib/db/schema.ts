import {
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import {
  int,
  mysqlEnum,
  mysqlTable,
  timestamp as mysqlTimestamp,
  varchar as mysqlVarchar,
  text as mysqlText,
} from "drizzle-orm/mysql-core";
// export const userSystemEnum = pgEnum("user_system_enum", ["system", "user"]);

// export const chats = pgTable("chats", {
//   id: serial("id").primaryKey(),
//   pdfName: text("pdf_name").notNull(),
//   pdfUrl: text("pdf_url").notNull(),
//   createdAt: timestamp("created_at").notNull().defaultNow(),
//   userId: varchar("user_id", { length: 256 }).notNull(),
//   fileKey: text("file_key").notNull(),
// });

// export type DrizzleChat = typeof chats.$inferSelect;

// export const messages = pgTable("messages", {
//   id: serial("id").primaryKey(),
//   chatId: integer("chat_id")
//     .references(() => chats.id)
//     .notNull(),
//   content: text("content").notNull(),
//   createdAt: timestamp("created_at").notNull().defaultNow(),
//   role: userSystemEnum("role").notNull(),
// });

// export const userSubscriptions = pgTable("user_subscriptions", {
//   id: serial("id").primaryKey(),
//   userId: varchar("user_id", { length: 256 }).notNull().unique(),
//   stripeCustomerId: varchar("stripe_customer_id", { length: 256 })
//     .notNull()
//     .unique(),
//   stripeSubscriptionId: varchar("stripe_subscription_id", {
//     length: 256,
//   }).unique(),
//   stripePriceId: varchar("stripe_price_id", { length: 256 }),
//   stripeCurrentPeriodEnd: timestamp("stripe_current_period_ended_at"),
// });
export const chats = mysqlTable("chats", {
  id: int("id").primaryKey().autoincrement(),
  pdfName: mysqlVarchar("pdf_name", { length: 256 }).notNull(),
  pdfUrl: mysqlText("pdf_url").notNull(),
  createdAt: mysqlTimestamp("created_at").notNull().defaultNow(),
  userId: mysqlVarchar("user_id", { length: 256 }).notNull(),
  fileKey: mysqlText("file_key").notNull(),
});

export type DrizzleChat = typeof chats.$inferSelect;

export const messages = mysqlTable("messages", {
  id: int("id").primaryKey().autoincrement(),
  chatId: int("chat_id")
    .references(() => chats.id)
    .notNull(),
  content: mysqlText("content").notNull(),
  createdAt: mysqlTimestamp("created_at").notNull().defaultNow(),
  role: mysqlEnum("role", ["system", "user"]).notNull(),
});

export const userSubscriptions = mysqlTable("user_subscriptions", {
  id: int("id").primaryKey().autoincrement(),
  userId: mysqlVarchar("user_id", { length: 256 }).notNull().unique(),
  stripeCustomerId: mysqlVarchar("stripe_customer_id", { length: 256 })
    .notNull()
    .unique(),
  stripeSubscriptionId: mysqlVarchar("stripe_subscription_id", {
    length: 256,
  }).unique(),
  stripePriceId: mysqlVarchar("stripe_price_id", { length: 256 }),
  stripeCurrentPeriodEnd: mysqlTimestamp("stripe_current_period_ended_at"),
});
