import MatchModel from '../database/models/MatchesModel';
import TeamModel from '../database/models/TeamsModel';
import MatchesInterface from '../interfaces/MatchesInterface';

class MatchesService {
  public model = MatchModel;

  public findAllMatchesData = async (): Promise<MatchModel[]> => {
    const matchesData = await MatchModel.findAll({
      include: [
        {
          model: TeamModel,
          as: 'teamHome',
          attributes: ['teamName'],
        },
        {
          model: TeamModel,
          as: 'teamAway',
          attributes: ['teamName'],
        },
      ],
    });

    return matchesData;
  };

  public async findMatchByProgress(inProgress: boolean): Promise<MatchesInterface[]> {
    const data = await this.model.findAll({
      where: { inProgress },
      include: [{
        model: TeamModel,
        as: 'teamHome',
        attributes: ['teamName'],
      },
      {
        model: TeamModel,
        as: 'teamAway',
        attributes: ['teamName'],
      }],
    });

    return data as unknown as MatchesInterface[];
  }
}

export default MatchesService;
