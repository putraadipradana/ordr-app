"use server"

import { db } from "@/db/drizzle";
import { InsertOrder, orders } from "@/db/schema";
import { takeFirstOrThrow } from "@/db/utils";
import { getErrorMessage } from "@/lib/handle-error";
import { UpdateOrderSchema } from "@/lib/validations";
import { eq } from "drizzle-orm"
import { updateTag } from "next/cache";

export const createOrder = async (values: InsertOrder) => {
    try {
        await db.insert(orders).values(values)
        return { success: true, message: "Order created successfully" };
    } catch {
        return { success: false, message: "Failed to create order" };
    }
}

export const getOrders = async () => {
    const orders = await db.query.orders.findMany({
        columns: {
            id: true,
            orderNumber: true,
            name: true,
            status: true,
            priority: true,
            amount: true,
            createdAt: true
        },
        with: {
            user: {
                columns: {
                    name: true
                }
            }
        },
        orderBy: (orders, { desc }) => [desc(orders.createdAt)]
    })

    // await new Promise((resolve) => setTimeout((resolve), 5000))

    return orders;
}

export const getOrderById = async (id: string) => {
    try {
        const order = await db.query.orders.findFirst({
            where: eq(orders.id, id),
            columns: {
                id: true,
                orderNumber: true,
                name: true,
                createdAt: true,
            },
            with: {
                materials: {
                    columns: {
                        id: true,
                        number: true,
                        name: true,
                        qty: true,
                        status: true,
                        createdAt: true,
                        updatedAt: true
                    }
                }
            }
        })
        return { success: true, order }
    } catch {
        return { success: false, message: "Failed to get order" }
    }
}

export const deleteOrder = async (id: string) => {
    await db.delete(orders).where(eq(orders.id, id))

    return { success: true, message: "Order deleted" }
}

export const setOrderStatus = async (id: string) => {
    try {
        await db.update(orders).set({ status: "Done" }).where(eq(orders.id, id))
        return { success: true, message: "Item created successfully" };
    } catch {
        return { success: false, message: "Failed to create item" };
    }
}

export async function updateOrder(input: UpdateOrderSchema & { id: string }) {
    try {
        const data = await db.update(orders).set({
            orderNumber: input.orderNumber,
            name: input.name,
            status: input.status,
            priority: input.priority,
            amount: input.priority
        }).where(eq(orders.id, input.id)).returning({
            status: orders.status,
            priority: orders.priority,
        }).then(takeFirstOrThrow)

        updateTag("order")
        if (data.status === input.status) {
            updateTag("order-status-counts")
        }

        if (data.priority === input.priority) {
            updateTag("order-priority-counts");
        }

        return {
            data: null,
            error: null,
        };
    } catch (err) {
        return {
            data: null,
            error: getErrorMessage(err),
        };
    }
}