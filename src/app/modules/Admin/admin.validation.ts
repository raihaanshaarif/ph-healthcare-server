import { z } from "zod";

const update = z.object({
  body: z.object({
    name: z.string().optional(),
    contactNo: z.string().optional(),
  }),
});

export const adminValidation = {
  update,
};
