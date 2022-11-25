import { IMatches } from '../interfaces/matchesInterface';
import { ILeaderBord, IGameBord } from '../interfaces/leaderBoardInterface';
import MatchesService from './MatchesService';

export default class LeaderBoardService {
  static async home(): Promise<ILeaderBord[]> {
    const matches = await MatchesService.getAll('false');
    const leaderBoard = this.homeLeaderBoard(matches);
    const orderBoard = this.oderLeaderBoard(leaderBoard);
    return orderBoard;
  }

  static homeLeaderBoard(matches: IMatches[]): ILeaderBord[] {
    const table: ILeaderBord[] = [];
    matches.forEach(({ homeTeamGoals, awayTeamGoals, teamHome }) => {
      const teamI = table.findIndex((tb) => tb.name === teamHome.teamName);
      const data = this.dataLeader(homeTeamGoals, awayTeamGoals);

      if (teamI < 0) {
        table.push({ name: teamHome.teamName, ...data });
      } else {
        table[teamI] = this.updateGame(table[teamI], data);
      }
    });

    return table;
  }

  static gameResult(homeGoals: number, awayGoaals: number) {
    const board = {
      vitorias: 0,
      pontos: 1,
      empates: 1,
      perdas: 0,
    };

    if (homeGoals > awayGoaals) {
      board.pontos = 3;
      board.vitorias = 1;
      board.empates = 0;
    }

    if (awayGoaals > homeGoals) {
      board.pontos = 0;
      board.perdas = 1;
      board.empates = 0;
    }

    return board;
  }

  static dataLeader(homeGoals: number, awayGoals: number): IGameBord {
    const data = this.gameResult(homeGoals, awayGoals);

    const result = {
      totalPoints: data.pontos,
      totalGames: 1,
      totalVictories: data.vitorias,
      totalDraws: data.empates,
      totalLosses: data.perdas,
      goalsFavor: homeGoals,
      goalsOwn: awayGoals,
      goalsBalance: homeGoals - awayGoals,
      efficiency: ((data.pontos / (1 * 3)) * 100).toFixed(2),
    };

    return result;
  }

  static updateGame(team: ILeaderBord, game: IGameBord): ILeaderBord {
    const totalGames = team.totalGames + 1;
    const totalPoints = team.totalPoints + game.totalPoints;
    const result = {
      name: team.name,
      totalPoints,
      totalGames,
      totalVictories: team.totalVictories + game.totalVictories,
      totalDraws: team.totalDraws + game.totalDraws,
      totalLosses: team.totalLosses + game.totalLosses,
      goalsFavor: team.goalsFavor + game.goalsFavor,
      goalsOwn: team.goalsOwn + game.goalsOwn,
      goalsBalance: team.goalsBalance + game.goalsBalance,
      efficiency: ((totalPoints / (totalGames * 3)) * 100).toFixed(2),
    };

    return result;
  }

  static oderLeaderBoard(board: ILeaderBord[]): ILeaderBord[] {
    const newBoard:ILeaderBord[] = board;
    newBoard.sort((a, b) => (
      b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || a.goalsOwn - b.goalsOwn
    ));
    return newBoard;
  }
}
