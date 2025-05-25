import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IUser } from "../../schemas/models/user.interface";
import { User } from "../../schemas/user.schema";

export class UserMongooseRepository {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async getAllUsers(limit: number, page: number): Promise<IUser[]> {
    return this.userModel
      .find()
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();
  }

  async getUserById(id: string): Promise<IUser | null> {
    return this.userModel.findById(id).exec();
  }

  async createUser(user: IUser): Promise<IUser> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  async updateUser(id: string, user: Partial<IUser>): Promise<void> {
    await this.userModel.updateOne({ _id: id }, { $set: user }).exec();
  }

  async deleteUser(id: string): Promise<void> {
    await this.userModel.deleteOne({ _id: id }).exec();
  }
}