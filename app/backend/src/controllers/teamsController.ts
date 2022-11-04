import { Request, Response } from 'express';
import TeamService from '../services/teamsService';
import { SUCCESS } from '../middlewares/httpProtocols';

class teamsController {
  constructor(private teamService = new TeamService()) { }

  public findAllTeamsData = async (_req: Request, res: Response) => {
    const teamsData = await this.teamService.findAllTeamsData();
    res.status(SUCCESS).json(teamsData);
  };

  public findTeamsById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const team = await this.teamService.findTeamsById(id);
    res.status(SUCCESS).json(team);
  };
}

export default teamsController;
