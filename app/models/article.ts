import mongoose, { Schema, Document, Model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

export interface IArticle {
  user?: Schema.Types.ObjectId | undefined;
  title: string;
  slug: string;
  body: string;
  image: object;
  tags: Schema.Types.ObjectId[] | null;
  viewCount: number;
  commentCount: number;
  category: Schema.Types.ObjectId | null;
  // path(): string | undefined;
  // inc(field: string, num?: number): Promise<void> | undefined;
}

const ArticleSchema: Schema<IArticle> = new Schema<IArticle>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    slug: { type: String, default: '' },
    body: { type: String, required: true },
    image: { type: Object, nullable:true, required: false },
    tags: { type: [Schema.Types.ObjectId], ref: 'Tag', default: null },
    viewCount: { type: Number, default: 0 },
    commentCount: { type: Number, default: 0 },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
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




ArticleSchema.methods.inc = async function (field: string, num = 1): Promise<void> {
  this[field] += num;
  await this.save();
};

const Article: Model<IArticle> = mongoose.model<IArticle>('Article', ArticleSchema);
export default Article;