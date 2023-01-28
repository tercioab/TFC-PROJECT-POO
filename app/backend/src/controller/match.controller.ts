import { Request, Response } from 'express';
import MatchService from '../services/match.service';

export default class MatchController {
  private _matchService: MatchService;

  constructor() {
    this._matchService = new MatchService();
  }

  public async allMatches(req: Request, res: Response) {
    const { inProgress } = req.query;

    if (inProgress === undefined) {
      const allMatches = await this._matchService.allMatches();
      return res.status(200).json(allMatches);
    }

    const matchesInProgress = await this._matchService.progressMatch(inProgress === 'true');
    return res.status(200).json(matchesInProgress);
  }

  // public async progressMatch(req: Request, res: Response) {
  //   const { inProgress } = req.query;

  //   if (inProgress === undefined) {
  //     const allMatches = await this._matchService.allMatches();
  //     return res.status(200).json(allMatches);
  //   }

  //   const matchesInProgress = await this._matchService.progressMatch(inProgress === 'true');
  //   return res.status(200).json(matchesInProgress);
  // }
}
