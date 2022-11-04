import { Request, Response } from 'express';
import MatchesServices from '../services/matchesService';
import TeamsService from '../services/teamsService';
import { SUCCESS, CREATED, NOT_FOUND } from '../middlewares/httpProtocols';

class MatchesController {
  constructor(
    private matchesServices = new MatchesServices(),
    private teamService = new TeamsService(),
  ) {}

  public findAllMatchesData = async (_req: Request, res: Response) => {
    const matchesData = await this.matchesServices.findAllMatchesData();

    return res.status(SUCCESS).json(matchesData);
  };

  public findMatchByProgress = async (req: Request, res: Response): Promise<Response> => {
    const { inProgress } = req.query;

    if (!inProgress || (inProgress !== 'false' && inProgress !== 'true')) {
      return this.findAllMatchesData(req, res);
    }

    const inProgressMatches = inProgress !== 'false';
    const inProgressMatchesFinded = await this
      .matchesServices.findMatchByProgress(inProgressMatches);

    return res.status(SUCCESS).json(inProgressMatchesFinded);
  };

  public featNewMatch = async (req: Request, res: Response) => {
    const match = req.body;

    const validHomeTeam = await this.teamService.findTeamsById(match.homeTeam);
    const validAwayTeam = await this.teamService.findTeamsById(match.awayTeam);

    if (!validHomeTeam || !validAwayTeam) {
      return res.status(NOT_FOUND).json({ message: 'There is no team with such id!' });
    }

    const newMatch = await this.matchesServices.featNewMatch(match);
    return res.status(CREATED).json(newMatch);
  };

  public finishedMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.matchesServices.finishedMatch(id);

    return res.status(SUCCESS).json({ message: 'Finished' });
  };

  public updateMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    const matchToBeUpdated = await this.matchesServices
      .updateMatch(id, homeTeamGoals, awayTeamGoals);

    return res.status(SUCCESS).json(matchToBeUpdated);
  };
}
export default MatchesController;
