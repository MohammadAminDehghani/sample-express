import mongoose, { Schema, Document, Model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

export interface ICategory extends Document {
  name: string;
  description: string | null;
  parent: ICategory | null;
  parentCategory?: ICategory | null; // Virtual field
  childCategories?: ICategory[]; // Virtual field
}

const CategoriesSchema: Schema<ICategory> = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      nullable: true,
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
      nullable: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

CategoriesSchema.plugin(mongoosePaginate);

CategoriesSchema.virtual("parentCategory", {
  ref: "Category",
  localField: "parent",
  foreignField: "_id",
  justOne: true,
});

CategoriesSchema.virtual("childCategories", {
  ref: "Category",
  localField: "_id",
  foreignField: "parent",
});

const Category: Model<ICategory> = mongoose.model<ICategory>(
  "Category",
  CategoriesSchema
);

export default Category;