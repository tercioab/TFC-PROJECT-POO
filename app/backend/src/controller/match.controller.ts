import { Request, Response } from 'express';
import MatchService from '../services/match.service';

export default class MatchController {
  private _matchService: MatchService;

  constructor() {
    this._matchService = new MatchService();
  }

  public async allMatches(req: Request, res: Response) {
    const matches = await this._matchService.allMatches();
    return res.status(200).json(matches);
  }
}
