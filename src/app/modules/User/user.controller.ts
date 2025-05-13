import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";
import { sendResponse } from "../../../shared/sendResponse";
import httpStatus from "http-status";

const createAdmin = async (req: Request, res: Response, next: NextFunction) => {
  // console.log(req.body);
  try {
    const result = await UserService.createAdmin(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK, 
      success: true,
      message: "Admin created successfully",
      data: result,
    });
  } catch (error) {
      next(error);
  }
};

export const UserController = {
  createAdmin,
};
