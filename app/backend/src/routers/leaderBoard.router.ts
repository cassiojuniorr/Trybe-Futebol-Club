import { Router } from 'express';
import LeaderBoardController from '../controller/LeaderBoardController';

const leaderBoardRouter = Router();

leaderBoardRouter.get('/home', (req, res) => LeaderBoardController.home(req, res));
leaderBoardRouter.get('/away', (req, res) => LeaderBoardController.away(req, res));

export default leaderBoardRouter;
