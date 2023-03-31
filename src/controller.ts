import { Request, Response } from "express";
import { UpdateCategoryDto } from "./dto";
import {
  createCategory,
  deactivateCategory,
  getCategoryDetail,
  searchCategory,
  updateCategory,
} from "./helper";

export const createCategoryController = async (req: Request, res: Response) => {
  const newCategory = await createCategory(req.body);

  if (!newCategory) {
    res.status(500).json({
      code: 500,
      status: "failed",
      msg: "Something went wrong try again later",
      data: null,
    });
    return;
  }

  res.status(201).json(newCategory);
};

export const searchCategoryController = async (req: Request, res: Response) => {
  const { query } = req.query;

  const categoryFound = await searchCategory(query!.toString());

  if (!categoryFound) {
    res.status(404).json({
      code: 404,
      status: "success",
      msg: "Category not found",
      data: null,
    });
    return;
  }

  res.status(200).json({
    code: 200,
    status: "success",
    msg: "Successfully get category",
    data: categoryFound,
  });
};

export const getCategoryDetailController = async (
  req: Request,
  res: Response
) => {
  const categoryFound = await getCategoryDetail(req.params.id);

  if (!categoryFound) {
    res.status(404).json({
      code: 404,
      status: "success",
      msg: "Category with that id not found",
      data: null,
    });
    return;
  }

  res.status(200).json({
    code: 200,
    status: "success",
    msg: "Successfully get category detail",
    data: categoryFound,
  });
};

export const updateCategoryController = async (req: Request, res: Response) => {
  const categoryUpdated = await updateCategory(
    req.params.id,
    req.body as UpdateCategoryDto
  );

  if (!categoryUpdated) {
    res.status(500).json({
      code: 500,
      status: "failed",
      msg: "Something went wrong! Try again later",
      data: null,
    });
  }

  res.status(200).json({
    code: 200,
    status: "success",
    msg: "Successfully update category",
    data: categoryUpdated,
  });
};

export const deactivateCategoryController = async (
  req: Request,
  res: Response
) => {
  const categoryDeactivated = await deactivateCategory(req.params.id);

  if (!categoryDeactivated) {
    return {
      code: 404,
      status: "success",
      msg: "Category with that id not found",
      data: null,
    };
  }

  res.status(200).json({
    code: 200,
    status: "success",
    msg: "Successfully deactivated category detail",
    data: categoryDeactivated,
  });
};
