import z from "zod";

export const createProductSchema = z.object({
  productName: z.string(),
  price: z.number(),
  stock: z.number(),
});

export const updateProductSchema = z.object({
  product_id: z.string(),
  productName: z.string(),
  price: z.number(),
  stock: z.number(),
});

export type updateProductType = z.infer<typeof updateProductSchema>;
export type createProductType = z.infer<typeof createProductSchema>;
