import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/drizzle"; // your drizzle instance
import { schema } from '@/db/schema'
import { admin as adminPlugin } from "better-auth/plugins"
import { ac, admin, user } from "./auth/permissions"
import { nextCookies } from "better-auth/next-js";
import { Resend } from 'resend';
import UserVerificationEmail from "@/components/emails/verification-email";
import PasswordResetEmail from "@/components/emails/password-reset-email";

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
    emailVerification: {
        sendVerificationEmail: async ({ user, url }) => {
            await resend.emails.send({
                from: 'Ordr <admin@ordr.space>',
                to: user.email,
                subject: 'Verify your email address',
                react: UserVerificationEmail({ userName: user.name, userEmail: user.email, verificationUrl: url }),
            });
        },
        sendOnSignUp: true,
    },
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
        sendResetPassword: async ({ user, url }) => {
            await resend.emails.send({
                from: 'Ordr <admin@ordr.space>',
                to: user.email,
                subject: 'Reset your password',
                react: PasswordResetEmail({ userName: user.name, resetUrl: url, requestTime: new Date().toLocaleString() }),
            });
        },
    },
    database: drizzleAdapter(db, {
        provider: "pg", // or "mysql", "sqlite"
        schema
    }),
    plugins: [adminPlugin({
        ac,
        roles: {
            admin,
            user,
        }
    }), nextCookies()] // make sure this is the last plugin in the array
});