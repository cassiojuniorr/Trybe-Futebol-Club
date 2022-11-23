import { STRING, INTEGER, Model } from 'sequelize';
import db from '.';

export default class UserModel extends Model {
  declare id: number;
  declare username: string;
  declare email: string;
  declare password: string;
}

UserModel.init({
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: INTEGER,
  },
  username: {
    allowNull: false,
    type: STRING,
  },
  role: {
    allowNull: false,
    type: STRING,
  },
  email: {
    allowNull: false,
    type: STRING,
  },
  password: {
    allowNull: false,
    type: STRING,
  },
}, {
  sequelize: db,
  timestamps: false,
  modelName: 'UserModel',
  tableName: 'users',
});
