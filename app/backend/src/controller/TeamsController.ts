import { Request, Response } from 'express';
import TeamsService from '../services/TeamsService';

export default class TeamsController {
  static async getAll(req: Request, res: Response) {
    const allTeams = await TeamsService.getAll();

    res.status(200).json(allTeams);
  }

  static async findById(req: Request, res: Response) {
    const { id } = req.params;
    const team = await TeamsService.findById(id);

    res.status(200).json(team);
  }
}
