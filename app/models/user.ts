import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";
//import uniqueString from "unique-string";
import mongoosePaginate from "mongoose-paginate-v2";

export interface IUser extends Document {
  admin: boolean;
  name: string;
  email?: string;
  password: string;
  rememberToken: string;
}

  //   roles: Schema.Types.ObjectId[];
  //   payCash: Schema.Types.ObjectId[];
  //   comparePassword(candidatePassword: string): Promise<boolean>;
  //   setRememberToken(res: any): void;
  //   hasRoles(roles: any[]): boolean;
  //   courses: any[];
  //   articles: any[];
  //   comments: any[];
  //   isVip(): boolean;
  //   payCashCheck(courseId: Schema.Types.ObjectId): boolean;

const userSchema: Schema<IUser> = new Schema(
  {
    admin: { type: Boolean, default: false },
    name: { type: String, required: true },
    email: { type: String },
    password: { type: String, required: true },
    rememberToken: { type: String, default: "" },
    // roles: [{ type: Schema.Types.ObjectId, ref: "Role" }],
    // payCash: [{ type: Schema.Types.ObjectId, ref: "Course" }],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

userSchema.pre<IUser>("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;

    return next();
  } catch (err: any) {
    return next(err);
  }
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (err: any) {
    throw new Error(err);
  }
};

userSchema.methods.setRememberToken = async function (res: any): Promise<void> {
  const uniqueStringModule = await import("unique-string");
  const token = uniqueStringModule.default();
  res.cookie("remember_token", token, {
    maxAge: 1000 * 60,
    httpOnly: true,
    signed: true,
  });
  this.updateOne({ rememberToken: token });
};

userSchema.methods.hasRoles = function (roles: any[]): boolean {
  let result = roles.filter((role: any) => {
    return this.roles.indexOf(role) > -1;
  });

  return !!result.length;
};

userSchema.virtual("courses", {
  ref: "Course",
  localField: "_id",
  foreignField: "user",
});

userSchema.virtual("articles", {
  ref: "Article",
  localField: "_id",
  foreignField: "user",
});

userSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "user",
});

userSchema.methods.isVip = function (): boolean {
  return false;
};

userSchema.methods.payCashCheck = function (
  courseId: Schema.Types.ObjectId
): boolean {
  return this.payCash.indexOf(courseId) !== -1;
};

userSchema.plugin(mongoosePaginate);

export default mongoose.model<IUser>("User", userSchema);
