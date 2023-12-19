import mongoose, { Schema, Document, Model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

export interface ITag {
  name: string; 
  description: string; 
}

const TagSchema: Schema<ITag> = new Schema<ITag>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      default: null,
      nullable: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

TagSchema.plugin(mongoosePaginate);

const Tag: Model<ITag> = mongoose.model<ITag>('Tag', TagSchema);
export default Tag;