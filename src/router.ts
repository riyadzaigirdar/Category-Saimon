import { Router } from "express";
import {
  createCategoryController,
  searchCategoryController,
  getCategoryDetailController,
  updateCategoryController,
  deactivateCategoryController,
} from "./controller";

const router = Router();

router
  .get("search", searchCategoryController)
  .get(":id", getCategoryDetailController)
  .post("", createCategoryController)
  .patch(":id", updateCategoryController)
  .patch(":id/deactivate", deactivateCategoryController);

export default router;
