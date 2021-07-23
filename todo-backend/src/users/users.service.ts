import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './users.schema';
import { Model } from 'mongoose';
import { NewUser } from 'src/graphql';
import * as argon2 from "argon2";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async getAllUsers(): Promise<UserDocument[]> {
    return await this.userModel.find();
  }
  async getUserByUsername(username: string) {
    return await this.userModel.findOne({ username });
  }
  async createUser(newUser: NewUser) {
    newUser.password = await argon2.hash(newUser.password)
    
    
    return await this.userModel.create(newUser);
  }
  async findOneById(id) {
    return await this.userModel.findById(id);
  }
  async findOneByUsername(username: string) {
    return await this.userModel.findOne({ username });
  }
  async deleteOneById(id) {
    return await this.userModel.findByIdAndDelete(id);
  }
  createToken(user) {
    return jwt.sign({ _id: user.id, username: user.username }, 'cat');
  }
}
