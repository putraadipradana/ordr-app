import z from "zod";

export const updateOrderSchema = z.object({
    orderNumber: z.string().optional(),
    name: z.string().optional(),
    status: z.string().optional(),
    priority: z.string().optional(),
    amount: z.string().optional()
})

export type UpdateOrderSchema = z.infer<typeof updateOrderSchema>