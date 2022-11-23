import { BOOLEAN, INTEGER, Model } from 'sequelize';
import db from '.';
import TeamsModel from './TeamsModel';

export default class MatchesModel extends Model {
  declare id: number;
  declare homeTeam: number;
  declare homeTeamGoals: number;
  declare awayTeam: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

MatchesModel.init({
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: INTEGER,
  },
  homeTeam: {
    allowNull: false,
    type: INTEGER,
    references: {
      key: 'id',
      model: 'TeamsModel',
    },
  },
  homeTeamGoals: {
    allowNull: false,
    type: INTEGER,
  },
  awayTeam: {
    allowNull: false,
    type: INTEGER,
  },
  awayTeamGoals: {
    allowNull: false,
    type: INTEGER,
    references: {
      key: 'id',
      model: 'TeamsModel',
    },
  },
  inProgress: {
    allowNull: false,
    type: BOOLEAN,
  },
}, {
  sequelize: db,
  timestamps: false,
  modelName: 'MatchesModel',
  tableName: 'matches',
  underscored: true,
});

MatchesModel.belongsTo(TeamsModel, { foreignKey: 'homeTeam', as: 'teamHome' });
MatchesModel.belongsTo(TeamsModel, { foreignKey: 'awayTeam', as: 'teamAway' });

TeamsModel.hasMany(MatchesModel, { foreignKey: 'homeTeam', as: 'teamHome' });
TeamsModel.hasMany(MatchesModel, { foreignKey: 'awayTeam', as: 'teamAway' });
