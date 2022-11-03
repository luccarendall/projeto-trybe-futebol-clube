import { Router } from 'express';
import LoginController from '../controllers/loginController';
import LoginValidation from '../middlewares/ValidateLogin';

const loginRoute = Router();

const loginController = new LoginController();
const loginValidation = new LoginValidation();

loginRoute.post('/', loginValidation.validate, loginController.login);
loginRoute.get('/validate', loginController.loginToken);

export default loginRoute;
