import ITeam from '../interfaces/teamsInterface';
import TeamsModel from '../database/models/TeamsModel';
import HttpException from '../interfaces/HttpException';

export default class TeamsService {
  static async getAll(): Promise<ITeam[]> {
    const teams = await TeamsModel.findAll();

    return teams;
  }

  static async findById(teamId: string): Promise<ITeam> {
    const team = await TeamsModel.findByPk(teamId);

    if (!team) {
      throw new HttpException(404, 'Team not Found');
    }

    return team;
  }
}
