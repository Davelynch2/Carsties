'use server';

import { auth } from "@/auth";

export async function getCurrentUser() {
    try {
        const session = await auth();

        if (!session) {
            console.log("No session found.");
            return null;
        }
        console.log("Session found:", session);
        return session.user;

    } catch (error) {
        console.error("Failed to get current user:", error);
        return null;
    }
}