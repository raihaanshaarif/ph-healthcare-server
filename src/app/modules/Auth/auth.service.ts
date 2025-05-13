import { prisma } from "../../../shared/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { jwtHelpers } from "../../../helpers/jwtHelpers";

// const generateToken = (payload: any, secret: string, expiresIn: string) => {
//   const token = jwt.sign(payload, secret, {
//     algorithm: "HS256",
//     expiresIn,
//   } as jwt.SignOptions);

//   return token;
// };

const loginUser = async (payload: { email: string; password: string }) => {
  // Check if the user exists
  const userData = await prisma.user.findUnique({
    where: {
      email: payload.email,
      status: "ACTIVE",
    },
  });

  const isCorrectPassword = await bcrypt.compare(
    payload.password,
    userData?.password || ""
  );
  if (!userData || !isCorrectPassword) {
    throw new Error("Invalid email or password");
  }

  // access token using JWT
  const accessToken = jwtHelpers.generateToken(
    {
      email: userData?.email,
      role: userData?.role,
    },
    process.env.JWT_ACCESS_SECRET as string,
    "5m"
  );

  const refreshToken = jwtHelpers.generateToken(
    {
      email: userData?.email,
      role: userData?.role,
    },
    process.env.JWT_REFRESH_SECRET as string,
    "30d"
  );

  return {
    accessToken,
    refreshToken,
    needPasswordChange: userData?.needsPasswordChange,
  };
};

const refreshToken = async (token: string) => {
  // Verify the refresh token
  let decodedData;
  try {
    decodedData = jwtHelpers.verifyToken(
      token,
      process.env.JWT_REFRESH_SECRET as string
    );
  } catch (error) {
    throw new Error("Invalid refresh token");
  }

  // Check if the user exists
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedData.email,
      status: "ACTIVE",
    },
  });

  // generate new access token
  const accessToken = jwtHelpers.generateToken(
    {
      email: userData?.email,
      role: userData?.role,
    },
    process.env.JWT_ACCESS_SECRET as string,
    "5m"
  );
  return {
    accessToken,
    needPasswordChange: userData?.needsPasswordChange,
  };
};

export const AuthService = {
  loginUser,
  refreshToken,
};
