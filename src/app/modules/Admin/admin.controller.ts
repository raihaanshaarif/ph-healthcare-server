import { Request, Response } from "express";
import { AdminService } from "./admin.service";
import { pick } from "../../../shared/pick";
import { adminFilterableFields } from "./admin.constant";

const getAllAdmins = async (req: Request, res: Response) => {
  try {
    const filters = pick(req.query, adminFilterableFields);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

    const result = await AdminService.getAllAdmins(filters, options);

    res.status(200).json({
      status: "success",
      message: "Admins fetched successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: (error as { name?: string })?.name || "failed to fetch admins",
      error: error,
    });
  }
};

export const AdminController = {
  getAllAdmins,
};
