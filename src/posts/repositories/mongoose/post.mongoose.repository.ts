import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IPost } from "src/posts/schemas/models/post.interface";
import { Post } from "src/posts/schemas/post.schema";

export class PostMongooseRepository {
  constructor(
    @InjectModel(Post.name)
    private readonly postModel: Model<Post>,
  ) {}

  async getAllPosts(limit: number, page: number): Promise<IPost[]> {
    /*
    const offset = (page - 1) * limit;
    return this.postModel.find().skip(offset).limit(limit).exec();
    */
    const posts = await this.postModel
      .find()
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();
    return posts;
  }
  async getPostById(id: string): Promise<IPost | null> {
    return this.postModel.findById(id).exec();
  }

  async createPost(post: IPost): Promise<void> {
    const newPost = new this.postModel(post);
    await newPost.save();
  }
  async updatePost(id: string, post: Partial<IPost>): Promise<void> {
    await this.postModel.updateOne({ _id: id }, { $set: post }).exec();
  }

  async deletePost(id: string): Promise<void> {
    await this.postModel.deleteOne({ _id: id }).exec();
  }
}