import HttpException from '../interfaces/HttpException';
import TeamsModel from '../database/models/TeamsModel';
import MatchesModel from '../database/models/MatchesModel';
import { IMatches, INewMatch } from '../interfaces/matchesInterface';

export default class MatchesService {
  static async getAll(query: string): Promise<IMatches[]> {
    const matches = await MatchesModel.findAll({
      include: [
        { model: TeamsModel, as: 'teamHome', attributes: ['teamName'] },
        { model: TeamsModel, as: 'teamAway', attributes: ['teamName'] },
      ],
    });

    if (query === 'false') {
      const result = matches.filter((elm) => !elm.inProgress);

      return result as unknown as IMatches[];
    }

    if (query === 'true') {
      const result = matches.filter((elm) => elm.inProgress);

      return result as unknown as IMatches[];
    }

    return matches as unknown as IMatches[];
  }

  static async insert(newMatch: INewMatch): Promise<INewMatch> {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = newMatch;
    const team = await TeamsModel.findOne({ where: { id: homeTeam } });
    const away = await TeamsModel.findOne({ where: { id: awayTeam } });

    if (!team || !away) {
      throw new HttpException(404, 'There is no team with such id!');
    }

    if (homeTeam === awayTeam) {
      throw new HttpException(422, 'It is not possible to create a match with two equal teams');
    }

    const match = MatchesModel.create({
      homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, inProgress: true,
    });

    return match as unknown as INewMatch;
  }

  static async finish(id: string): Promise<string> {
    const match = await MatchesModel.findByPk(id) as unknown as IMatches;
    match.inProgress = false;

    return 'Finished';
  }
}
