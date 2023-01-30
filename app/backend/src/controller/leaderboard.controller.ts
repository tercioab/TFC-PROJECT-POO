import { Request, Response } from 'express';

import IMatch from '../interface/IMatch';
import LeaderboardService from '../services/leaderBoard.service';

export default class LeaderBoardController {
  private _leaderService;
  private _totalPoints;

  constructor() {
    this._leaderService = new LeaderboardService();
    this._totalPoints = 0;
  }

  public totalPoints = (teams: IMatch[]) => {
    let totalPoints = 0;
    teams?.forEach((match) => {
      if (match.homeTeamGoals > match.awayTeamGoals) {
        totalPoints += 3;
      }
      if (match.homeTeamGoals === match.awayTeamGoals) {
        totalPoints += 1;
      }
    });
    return totalPoints;
  };

  public async leaderBoardtable() {
    const service = await this._leaderService.getAllMatches();
    const teste = service.map((matches) => ({
      name: matches.teamName,
      totalPoints: this.totalPoints(matches.homeTeams),
    }));

    return teste;
  }

  public async tableTest(req: Request, res: Response) {
    const result = await this.leaderBoardtable();
    return res.status(200).json(result);
  }
}
