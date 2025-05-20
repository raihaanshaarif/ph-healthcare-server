import { NextFunction, Request, RequestHandler, Response } from "express";
import { UserService } from "./user.service";
import { sendResponse } from "../../../shared/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import { pick } from "../../../shared/pick";
import { userFilterableFields } from "./user.constant";

const createAdmin = async (req: Request, res: Response, next: NextFunction) => {
  // console.log(req.file);
  // console.log(req.body.data);
  try {
    const result = await UserService.createAdmin(req);
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

const createDoctor = async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.file);
  console.log(req.body);
  try {
    const result = await UserService.createDoctor(req);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Doctor created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const createPatient = async (req: Request, res: Response, next: NextFunction) => {
  // console.log(req.file);
  // console.log(req.body.data);
  try {
    const result = await UserService.createPatient(req);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Patient created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllFromDb: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, userFilterableFields);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

    const result = await UserService.getAllFromDb(filters, options);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Users fetched successfully",
      meta: result.meta,
      data: result.data,
    });
  }
);

const updateProfileStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
 


  const result = await UserService.updateProfileStatus(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User status updated successfully",
    data: result,
  });
}


export const UserController = {
  createAdmin,
  createDoctor,
  createPatient,
  getAllFromDb,
  updateProfileStatus
};
