import IHomeTeam from '../interface/IHomeTeam';
import IAwayTeam from '../interface/IAwayTeam';
import matchModel from '../database/models/Match.model';
import teamModel from '../database/models/Team.model';
import AwayLeaderBoard from '../utils/awayLeaderBoard.utils';
import HomeLeaderBoard from '../utils/homeLeaderBoard.utils';

export default class LeaderboardService {
  private _teamModel = teamModel;
  private _matchModel = matchModel;
  private _awayBoard;
  private _homeBoard;

  constructor() {
    this._matchModel = matchModel;
    this._teamModel = teamModel;
    this._awayBoard = new AwayLeaderBoard();
    this._homeBoard = new HomeLeaderBoard();
  }

  public async getAllHomeMatches() {
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
    const homeBoard = await this._homeBoard.leaderBoardtable(matches);
    return homeBoard;
  }

  public async getAllAwayMatches() {
    const matches = await this._teamModel.findAll({
      include: [
        {
          model: this._matchModel,
          as: 'awayMatches',
          attributes: { exclude: ['id', 'inProgress'] },
          where: { inProgress: false },
        },
      ],
    }) as unknown as IAwayTeam[];
    const awayBoard = await this._awayBoard.leaderBoardtable(matches);
    return awayBoard;
  }
}
