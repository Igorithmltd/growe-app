// models/Post.ts
import mongoose, { CallbackError, Document, Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Define an interface for the Post document
export interface IUser extends Document {
  email: string;
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    email: { type: String, required: true, trim: true, unique: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

UserSchema.pre<IUser>("save", async function (next) {
  try {
    if (this.isModified("password")) {
      // const user = this as IUser;

      const hashPassword = await bcrypt.hash(this.password, 10);
      this.password = hashPassword;
    }
    next();
  } catch (error: unknown) {
    const typedError = error as CallbackError;
    return next(typedError);
  }
});

UserSchema.methods.comparePassword = async function (password: string) {
  const user = this;
  return await bcrypt.compare(password, user.password);
};
UserSchema.methods.generateToken = async function (secret_token: string) {
  const token = jwt.sign(
    {
      id: this._id,
      phone_number: this.phone_number,
      userType: this.userType,
    },
    secret_token,
    { expiresIn: "48h" }
  );
  return token;
};

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
