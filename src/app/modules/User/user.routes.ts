import express, { NextFunction, Request, Response } from "express";
import { UserController } from "./user.controller";
import auth from "../../middlewares/auth";
import { fileUploader } from "../../../helpers/fileUploader";
import { UserValidation } from "./user.validation";
import validateRequest from "../../middlewares/validateRequest";

const router = express.Router();

router.post(
  "/create-admin",
  auth("ADMIN", "SUPER_ADMIN"),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = UserValidation.createAdmin.parse(JSON.parse(req.body.data));
    return UserController.createAdmin(req, res, next);
  }
);

router.post(
  "/create-doctor",
  auth("ADMIN", "SUPER_ADMIN"),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = UserValidation.createDoctor.parse(JSON.parse(req.body.data));
    return UserController.createDoctor(req, res, next);
  }
);

router.post(
  "/create-patient", 
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = UserValidation.createPatient.parse(JSON.parse(req.body.data));
    return UserController.createPatient(req, res, next);
  }
);
router.get(
  "/", 
  auth("ADMIN", "SUPER_ADMIN"),
  UserController.getAllFromDb
);

router.patch(
  '/:id/status',
  auth("ADMIN", "SUPER_ADMIN"),
  validateRequest(UserValidation.updateStatus),
  UserController.updateProfileStatus
)

export const UserRoutes = router;
