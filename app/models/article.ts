import mongoose, { Schema, Document, Model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

export interface IArticle extends Document {
  user: Schema.Types.ObjectId;
  title: string;
  slug: string;
  body: string;
  image: object;
  tags: string | null;
  viewCount: number;
  commentCount: number;
  categories: Schema.Types.ObjectId[];
  path(): string;
  inc(field: string, num?: number): Promise<void>;
}

const ArticleSchema: Schema<IArticle> = new Schema<IArticle>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    slug: { type: String, default: '' },
    body: { type: String, required: true },
    image: { type: Object, required: true },
    tags: { type: String, default: null },
    viewCount: { type: Number, default: 0 },
    commentCount: { type: Number, default: 0 },
    categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

ArticleSchema.plugin(mongoosePaginate);

ArticleSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'article',
});

ArticleSchema.methods.path = function (): string {
  return `/article/${this.id}`;
};

ArticleSchema.methods.inc = async function (field: string, num = 1): Promise<void> {
  this[field] += num;
  await this.save();
};

const Article: Model<IArticle> = mongoose.model<IArticle>('Article', ArticleSchema);
export default Article;