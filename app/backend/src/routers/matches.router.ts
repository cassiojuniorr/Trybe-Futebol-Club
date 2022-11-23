import { Router } from 'express';
import MatchesController from '../controller/MatchesController';

const matchesRouter = Router();

matchesRouter.get('/', (req, res) => MatchesController.getAll(req, res));
matchesRouter.post('/', (req, res) => MatchesController.insert(req, res));
matchesRouter.patch('/', (req, res) => MatchesController.update(req, res));
matchesRouter.patch('/finish', (req, res) => MatchesController.finish(req, res));

export default matchesRouter;
