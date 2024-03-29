import { Request, Response } from 'express';
import MatchService from '../services/match.service';

export default class MatchController {
  private _matchService: MatchService;

  constructor() {
    this._matchService = new MatchService();
  }

  public async getMatchesInProgressOrAll(req: Request, res: Response) {
    const { inProgress } = req.query;

    if (inProgress === undefined) {
      const allMatches = await this._matchService.allMatches();
      return res.status(200).json(allMatches);
    }

    const matchesInProgress = await this._matchService.InProgressMatches(inProgress === 'true');
    return res.status(200).json(matchesInProgress);
  }

  public async createMatch(req: Request, res: Response) {
    const { match, message, status } = await this._matchService.createMatch(req.body);
    const response = match || { message };
    return res.status(status).json(response);
  }

  public async finalityMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { status, message } = await this._matchService.finalityMatch(id);
    return res.status(status).json({ message });
  }

  public async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const result = await this._matchService.updateMatch(req.body, id);
    return res.status(200).json(result);
  }
}
