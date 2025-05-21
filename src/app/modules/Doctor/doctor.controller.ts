import { NextFunction, Request, RequestHandler, Response } from "express";

import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import { DoctorService } from "./doctor.service";
import { sendResponse } from "../../../shared/sendResponse";

const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await DoctorService.updateIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Doctor data updated!",
    data: result,
  });
});

export const DoctorController = {
  updateIntoDB,
};
