import { Request, Response } from 'express';
import jwtUtil = require('../utils/jwt.util');
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  static async getAll(req: Request, res: Response) {
    const { inProgress } = req.query;
    const allMatches = await MatchesService.getAll(inProgress as string);

    res.status(200).json(allMatches);
  }

  static async insert(req: Request, res: Response) {
    const { authorization } = req.headers;

    jwtUtil.validateToken(authorization as string);
    const newMatch = await MatchesService.insert(req.body);

    res.status(201).json(newMatch);
  }

  static async finish(req: Request, res: Response) {
    const { id } = req.query;

    const message = await MatchesService.finish(id as string);

    res.status(200).json({ message });
  }
}
