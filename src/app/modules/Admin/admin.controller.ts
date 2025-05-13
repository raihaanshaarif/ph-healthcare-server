import { Request, Response } from "express";
import { AdminService } from "./admin.service";
import { pick } from "../../../shared/pick";
import { adminFilterableFields } from "./admin.constant";
import { sendResponse } from "../../../shared/sendResponse";




const getAllAdmins = async (req: Request, res: Response) => {
  try {
    const filters = pick(req.query, adminFilterableFields);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

    const result = await AdminService.getAllAdmins(filters, options);



    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Admins fetched successfully",
      meta: result.meta,
      data: result.data,
    })


  } catch (error) {
    res.status(500).json({
      success: false,
      message: (error as { name?: string })?.name || "failed to fetch admins",
      error: error,
    });
  }
};

const getSingleAdmin = async (req: Request, res: Response) => {
  const result = await AdminService.getSingleAdmin(req.params.id)

  sendResponse(res, {
    statusCode: 200,  
    success: true,
    message: "Admin fetched successfully",
    data: result,
  })

}

const updateSingleAdmin = async (req: Request, res: Response) => {
  const result= await AdminService.updateSingleAdmin(req.params.id, req.body)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Admin updated successfully",
    data: result,
  })
}
const deleteSingleAdmin = async (req: Request, res: Response) => {
  const result= await AdminService.deleteSingleAdmin(req.params.id)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Admin deleted successfully",
    data: result,
  })
}

export const AdminController = {
  getAllAdmins,
  getSingleAdmin,
  updateSingleAdmin,
  deleteSingleAdmin
};
