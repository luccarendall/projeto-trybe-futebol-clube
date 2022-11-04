import { Router } from 'express';
import MatchesController from '../controllers/matchesController';

const matchesRoute = Router();

const matchesController = new MatchesController();

// matchesRoute.get('/', matchesController.findAllMatchesData);
matchesRoute.get('/', matchesController.findMatchByProgress);
matchesRoute.post('/', matchesController.featNewMatch);
matchesRoute.put('/:id/finish', matchesController.finishedMatch);
matchesRoute.put('/:id', matchesController.updateMatch);

export default matchesRoute;
