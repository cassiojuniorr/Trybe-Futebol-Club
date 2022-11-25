import { Request, Response } from 'express';
import LeaderBoardService from '../services/LeaderBoardService';

export default class LeaderBoardController {
  static async home(_req: Request, res: Response) {
    const leaderBoard = await LeaderBoardService.home();

    res.status(200).json(leaderBoard);
  }
}
