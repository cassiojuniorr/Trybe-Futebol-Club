import { Router } from 'express';
import TeamsController from '../controller/TeamsController';

const teamsRouter = Router();

teamsRouter.get('/', (req, res) => TeamsController.getAll(req, res));
teamsRouter.get('/:id', (req, res) => TeamsController.findById(req, res));

export default teamsRouter;
