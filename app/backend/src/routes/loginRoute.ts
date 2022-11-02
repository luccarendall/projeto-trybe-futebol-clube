import { Router } from 'express';
import LoginController from '../controllers/loginController';
// import LoginValidation from '../middlewares/ValidateLogin';

const loginRoute = Router();

const loginController = new LoginController();
// const ValidateLogin = new LoginValidation();

loginRoute.post('/', loginController.login);

export default loginRoute;
