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
    teams?.forEach(({ homeTeamGoals, awayTeamGoals }) => {
      if (homeTeamGoals > awayTeamGoals) {
        totalPoints += 3;
      }
      if (homeTeamGoals === awayTeamGoals) {
        totalPoints += 1;
      }
    });
    return totalPoints;
  };

  public totalVictories = (teams: IMatch[]) => {
    let totalPoints = 0;
    teams?.forEach(({ homeTeamGoals, awayTeamGoals }) => {
      if (homeTeamGoals > awayTeamGoals) {
        totalPoints += 1;
      }
    });
    return totalPoints;
  };

  public totalDraws = (teams: IMatch[]) => {
    let totalDraws = 0;
    teams?.forEach(({ homeTeamGoals, awayTeamGoals }) => {
      if (homeTeamGoals === awayTeamGoals) {
        totalDraws += 1;
      }
    });
    return totalDraws;
  };

  public async leaderBoardtable() {
    const service = await this._leaderService.getAllMatches();
    const teste = service.map(({ homeMatches, teamName }) => ({
      name: teamName,
      totalPoints: this.totalPoints(homeMatches),
      totalGames: homeMatches.length,
      totalVictories: this.totalVictories(homeMatches),
      totalDraws: this.totalDraws(homeMatches),
    }));

    return teste;
  }

  public async tableTest(req: Request, res: Response) {
    // const result = await this._leaderService.getAllMatches();
    const result = await this.leaderBoardtable();
    return res.status(200).json(result);
  }
}
