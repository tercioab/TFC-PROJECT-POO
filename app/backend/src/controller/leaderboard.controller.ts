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

    const makeTable = await this._awayBoard.leaderBoardtable(result);

    const orderMatchesTable = this._MatchesUtils.orderMatches(makeTable);

    return res.status(200).json(orderMatchesTable);
  }

  public async leaderBoardHome(req: Request, res: Response) {
    const result = await this._leaderService.getAllHomeMatches();

    const makeTable = await this._homeBoard.leaderBoardtable(result);

    const orderMatchesTable = this._MatchesUtils.orderMatches(makeTable);

    return res.status(200).json(orderMatchesTable);
  }

  public async allLeaderBoards(req: Request, res: Response) {
    const awayMatches = await this._leaderService.getAllAwayMatches();
    const homeMatches = await this._leaderService.getAllHomeMatches();

    const makeTableAway = await this._awayBoard.leaderBoardtable(awayMatches);
    const makeTableHome = await this._homeBoard.leaderBoardtable(homeMatches);

    const sumMatches = makeTableHome.map((homeMatchesTable) => this._MatchesUtils
      .sumMatches(homeMatchesTable, makeTableAway.find((m) => m.name === homeMatchesTable.name)));

    const orderMatchesTable = this._MatchesUtils.orderMatches(sumMatches);

    return res.status(200).json(orderMatchesTable);
  }
}
