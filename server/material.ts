"use server"

import { db } from "@/db/drizzle";
import { InsertMaterial, materials } from "@/db/schema";
import { eq } from "drizzle-orm"

export const addMaterial = async (values: InsertMaterial) => {
    try {
        await db.insert(materials).values(values)
        return { success: true, message: "Material added" };
    } catch {
        return { success: false, message: "Failed to add material" };
    }
}

export const deleteMaterial = async (id: string) => {
    try {
        await db.delete(materials).where(eq(materials.id, id))
        return { success: true, message: "Material deleted successfully" }
    } catch {
        return { success: false, message: "Failed to add material" }
    }
}