import { Admin, Prisma } from "@prisma/client";

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

  andCondition.push({
    isDeleted: false,
  });
  // console.dir(andCondition, { depth: Infinity });

  const whereCondition: Prisma.AdminWhereInput = { AND: andCondition };

  const total = await prisma.admin.count({
    where: whereCondition,  
  })

  const result = await prisma.admin.findMany({
    where: whereCondition,
    skip,
    take: limit,    
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : { createdAt: "desc" },
  });

  return {
    meta: {
      page,
      limit,
      total
    },    
    data:result
  }
};
const getSingleAdmin= async(id: string):Promise<Admin | null> =>{
  const result = await prisma.admin.findUnique({
    where: {
      id: id,
      isDeleted: false
    }
  })
  return result
}

const updateSingleAdmin = async(id: string, payload: any):Promise<Admin| null> =>  {

  const isExist = await prisma.admin.findUniqueOrThrow({
    where: {
      id: id,
      isDeleted: false
    }
  }).catch((err) => {
    throw new Error("Admin not found")
  })

  console.log(id, payload);
  const result = await prisma.admin.update(
    {
      where: {
        id: id
      },
      data: payload
    }
  )
  return result
}

const deleteSingleAdmin = async(id: string) => {
  const isExist = await prisma.admin.findUniqueOrThrow({
    where: {
      id: id,
      isDeleted: false
    }
  }).catch((err) => {
    throw new Error("Admin not found")
  }
  )

  const result= await prisma.$transaction(async (tx) => {
    const deleteAdmin = await tx.admin.update({
      where: {
        id: id
      },
      data:{
        isDeleted: true,
      }
    })

    await tx.user.update({
      where: {
        email: deleteAdmin.email
      },
      data: {
        status: "DELETED"
      }
    })

    return deleteAdmin
  })

}





export const AdminService = {
  getAllAdmins,
  getSingleAdmin,
  updateSingleAdmin,
  deleteSingleAdmin
};
