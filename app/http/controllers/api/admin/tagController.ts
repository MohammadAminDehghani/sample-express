import { Request, Response } from "express";
import Tag, { ITag } from "../../../../models/tag";
import User from "../../../../models/user";
import { faker } from "@faker-js/faker";

export const index = async (req: Request, res: Response): Promise<void> => {
  try {
    // const tag = new Tag({
    //   name: faker.string.alphanumeric(10),
    // });
    // await tag.save();

    const tags = await Tag.find({});
    //console.log(tags)
    res.json(tags);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.log(error);
  }
};

export const store = async (req: Request, res: Response): Promise<void> => {
  
  try {
    // Handle tag creation logic here
    // Retrieve data from the request body and create a new tag

    const tagData: Partial<ITag> = { ...req.body };
    const newTag = new Tag(tagData);
    await newTag.save();
    res.json(newTag);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.log(error);
  }
};

export const show = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const tag = await Tag.findById(id);

    if (!tag) {
      res.status(404).json({ error: "Tag not found" });
      return;
    }

    res.json(tag);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const edit = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const tag = await Tag.findById(id);

    if (!tag) {
      res.status(404).json({ error: "Tag not found" });
      return;
    }

    // Render the edit tag form with the tag data
    res.json(tag);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const update = async (req: Request, res: Response): Promise<void> => {

  try {

    const { id } = req.params;
    const tagData: Partial<ITag> = req.body;
    
    const updatedTag = await Tag.findByIdAndUpdate(
      id,
      { ...tagData },
      { new: true }
    );

    if (!updatedTag) {
      res.status(404).json({ error: "Tag not found" });
      return;
    }

    res.json(updatedTag);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.log(error);
  }
};

export const destroy = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedTag = await Tag.findByIdAndDelete(id);

    if (!deletedTag) {
      res.status(404).json({ error: "Tag not found" });
      return;
    }

    res.json({ message: "Tag deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const searchTagsByString = async (req: Request, res: Response): Promise<void> => {
  const searchString: string = req.params.query;
  try {
    //let tags = [];
    const tags = await Tag.find({ name: { $regex: searchString, $options: 'i' } });

    // if (searchString) {
    //   tags = await Tag.find({ name: { $regex: searchString, $options: 'i' } });
    // }
  
    // if (tags.length === 0) {
    //   tags = await Tag.find();
    // }

    res.json(tags);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};
