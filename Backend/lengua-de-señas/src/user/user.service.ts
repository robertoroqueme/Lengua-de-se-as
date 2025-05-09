import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(data: { email: string, password: string }) {
    return new this.userModel(data).save();
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }
}
