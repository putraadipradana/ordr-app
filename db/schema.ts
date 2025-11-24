import { relations, sql } from "drizzle-orm";
import { pgTable, text, timestamp, boolean, pgEnum } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    emailVerified: boolean("email_verified").default(false).notNull(),
    image: text("image"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
    role: text("role"),
    banned: boolean("banned").default(false),
    banReason: text("ban_reason"),
    banExpires: timestamp("ban_expires"),
});

export const session = pgTable("session", {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
    impersonatedBy: text("impersonated_by"),
});

export const account = pgTable("account", {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
});

export const verification = pgTable("verification", {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
});

export type User = typeof user.$inferSelect;

export const statusEnum = pgEnum('order_status', ['Done', 'In Progress', 'Not Started']);
export const priorityEnum = pgEnum('order_priority', ['Low', 'Medium', 'High']);

export const orders = pgTable("orders", {
    id: text("id").primaryKey().default(sql`gen_random_uuid()`),
    userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
    orderNumber: text("order_number").notNull().unique(),
    name: text("name").notNull(),
    status: text("order_status").notNull().default("Not Started"),
    priority: text("order_priority").notNull().default("Low"),
    amount: text("amount").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
})

export const orderRelations = relations(orders, ({ many, one }) => ({
    materials: many(materials),
    user: one(user, {
        fields: [orders.userId],
        references: [user.id]
    })
}))

export type Order = typeof orders.$inferSelect
export type InsertOrder = typeof orders.$inferInsert


export const materials = pgTable("materials", {
    id: text("id").primaryKey().default(sql`gen_random_uuid()`),
    orderId: text("order_id").notNull().references(() => orders.id, { onDelete: 'cascade' }),
    number: text("number").notNull().unique(),
    name: text("name").notNull(),
    status: text("material_status").notNull().default("Order"),
    qty: text("qty").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
})

export const materialRelations = relations(materials, ({ one }) => ({
    order: one(orders, {
        fields: [materials.orderId],
        references: [orders.id]
    })
}))

export type InsertMaterial = typeof materials.$inferInsert

export const schema = { user, session, account, verification, orders }