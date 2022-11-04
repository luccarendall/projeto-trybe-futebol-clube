import { Request, Response } from 'express';
import MatchesServices from '../services/matchesService';

class MatchesController {
  constructor(
    private matchesServices = new MatchesServices(),
  ) { console.log('xablau'); }

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
}

export default MatchesController;
