import { NextFunction, Request, Response } from "express";
import { AdminService } from "./admin.service";
import { pick } from "../../../shared/pick";
import { adminFilterableFields } from "./admin.constant";
import { sendResponse } from "../../../shared/sendResponse";
import httpStatus from "http-status";



const getAllAdmins = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filters = pick(req.query, adminFilterableFields);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

    const result = await AdminService.getAllAdmins(filters, options);



    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admins fetched successfully",
      meta: result.meta,
      data: result.data,
    })


  } catch (error) {
    next(error);
  }
};

const getSingleAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AdminService.getSingleAdmin(req.params.id)

  sendResponse(res, {
    statusCode: httpStatus.OK,  
    success: true,
    message: "Admin fetched successfully",
    data: result,
  })} catch (error) {
    next(error);
  }
  

}

const updateSingleAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const result= await AdminService.updateSingleAdmin(req.params.id, req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK, 
    success: true,
    message: "Admin updated successfully",
    data: result,
  })
  } catch (error) {
    next(error);
  }
}
const deleteSingleAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const result= await AdminService.deleteSingleAdmin(req.params.id)

  sendResponse(res, {
    statusCode: httpStatus.OK, 
    success: true,
    message: "Admin deleted successfully",
    data: result,
  })} catch (error) {
    next(error);    
      }
}

export const AdminController = {
  getAllAdmins,
  getSingleAdmin,
  updateSingleAdmin,
  deleteSingleAdmin
};
