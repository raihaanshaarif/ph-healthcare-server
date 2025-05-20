import { UserRole } from "../../../../generated/prisma";
import bcrypt from "bcrypt";
import { prisma } from "../../../shared/prisma";
import { fileUploader } from "../../../helpers/fileUploader";
import { Request } from "express";
import { Admin, Doctor, Patient, Prisma } from "@prisma/client";
import { IPaginationOptions } from "../../interfaces/pagination";
import { calculatePagination } from "../../../helpers/paginationHelper";
import { userSearchableFields } from "./user.constant";
import ApiError from "../../errors/ApiError";
import httpStatus from "http-status";

const createAdmin = async (req: Request): Promise<Admin> => {
  // console.log(req.file);
  // console.log(req.body.data);

  const file = req.file;

  if (file) {
    const uploadToCloudinary = (await fileUploader.uploadToCloudinary(
      file
    )) as { secure_url: string };
    req.body.admin.profilePhoto = uploadToCloudinary.secure_url;
    // console.log(req.body);
  }

  //hash password
  const hashedPassword = await bcrypt.hash(req.body.password, 12);
  // console.log(hashedPassword);

  // Simulate admin creation logic
  const userData = {
    email: req.body.admin.email,
    password: hashedPassword,
    role: UserRole.ADMIN,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    const createdUserData = await transactionClient.user.create({
      data: userData,
    });

    const createdAdminData = await transactionClient.admin.create({
      data: req.body.admin,
    });
    return createdAdminData;
  });
  // console.log(result);

  return result;
};

const createDoctor = async (req: Request): Promise<Doctor> => {
  // console.log(req.file);
  // console.log(req.body.data);

  const file = req.file;

  if (file) {
    const uploadToCloudinary = (await fileUploader.uploadToCloudinary(
      file
    )) as { secure_url: string };
    req.body.doctor.profilePhoto = uploadToCloudinary.secure_url;
    // console.log(req.body);
  }

  //hash password
  const hashedPassword = await bcrypt.hash(req.body.password, 12);
  // console.log(hashedPassword);

  // Simulate admin creation logic
  const userData = {
    email: req.body.doctor.email,
    password: hashedPassword,
    role: UserRole.DOCTOR,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    const createdUserData = await transactionClient.user.create({
      data: userData,
    });

    const createdAdminData = await transactionClient.doctor.create({
      data: req.body.doctor,
    });
    return createdAdminData;
  });
  console.log(result);

  return result;
};

const createPatient = async (req: Request): Promise<Patient> => {
  // console.log(req.file);
  // console.log(req.body.data);

  const file = req.file;

  if (file) {
    const uploadToCloudinary = (await fileUploader.uploadToCloudinary(
      file
    )) as { secure_url: string };
    req.body.patient.profilePhoto = uploadToCloudinary.secure_url;
    // console.log(req.body);
  }

  //hash password
  const hashedPassword = await bcrypt.hash(req.body.password, 12);
  // console.log(hashedPassword);

  // Simulate admin creation logic
  const userData = {
    email: req.body.patient.email,
    password: hashedPassword,
    role: UserRole.PATIENT,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    const createdUserData = await transactionClient.user.create({
      data: userData,
    });

    const createdPatientData = await transactionClient.patient.create({
      data: req.body.patient,
    });
    return createdPatientData;
  });
  // console.log(result);

  return result;
};

const getAllFromDb = async (
  params: any,
  options: IPaginationOptions
) => {
  // Ensure page, limit are numbers and sortBy, sortOrder are strings
  const safeOptions = {
    page: options.page ?? 1,
    limit: options.limit ?? 10,
    sortBy: options.sortBy ?? "createdAt",
    sortOrder: options.sortOrder ?? "desc",
  };

  const { limit, page, skip } = calculatePagination(safeOptions);

  const { searchTerm, ...filterableData } = params;

  const andCondition: Prisma.UserWhereInput[] = [];

  // [
  //   {
  //     name: {
  //       contains: params.searchTerm,
  //       mode: "insensitive",
  //     },
  //   },
  //   {
  //     email: {
  //       contains: params.searchTerm,
  //       mode: "insensitive",
  //     },
  //   },
  // ],

  if (params.searchTerm) {
    andCondition.push({
      OR: userSearchableFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  // filterable fields
  if (Object.keys(filterableData).length > 0) {
    andCondition.push({
      AND: Object.keys(filterableData).map((key) => ({
        [key]: {
          equals: (filterableData as any)[key],
        },
      })),
    });
  }


  // console.dir(andCondition, { depth: Infinity });

  const whereCondition: Prisma.UserWhereInput = andCondition.length > 0 ? {AND: andCondition} : {};

  const total = await prisma.user.count({
    where: whereCondition,
  });

  const result = await prisma.user.findMany({
    where: whereCondition,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : { createdAt: "desc" },
    select:{
      id: true,
      email: true,
      role: true,
      needsPasswordChange: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      admin: true,
      doctor: true,
      patient: true,

    }
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const updateProfileStatus = async (id: string, status: UserRole) => {

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
  })
 
 
  const updateUserStatus = await prisma.user.update({
    where: {
      id,
    },
    data: status
  })

  return updateUserStatus;

}

export const UserService = {
  createAdmin,
  createDoctor,
  createPatient,
  getAllFromDb,
  updateProfileStatus
};
