import MatchModel from '../database/models/MatchesModel';
import TeamModel from '../database/models/TeamsModel';
import MatchesInterface from '../interfaces/MatchesInterface';
import CustomError from '../CustomError/CustomError';

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

  public featNewMatch = async (
    matchParams: Omit<MatchModel, 'id' | 'inProgress'>,
  ): Promise<MatchModel> => {
    const newMatch = await this.model.create(
      { ...matchParams, inProgress: true },
    );

    return newMatch;
  };

  public finishedMatch = async (id: string): Promise<void> => {
    const findedMatchById = await MatchModel.findByPk(id);

    if (!findedMatchById) {
      throw new CustomError(404, 'There is no team with such id!');
    }

    await findedMatchById.update(
      { inProgress: false },
    );
  };

  public updateMatch = async (
    id: string,
    homeTeamGoals: number,
    awayTeamGoals: number,

  ) : Promise<MatchesInterface> => {
    const match = await MatchModel.findByPk(id);

    if (!match || match === undefined) {
      throw new CustomError(404, 'There is no team with such id!');
    }

    const updatedMatch = await match.update({
      homeTeamGoals,
      awayTeamGoals,
    });

    return updatedMatch as unknown as MatchesInterface;
  };
}

export default MatchesService;
