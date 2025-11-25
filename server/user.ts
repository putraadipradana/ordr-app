'use server'
import { db } from "@/db/drizzle";
import { user } from "@/db/schema";
import { auth } from "@/lib/auth";
import { desc } from "drizzle-orm";
import { headers } from "next/headers";

export const signInUser = async (email: string, password: string) => {
    try {
        await auth.api.signInEmail({
            body: {
                email,
                password
            },
        });

        return { success: true, message: "Signed in successfully" }
    } catch (error) {
        const e = error as Error
        return { success: false, message: e.message || "Failed to sign in" }
    }
}

export const signUpUser = async (email: string, password: string, name: string) => {
    try {
        await auth.api.signUpEmail({
            body: {
                email,
                password,
                name
            },
        });

        return { success: true, message: "Please check your email for verification" }
    } catch (error) {
        const e = error as Error
        return { success: false, message: e.message || "Failed to sign up" }
    }
}


export async function signOutUser() {
    try {
        await auth.api.signOut({
            headers: await headers()
        })

        return { success: true, message: "Logged out" };
    } catch (error) {
        const e = error as Error;
        return { success: false, message: e.message || "Failed to log out" };
    }
}

export const getUsers = async () => {
    const response = await db.query.user.findMany({
        columns: {
            id: true,
            name: true,
            image: true,
            email: true,
            role: true,
            createdAt: true
        },
        orderBy: [desc(user.createdAt)]
    })

    // await new Promise((resolve) => setTimeout((resolve), 5000))

    return response
}