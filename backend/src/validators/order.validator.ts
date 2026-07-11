const { z } = require("zod");

const createOrderSchema = z.object({
  store_id: z.string().min(1, "Store ID is required"),

  items: z.array(
    z.object({
      item_id: z.string().min(1),
      qty: z.number().min(1),
    })
  ),

  total_amount: z.number().positive(),
});

const updateStatusSchema = z.object({
  status: z.enum([
    "PLACED",
    "PREPARING",
    "COMPLETED",
  ]),
});

module.exports = {
  createOrderSchema,
  updateStatusSchema,
};export {};