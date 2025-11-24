"use server"

import { db } from "@/db/drizzle";
import { InsertOrder, orders } from "@/db/schema";
import { eq } from "drizzle-orm"

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
        }
    })

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

export const updateOrder = async (values: InsertOrder) => {
    try {
        await db.update(orders).set(values).where(eq(orders.id, orders.id));
        return { success: true, message: "Order updated successfully" };
    } catch {
        return { success: false, message: "Failed to update order" };
    }
};

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