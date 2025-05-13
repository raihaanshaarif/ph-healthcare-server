import express, { Request, Response, NextFunction } from "express";
import { AdminController } from "./admin.controller";

import validateRequest from "../../middlewares/validateRequest";
import { adminValidation } from "./admin.validation";

const router = express.Router();

router.get("/", AdminController.getAllAdmins);
router.get("/:id", AdminController.getSingleAdmin);
router.patch(
  "/:id",
  validateRequest(adminValidation.update),
  AdminController.updateSingleAdmin
);
router.delete("/:id", AdminController.deleteSingleAdmin);

export const AdminRoutes = router;
