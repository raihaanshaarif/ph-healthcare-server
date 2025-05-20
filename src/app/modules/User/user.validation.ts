import { Gender, UserStatus } from "@prisma/client";
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

const createDoctor = z.object({
  password: z.string({
      required_error: "Password is required"
  }),
  doctor: z.object({
      name: z.string({
          required_error: "Name is required!"
      }),
      email: z.string({
          required_error: "Email is required!"
      }),
      contactNumber: z.string({
          required_error: "Contact Number is required!"
      }),
      address: z.string().optional(),
      registrationNumber: z.string({
          required_error: "Reg number is required"
      }),
      experience: z.number().optional(),
      gender: z.enum([Gender.MALE, Gender.FEMALE]),
      appointmentFee: z.number().optional(),
      qualification: z.string().optional(),
      currentWorkingPlace: z.string().optional(),
      designation: z.string().optional(),
  })
});


const createPatient = z.object({
  password: z.string({
    required_error: "Password is required",
  }),
  patient: z.object({
    name: z.string({
      required_error: "Name is required",
    }),
    email: z.string({
      required_error: "Email is required",
    }),
    contactNumber: z.string({
      required_error: "Contact number is required",
    }),
    address: z.string({
      required_error: "Address is required",
    })
  }),
});

const updateStatus = z.object({
  body: z.object({
      status: z.enum([UserStatus.ACTIVE, UserStatus.BLOCKED, UserStatus.DELETED])
  })
})

export const UserValidation = {
  createAdmin,
  createDoctor,
  createPatient,
  updateStatus
};
