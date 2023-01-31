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
      const allMatches = await this._matchService.all();
      return res.status(200).json(allMatches);
    }

    const matchesInProgress = await this._matchService.InProgress(inProgress === 'true');
    return res.status(200).json(matchesInProgress);
  }

  public async create(req: Request, res: Response) {
    const { match, message, status } = await this._matchService.create(req.body);
    const response = match || { message };
    return res.status(status).json(response);
  }

  public async finality(req: Request, res: Response) {
    const { id } = req.params;
    const { status, message } = await this._matchService.finality(id);
    return res.status(status).json({ message });
  }

  public async update(req: Request, res: Response) {
    const { id } = req.params;
    const result = await this._matchService.update(req.body, id);
    return res.status(200).json(result);
  }
}
