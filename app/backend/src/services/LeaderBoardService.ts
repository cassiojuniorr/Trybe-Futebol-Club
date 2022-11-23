import ILeaderBord from '../interfaces/leaderBoardInterface';
import MatchesService from './MatchesService';
import TeamsService from './TeamsService';

export default class LeaderBoardService {
  static totalPoints(homeTeamGoals: number, awayTeamGoals: number): number {
    if (homeTeamGoals > awayTeamGoals) {
      return 3;
    }

    if (homeTeamGoals === awayTeamGoals) {
      return 1;
    }

    return 0;
  }

  static async home(): Promise<ILeaderBord[]> {
    const matchs = await MatchesService.getAll('false');

    const result = matchs.map((team) => {
      const tname = TeamsService.findById(team.homeTeam as unknown as string);
      const resp = {
        name: tname,
        totalPoints: LeaderBoardService.totalPoints(team.homeTeamGoals, team.awayTeamGoals),
        totalGames: '',
      };

      return resp as unknown as ILeaderBord;
    });

    return result;
  }
}
