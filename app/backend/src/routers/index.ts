import { Router } from 'express';
import errorMiddleware from '../middlewares/errorMiddleware';
import loginRoute from './login.router';
import matchesRouter from './matches.router';
import teamsRouter from './teams.router';
import 'express-async-errors';
import leaderBoardRouter from './leaderBoard.router';

const router = Router();

router.use('/login', loginRoute);
router.use('/teams', teamsRouter);
router.use('/matches', matchesRouter);
router.use('/leaderboard', leaderBoardRouter);

router.use(errorMiddleware);

export default router;
