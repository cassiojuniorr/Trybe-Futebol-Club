import IReturn from '../interfaces/returnInterface';
import TeamsModel from '../database/models/TeamsModel';
import MatchesModel from '../database/models/MatchesModel';
import { IMatches, INewMatch, IUpdate } from '../interfaces/matchesInterface';

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

  static async insert(newMatch: INewMatch): Promise<IReturn> {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = newMatch;
    const team = await TeamsModel.findOne({ where: { id: homeTeam } });
    const away = await TeamsModel.findOne({ where: { id: awayTeam } });

    if (!team || !away) {
      return { type: 'Error Id', message: 'There is no team with such id!', status: 404 };
    }

    if (homeTeam === awayTeam) {
      return { type: 'Error Create',
        message: 'It is not possible to create a match with two equal teams',
        status: 422,
      };
    }

    const match = MatchesModel.create({
      homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, inProgress: true,
    }) as unknown as INewMatch;

    return { type: null, message: match, status: 201 };
  }

  static async update(id: string, update: IUpdate): Promise<IReturn> {
    const { homeTeamGoals, awayTeamGoals } = update;
    const match = await MatchesModel.findByPk(id) as unknown as IMatches;

    if (!match) {
      // throw new HttpException(404, 'There is no team with such id!');
      return { type: 'Error Id', message: 'There is no team with such id!', status: 404 };
    }

    await MatchesModel.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });

    return { type: null, message: 'updated', status: 200 };
  }

  static async finish(id: string): Promise<string> {
    await MatchesModel.update({ inProgress: false }, { where: { id } });

    return 'Finished';
  }
}
