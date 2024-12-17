import z from "zod";

export const createOrderSchema = z.object({
  products: z.string().array(),
  purchasedAt: z.date().optional(),
  status: z.string().default("Pending"),
});

export type createOrderType = z.infer<typeof createOrderSchema>;
