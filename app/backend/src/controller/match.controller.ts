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

  public async progressMatch(req: Request, res: Response) {
    const { inProgress } = req.query;

    const progressUndenined = inProgress === undefined;
    if (!progressUndenined) {
      const allMatches = await this._matchService.allMatches();
      res.status(200).json(allMatches);
    }

    const progressOrNot = inProgress === 'true';
    const matchesInProgress = await this._matchService.progressMatch(progressOrNot);
    return res.status(200).json(matchesInProgress);
  }
}
