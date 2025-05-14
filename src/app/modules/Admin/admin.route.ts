import express, { Request, Response, NextFunction } from "express";
import { AdminController } from "./admin.controller";

import validateRequest from "../../middlewares/validateRequest";
import { adminValidation } from "./admin.validation";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.get(
  "/", 
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN), 
  AdminController.getAllAdmins);
router.get(
  "/:id", 
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  AdminController.getSingleAdmin);
router.patch(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(adminValidation.update),
  AdminController.updateSingleAdmin
);
router.delete(
  "/:id", 
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  AdminController.deleteSingleAdmin);

export const AdminRoutes = router;
