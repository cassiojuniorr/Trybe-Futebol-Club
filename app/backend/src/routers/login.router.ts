import { Router } from 'express';
import UserController from '../controller/UserController';

const loginRoute = Router();
// const userController = new UserController();

loginRoute.post('/', (req, res) => UserController.login(req, res));

export default loginRoute;