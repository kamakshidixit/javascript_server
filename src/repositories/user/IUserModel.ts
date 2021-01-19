import * as mongoose from 'mongoose';
import IVersionableDocument from '../versionable/IVersionableDocument';

export default interface IUsermodel extends IVersionableDocument {
  id: string;
  name: string;
  email: string;
  role: string;
  password: string;
}

