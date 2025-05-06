import { Prisma } from "@prisma/client";

import { adminSearchableFields } from "./admin.constant";
import { calculatePagination } from "../../../helpers/paginationHelper";
import { prisma } from "../../../shared/prisma";

const getAllAdmins = async (params: any, options: any) => {
  // console.log({ params });

  const { limit, page, skip } = calculatePagination(options);

  const { searchTerm, ...filterableData } = params;

  const andCondition: Prisma.AdminWhereInput[] = [];

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
      OR: adminSearchableFields.map((field) => ({
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
          equals: filterableData[key],
        },
      })),
    });
  }
  // console.dir(andCondition, { depth: Infinity });

  const whereCondition: Prisma.AdminWhereInput = { AND: andCondition };

  const result = await prisma.admin.findMany({
    where: whereCondition,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : { createdAt: "desc" },
  });

  return result;
};

export const AdminService = {
  getAllAdmins,
};
