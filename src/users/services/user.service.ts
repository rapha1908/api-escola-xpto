import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { IUser } from '../schemas/models/user.interface';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(user: IUser): Promise<User> {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  async getAllUsers(limit?: number, page?: number): Promise<User[]> {
    let query = this.userModel.find();
    
    if (limit) {
      query = query.limit(limit);
    }
    
    if (page) {
      query = query.skip((page - 1) * (limit || 10));
    }
    
    return query.exec();
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return user;
  }

  async updateUser(id: string, user: Partial<IUser>): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(id, user, { new: true }).exec();
    if (!updatedUser) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return updatedUser;
  }

  async deleteUser(id: string): Promise<User> {
    const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
    if (!deletedUser) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return deletedUser;
  }
}