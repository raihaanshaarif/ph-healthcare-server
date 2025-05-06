import { UserRole } from "../../../../generated/prisma";
import bcrypt from "bcrypt";
import { prisma } from "../../../shared/prisma";

const createAdmin = async (data: any) => {
  //hash password
  const hashedPassword = await bcrypt.hash(data.password, 12);
  console.log(hashedPassword);
  console.log(data);
  // Simulate admin creation logic
  const userData = {
    email: data.admin.email,
    password: hashedPassword,
    role: UserRole.ADMIN,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    const createdUserData = await transactionClient.user.create({
      data: userData,
    });

    const createdAdminData = await transactionClient.admin.create({
      data: data.admin,
    });
    return createdAdminData;
  });

  return result;
};

export const UserService = {
  createAdmin,
};
