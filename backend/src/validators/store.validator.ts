import { z } from "zod";

const createStoreSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(2, "Store name must be at least 2 characters")
      .max(100, "Store name cannot exceed 100 characters"),

    address: z
      .string()
      .trim()
      .min(2, "Address must be at least 2 characters")
      .max(255, "Address cannot exceed 255 characters")
      .optional(),
  }),
});

const updateStoreSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(2, "Store name must be at least 2 characters")
      .max(100, "Store name cannot exceed 100 characters")
      .optional(),

    address: z
      .string()
      .trim()
      .min(2, "Address must be at least 2 characters")
      .max(255, "Address cannot exceed 255 characters")
      .optional(),
  }),
});

module.exports = {
  createStoreSchema,
  updateStoreSchema,
};

export {};
