import MatchModel from '../database/models/MatchesModel';
import TeamModel from '../database/models/TeamsModel';

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
}

export default MatchesService;
