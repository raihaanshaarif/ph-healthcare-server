import { UserRole } from "../../../../generated/prisma";
import bcrypt from "bcrypt";
import { prisma } from "../../../shared/prisma";
import { fileUploader } from "../../../helpers/fileUploader";

const createAdmin = async (req: any) => {
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

export const UserService = {
  createAdmin,
};
