import leaderboardQueries from '../utils/leaderboardQueries';
import sequelize from '../database/models/index';

export default class LeaderboardService {
  constructor(private _model = sequelize) { }

  public getLeaderboard = async () => {
    const [getLeaderboardArray] = await this._model.query(leaderboardQueries);

    return getLeaderboardArray;
  };
}
