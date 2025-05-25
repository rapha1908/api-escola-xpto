import { SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { IUser } from "./models/user.interface";
import { Prop, Schema } from "@nestjs/mongoose";


export type UserDocument = HydratedDocument<User>;

@Schema()
export class User implements IUser {
  @Prop()
  name: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
