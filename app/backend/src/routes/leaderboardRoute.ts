import { Router } from 'express';
import LeaderboardService from '../services/leaderboardService';
import LeaderboardController from '../controllers/leaderboardController';

const leaderboardRoute = Router();

const leaderboardService = new LeaderboardService();
const leaderboardController = new LeaderboardController(leaderboardService);

leaderboardRoute.get('/home', leaderboardController.getLeaderboard);

export default leaderboardRoute;
