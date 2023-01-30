import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderBoard.service';

export default class LeaderBoardController {
  private _leaderService;

  constructor() {
    this._leaderService = new LeaderboardService();
  }

  public async leaderBoardAway(req: Request, res: Response) {
    const result = await this._leaderService.getAllAwayMatches();
    return res.status(200).json(result);
  }

  public async leaderBoardHome(req: Request, res: Response) {
    const result = await this._leaderService.getAllHomeMatches();
    return res.status(200).json(result);
  }
}
