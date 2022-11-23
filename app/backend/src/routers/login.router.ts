import { Router } from 'express';
import UserController from '../controller/UserController';

const loginRoute = Router();

loginRoute.get('/', (req, res) => UserController.loginVal(req, res));
loginRoute.post('/', (req, res) => UserController.login(req, res));

export default loginRoute;
