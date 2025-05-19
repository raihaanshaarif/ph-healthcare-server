import { z } from "zod";

const createAdmin = z.object({
  password: z.string({
    required_error: "Password is required",
  }),
  admin: z.object({
    email: z.string({
      required_error: "Email is required",
    }),
    name: z.string({
      required_error: "Name is required",
    }),
    contactNumber: z.string({
      required_error: "Contact number is required",
    }),
  }),
});

export const UserValidation = {
  createAdmin,
};
