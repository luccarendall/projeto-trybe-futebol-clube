import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboardService';
import { SUCCESS } from '../middlewares/httpProtocols';

export default class LeaderboardController {
  private service: LeaderboardService;

  constructor(service: LeaderboardService) {
    this.service = service;
  }

  public getLeaderboard = async (_req: Request, res: Response) => {
    const leaderboard = await this.service.getLeaderboard();

    res.status(SUCCESS).json(leaderboard);
  };
}
