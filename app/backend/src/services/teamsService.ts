import TeamsModel from '../database/models/TeamsModel';
import TeamsInterface from '../interfaces/TeamsInterface';

class TeamService {
  public model = TeamsModel;

  public findAllTeamsData = async (): Promise<TeamsInterface[]> => {
    const Teams = await this.model.findAll();
    return Teams;
  };

  public findTeamsById = async (id: string): Promise<TeamsInterface> => {
    const findById = await this.model.findByPk(id);
    return findById as TeamsInterface;
  };
}

export default TeamService;
