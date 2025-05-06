import { Request, Response } from "express";
import { UserService } from "./user.service";

const createAdmin = async (req: Request, res: Response) => {
  // console.log(req.body);
  try {
    const result = await UserService.createAdmin(req.body);
    res.status(200).json({
      status: "success",
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
