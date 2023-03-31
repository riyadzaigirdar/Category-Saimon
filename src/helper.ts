import client from "./redis";
import mongoose from "mongoose";
import { categoryModel } from "./schemas/category.schema";
import { CreateCategoryDto, UpdateCategoryDto } from "./dto";

export const createCategory = async (body: CreateCategoryDto) => {
  try {
    const newCategory = await categoryModel.create(body);

    newCategory.save();

    return newCategory;
  } catch (error) {
    return null;
  }
};

export const searchCategory = async (search: string) => {
  try {
    const cached = await getFromRedis(search.trim());

    if (cached) {
      return JSON.parse(cached);
    }

    const category = await categoryModel
      .findOne({
        name: { $regex: search.trim(), $options: "i" },
      })
      .populate({
        path: "subCategories",
        populate: {
          path: "subCategories",
          model: "category",
        },
      });

    if (!category) {
      return null;
    }

    await setToRedis(search.trim(), JSON.stringify(category), 60);

    return category;
  } catch (error) {
    return null;
  }
};

export const getCategoryDetail = async (_id: string) => {
  const cached = await getFromRedis(_id);

  if (cached) {
    return JSON.parse(cached);
  }

  const category = await categoryModel.findOne({ _id }).populate({
    path: "subCategories",
    populate: {
      path: "subCategories",
      model: "category",
    },
  });

  if (!category) {
    return null;
  }

  await setToRedis(_id, JSON.stringify(category), 60);

  return category;
};

export const updateCategory = async (_id: string, body: UpdateCategoryDto) => {
  const category = await categoryModel.findOne({ _id });

  if (!category) {
    return null;
  }

  if (body.name) {
    category.name = body.name;
  }

  if (body.subCategories !== undefined) {
    category.subCategories = body.subCategories.map(
      (item) => new mongoose.Types.ObjectId(item)
    );
  }

  if (body.isActive !== undefined) {
    category.isActive = body.isActive;
  }

  category.save();

  return category;
};

export const deactivateCategory = async (_id: string) => {
  const category = await categoryModel.findOne({ _id }).populate({
    path: "subCategories",
    populate: {
      path: "subCategories",
      model: "category",
    },
  });

  if (!category) {
    return null;
  }

  const ids = extractAllCategoryIds(category, new Set());

  const updatedDocs = await categoryModel.updateMany(
    { _id: ids },
    { $set: { isActive: false } },
    { new: true }
  );

  return updatedDocs;
};

export const extractAllCategoryIds = (
  category: any,
  hashSet: Set<string>
): string[] => {
  const result = [];

  // check for if the _id has already been pushed in the arr and is active
  if (!hashSet.has(category._id.toString()) && category.isActive === true) {
    result.push(category._id);
    hashSet.add(category._id.toString());
  }

  // look for sub categories (if it has any)
  for (let i = 0; i < category.subCategories.length; i++) {
    result.push(...extractAllCategoryIds(category.subCategories[i], hashSet));
  }

  return result;
};

export const setToRedis = async (key: string, value: string, time: number) => {
  await client.set(key, value, { EX: time });
};
export const getFromRedis = async (key: string) => {
  return client.get(key);
};
