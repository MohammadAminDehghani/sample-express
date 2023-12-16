import { Request, Response } from "express";
import Category, { ICategory } from "../../../../models/category";
import User from "../../../../models/user";
import { faker } from "@faker-js/faker";
import { Schema } from "mongoose";

export const index = async (req: Request, res: Response): Promise<void> => {
  try {

    //await Category.updateMany({ description: "" }, { description: null });

    //faker
    // const Category = new Category({
    //   user: undefined,
    //   title: faker.string.uuid(),
    //   slug: faker.string.alpha(),
    //   body: faker.string.alpha(200),
    //   image: {},
    //   tags: 'image',
    //   viewCount: faker.number.int({min:0, max: 1000}),
    //   commentCount: faker.number.int({min:0, max: 1000}),
    //   categories: [],
    // });
    // await Category.save();

    const categories = await Category.find({})
    .populate("parentCategory")
    .populate("childCategories");

    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.log(error);
  }
};

export const store = async (req: Request, res: Response): Promise<void> => {
  try {
    // Handle Category creation logic here
    // Retrieve data from the request body and create a new Category

    const CategoryData: Partial<ICategory> = { ...req.body };
    const newCategory = new Category(CategoryData);
    await newCategory.save();
    res.json(newCategory);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.log(error);
  }
};

export const show = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);

    if (!category) {
      res.status(404).json({ error: "Category not found" });
      return;
    }

    res.json(category);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const edit = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    //const category = await Category.findById(id);
    const category = await Category.findById(id)
      .populate("parentCategory")
      .populate("childCategories");

    if (!category) {
      res.status(404).json({ error: "Category not found" });
      return;
    }

    // Render the edit Category form with the Category data
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id, parent } = req.body;
    //console.log('parent', parent);
    let updatedParent: Schema.Types.ObjectId | null | string = parent;
    if (parent === "parent") {
      updatedParent = null;
    }

    const CategoryData: Partial<ICategory> = {
      ...req.body,
      parent: updatedParent,
    };

    //console.log('updatedParent', updatedParent);
    console.log("CategoryData", CategoryData);

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      {
        ...CategoryData,
      },
      { new: true }
    );

    if (!updatedCategory) {
      res.status(404).json({ error: "Category not found" });
      return;
    }

    res.json(updatedCategory);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.log(error);
  }
};

export const destroy = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      res.status(404).json({ error: "Category not found" });
      return;
    }

    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
