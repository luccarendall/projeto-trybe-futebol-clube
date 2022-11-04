import { Request, Response } from 'express';
import MatchesServices from '../services/matchesService';

class MatchesController {
  constructor(
    private matchesServices = new MatchesServices(),
  ) { }

  public findAllMatchesData = async (_req: Request, res: Response) => {
    const matchesData = await this.matchesServices.findAllMatchesData();

    return res.status(200).json(matchesData);
  };

  public findMatchByProgress = async (req: Request, res: Response): Promise<Response> => {
    const { inProgress } = req.query;

    if (!inProgress || (inProgress !== 'false' && inProgress !== 'true')) {
      return this.findAllMatchesData(req, res);
    }

    const inProgressMatches = inProgress !== 'false';
    const inProgressMatchesFinded = await this
      .matchesServices.findMatchByProgress(inProgressMatches);

    return res.status(200).json(inProgressMatchesFinded);
  };

  public featNewMatch = async (req: Request, res: Response) => {
    const match = req.body;

    const newMatch = await this.matchesServices.featNewMatch(match);

    return res.status(201).json(newMatch);
  };

  public finishedMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.matchesServices.finishedMatch(id);

    return res.status(200).json({ message: 'Finished' });
  };

  public updateMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    const matchToBeUpdated = await this.matchesServices
      .updateMatch(id, homeTeamGoals, awayTeamGoals);

    return res.status(200).json(matchToBeUpdated);
  };
}
export default MatchesController;
