import { Router } from 'express';
import MatchesController from '../controllers/matchesController';
import validateMatch from '../middlewares/ValidateMatch';

const matchesRoute = Router();

const matchesController = new MatchesController();

// matchesRoute.get('/', matchesController.findAllMatchesData);
matchesRoute.get('/', matchesController.findMatchByProgress);
matchesRoute.post('/', validateMatch, matchesController.featNewMatch);
matchesRoute.put('/:id/finish', matchesController.finishedMatch);
matchesRoute.put('/:id', matchesController.updateMatch);

export default matchesRoute;
