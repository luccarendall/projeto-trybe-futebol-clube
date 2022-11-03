import { Router } from 'express';
import TeamsController from '../controllers/teamsController';

const teamsRoute = Router();

const teamsController = new TeamsController();

teamsRoute.get('/', teamsController.findAllTeamsData);
teamsRoute.get('/:id', teamsController.findTeamsById);

export default teamsRoute;
