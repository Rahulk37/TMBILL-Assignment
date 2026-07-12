import { z } from "zod";

const createOrderSchema = z.object({
  body: z.object({
    store_id: z.string().trim().min(1, "Store ID is required"),

    order_id: z.string().trim().optional(),

    customer_name: z.string().trim().min(2, "Customer name is required"),

    items: z
      .array(
        z.object({
          item_id: z.string().trim().min(1, "Item ID is required"),

          item_name: z
            .string()
            .trim()
            .min(1, "Item name is required"),

          qty: z.number().int().min(1, "Quantity must be at least 1"),
        })
      )
      .min(1, "At least one item is required"),

    total_amount: z.number().positive("Total amount must be greater than 0"),

    status: z.enum(["PLACED", "PREPARING", "COMPLETED"]).optional(),
  }),
});

const updateStatusSchema = z.object({
  body: z.object({
    status: z.enum(["PLACED", "PREPARING", "COMPLETED"]),
  }),
});

module.exports = {
  createOrderSchema,
  updateStatusSchema,
};

export {};