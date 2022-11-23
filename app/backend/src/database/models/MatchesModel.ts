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

MatchesModel.belongsTo(TeamsModel, { foreignKey: 'home_team' as 'teamHome' });
MatchesModel.belongsTo(TeamsModel, { foreignKey: 'away_team' as 'teamAway' });

TeamsModel.hasMany(MatchesModel, { foreignKey: 'home_team', as: 'teamHome' });
TeamsModel.hasMany(MatchesModel, { foreignKey: 'away_team', as: 'teamAway' });
