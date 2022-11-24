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
    if (!authorization) {
      return res.status(400).json({ message: 'Need Token' });
    }

    const result = jwtUtil.validateToken(authorization);
    if (result.type) {
      return res.status(result.status).json({ message: result.message });
    }

    const { type, message, status } = await MatchesService.insert(req.body);
    if (type) {
      return res.status(status).json({ message });
    }

    res.status(status).json(message);
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;

    const { type, message, status } = await MatchesService.update(id, req.body);
    if (type) {
      return res.status(status).json({ message });
    }

    res.status(status).json({ message });
  }

  static async finish(req: Request, res: Response) {
    const { id } = req.params;

    const message = await MatchesService.finish(id as string);

    res.status(200).json({ message });
  }
}
