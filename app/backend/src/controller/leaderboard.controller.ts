import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderBoard.service';
import MatchesUtils from '../utils/matches.utils';
import AwayLeaderBoard from '../utils/awayLeaderBoard.utils';
import HomeLeaderBoard from '../utils/homeLeaderBoard.utils';

export default class LeaderBoardController {
  private _leaderService;
  private _MatchesUtils;
  private _awayBoard;
  private _homeBoard;

  constructor() {
    this._leaderService = new LeaderboardService();
    this._MatchesUtils = new MatchesUtils();
    this._awayBoard = new AwayLeaderBoard();
    this._homeBoard = new HomeLeaderBoard();
  }

  public async leaderBoardAway(req: Request, res: Response) {
    const result = await this._leaderService.getAllAwayMatches();
    const table = await this._awayBoard.leaderBoardtable(result);
    const orderMatches = this._MatchesUtils.orderMatches(table);
    return res.status(200).json(orderMatches);
  }

  public async leaderBoardHome(req: Request, res: Response) {
    const result = await this._leaderService.getAllHomeMatches();
    const table = await this._homeBoard.leaderBoardtable(result);
    const orderMatches = this._MatchesUtils.orderMatches(table);
    return res.status(200).json(orderMatches);
  }

  public async allLeaderBoards(req: Request, res: Response) {
    const homeMatches = await this._leaderService.getAllHomeMatches();
    const awayMatches = await this._leaderService.getAllAwayMatches();
    const tableAway = await this._awayBoard.leaderBoardtable(awayMatches);
    const tableHome = await this._homeBoard.leaderBoardtable(homeMatches);

    const sumMatches = tableHome.map((homeMatch) => this._MatchesUtils
      .sumMatches(homeMatch, tableAway.find((m) => m.name === homeMatch.name)));
    const orderMatches = this._MatchesUtils.orderMatches(sumMatches);
    return res.status(200).json(orderMatches);
  }
}
