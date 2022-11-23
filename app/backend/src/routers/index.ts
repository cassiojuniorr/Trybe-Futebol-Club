import { Router } from 'express';
import loginRoute from './login.router';
import matchesRouter from './matches.router';
import teamsRouter from './teams.router';

const router = Router();

router.use('/login', loginRoute);
router.use('/teams', teamsRouter);
router.use('/matches', matchesRouter);

export default router;
