import { Request, Response } from "express";
import { UserService } from "./user.service";
import { sendResponse } from "../../../shared/sendResponse";
import httpStatus from "http-status";

const createAdmin = async (req: Request, res: Response) => {
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
    res.status(500).json({
      success: false,
      message: (error as { name?: string })?.name || "failed to create admin",
      error: error,
    });
  }
};

export const UserController = {
  createAdmin,
};
