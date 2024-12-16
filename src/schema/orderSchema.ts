import z from "zod";

export const createOrderSchema = z.object({
  products: z.number().array(),
  purchasedAt: z.date(),
  status: z.enum(["Pending", "Completed"]),
});

export type createOrderType = z.infer<typeof createOrderSchema>;
