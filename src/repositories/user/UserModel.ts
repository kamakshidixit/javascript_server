import * as Mongoose  from 'mongoose';
import UserSchema from './UserSchema';
import IUserModel from './IUserModel';

export const userSchema = new UserSchema({
  collection: 'user',
});

export const userModel: Mongoose.Model< IUserModel > = Mongoose.model< IUserModel >
(
  'User',
  userSchema,
  'User',
  true
);

