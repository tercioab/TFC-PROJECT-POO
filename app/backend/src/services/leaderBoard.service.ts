import IHomeTeam from '../interface/IHomeTeam';
import IAwayTeam from '../interface/IAwayTeam';
import matchModel from '../database/models/Match.model';
import teamModel from '../database/models/Team.model';

export default class LeaderboardService {
  private _teamModel = teamModel;
  private _matchModel = matchModel;

  constructor() {
    this._matchModel = matchModel;
    this._teamModel = teamModel;
  }

  public async getAllHomeMatches() {
    return await this._teamModel.findAll({
      include: [
        {
          model: this._matchModel,
          as: 'homeMatches',
          attributes: { exclude: ['id', 'inProgress'] },
          where: { inProgress: false },
        },
      ],
    }) as unknown as IHomeTeam[];
  }

  public async getAllAwayMatches() {
    return await this._teamModel.findAll({
      include: [
        {
          model: this._matchModel,
          as: 'awayMatches',
          attributes: { exclude: ['id', 'inProgress'] },
          where: { inProgress: false },
        },
      ],
    }) as unknown as IAwayTeam[];
  }
}
