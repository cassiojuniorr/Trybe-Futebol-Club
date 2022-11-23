import ITeam from '../interfaces/teamsInterface';
import TeamsModel from '../database/models/TeamsModel';
// import HttpException from '../interfaces/HttpException';
import IReturn from '../interfaces/returnInterface';

export default class TeamsService {
  static async getAll(): Promise<ITeam[]> {
    const teams = await TeamsModel.findAll();

    return teams;
  }

  static async findById(teamId: string): Promise<IReturn> {
    const team = await TeamsModel.findByPk(teamId);

    if (!team) {
      // throw new HttpException(404, 'Team not Found');
      return { type: 'fields', message: 'Team not Found', status: 404 };
    }

    return { type: null, message: team, status: 200 };
  }
}
