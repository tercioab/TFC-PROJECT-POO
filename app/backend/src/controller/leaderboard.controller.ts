import { Request, Response } from 'express';

import IMatch from '../interface/IMatch';
import LeaderboardService from '../services/leaderBoard.service';

export default class LeaderBoardController {
  private _leaderService;

  constructor() {
    this._leaderService = new LeaderboardService();
  }

  private totalPoints = (teams: IMatch[]) => {
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

  private totalVictories = (teams: IMatch[]) => {
    let totalVictories = 0;
    teams?.forEach(({ homeTeamGoals, awayTeamGoals }) => {
      if (homeTeamGoals > awayTeamGoals) {
        totalVictories += 1;
      }
    });
    return totalVictories;
  };

  private totalLosses = (teams: IMatch[]) => {
    let totalLosses = 0;
    teams?.forEach(({ homeTeamGoals, awayTeamGoals }) => {
      if (homeTeamGoals < awayTeamGoals) {
        totalLosses += 1;
      }
    });
    return totalLosses;
  };

  private totalDraws = (teams: IMatch[]) => {
    let totalDraws = 0;
    teams?.forEach(({ homeTeamGoals, awayTeamGoals }) => {
      if (homeTeamGoals === awayTeamGoals) {
        totalDraws += 1;
      }
    });
    return totalDraws;
  };

  private goalsFavor = (teams: IMatch[]) => teams?.reduce((a, b) => a + b.homeTeamGoals, 0);

  private goalsOwn = (teams: IMatch[]) => teams?.reduce((a, b) => a + b.awayTeamGoals, 0);

  private async leaderBoardtable() {
    const service = await this._leaderService.getAllMatches();
    const teste = service.map(({ homeMatches, teamName }) => ({
      name: teamName,
      totalPoints: this.totalPoints(homeMatches),
      totalGames: homeMatches.length,
      totalVictories: this.totalVictories(homeMatches),
      totalDraws: this.totalDraws(homeMatches),
      totalLosses: this.totalLosses(homeMatches),
      goalsFavor: this.goalsFavor(homeMatches),
      goalsOwn: this.goalsOwn(homeMatches),
      goalsBalance: this.goalsFavor(homeMatches) - this.goalsOwn(homeMatches),
      efficiency: (Number([(this.totalPoints(homeMatches)) / (homeMatches.length * 3)]) * 100)
        .toFixed(2),

    }));

    return teste;
  }

  public async leaderBoard(req: Request, res: Response) {
    const result = await this.leaderBoardtable();
    return res.status(200).json(result);
  }
}
