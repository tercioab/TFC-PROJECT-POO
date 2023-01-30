import IHomeTeam from '../interface/IHomeTeam';
import matchModel from '../database/models/Match.model';
import teamModel from '../database/models/Team.model';

export default class LeaderboardService {
  public _teamModel = teamModel;
  public _matchModel = matchModel;
  ;

  constructor() {
    this._matchModel = matchModel;
    this._teamModel = teamModel;
  }

  public async getAllMatches() {
    const matches = await this._teamModel.findAll({
      include: [
        {
          model: this._matchModel,
          as: 'homeMatches',
          attributes: { exclude: ['id', 'inProgress'] },
          where: { inProgress: false },
        },
      ],
    }) as unknown as IHomeTeam[];
    return matches;
  }
}
