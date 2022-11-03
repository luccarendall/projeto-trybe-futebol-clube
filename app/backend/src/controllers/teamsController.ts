import { Request, Response } from 'express';
import TeamService from '../services/teamsService';

class teamsController {
  constructor(private teamService = new TeamService()) { }

  public findAllTeamsData = async (_req: Request, res: Response) => {
    const teamsData = await this.teamService.findAllTeamsData();
    res.status(200).json(teamsData);
  };

  public findTeamsById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const team = await this.teamService.findTeamsById(id);
    res.status(200).json(team);
  };
}

export default teamsController;
