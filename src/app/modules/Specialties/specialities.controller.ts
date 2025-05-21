import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";

import httpStatus from "http-status";
import { SpecialtiesService } from "./specialities.service";
import { sendResponse } from "../../../shared/sendResponse";

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  console.log(req.body);
  const result = await SpecialtiesService.insertIntoDB(req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Specialties created successfully!",
    data: result,
  });
});

export const SpecialtiesController = {
  insertIntoDB,
};
