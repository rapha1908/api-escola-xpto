import mongoose, { HydratedDocument } from "mongoose";
import { IPost } from "./models/post.interface";
import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";

export type PostDocument = HydratedDocument<Post>;

@Schema()
export class Post implements IPost{
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  id?: string;
  @Prop()
  title: string;
  @Prop()
  author: string;
  @Prop()
  description: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);