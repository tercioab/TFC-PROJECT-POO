import { Request, Response } from 'express';

import IMatch from '../interface/IMatch';
import LeaderboardService from '../services/leaderBoard.service';

export default class LeaderBoardController {
  private _leaderService;

  constructor() {
    this._leaderService = new LeaderboardService();
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

  public totalVictories = (teams: IMatch[]) => {
    let totalPoints = 0;
    teams?.forEach((match) => {
      if (match.homeTeamGoals > match.awayTeamGoals) {
        totalPoints += 1;
      }
    });
    return totalPoints;
  };

  public totalDraws = (teams: IMatch[]) => {
    let totalDraws = 0;
    teams?.forEach((match) => {
      if (match.homeTeamGoals === match.awayTeamGoals) {
        totalDraws += 1;
      }
    });
    return totalDraws;
  };

  public async leaderBoardtable() {
    const service = await this._leaderService.getAllMatches();
    const teste = service.map((matches) => ({
      name: matches.teamName,
      totalPoints: this.totalPoints(matches.homeMatches),
      totalGames: matches.homeMatches.length,
      totalVictories: this.totalVictories(matches.homeMatches),
      totalDraws: this.totalDraws(matches.homeMatches),
    }));

    return teste;
  }

  public async tableTest(req: Request, res: Response) {
    // const result = await this._leaderService.getAllMatches();
    const result = await this.leaderBoardtable();
    return res.status(200).json(result);
  }
}
