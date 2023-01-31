import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderBoard.service';
import ITable from '../interface/ITable';

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

  public sumMatches = (a: ITable, b: ITable | undefined) => {
    if (!b) {
      return a;
    }

    return {

      name: a.name,
      totalPoints: a.totalPoints + b.totalPoints,
      totalGames: a.totalGames + b.totalGames,
      totalVictories: a.totalVictories + b.totalVictories,
      totalDraws: a.totalDraws + b.totalDraws,
      totalLosses: a.totalLosses + b.totalLosses,
      goalsFavor: a.goalsFavor + b.goalsFavor,
      goalsOwn: a.goalsOwn + b.goalsOwn,
      goalsBalance: a.goalsBalance + b.goalsBalance,
      efficiency: (Number([(a.totalPoints + b.totalPoints)
        / ((a.totalGames + b.totalGames) * 3)]) * 100).toFixed(2),

    };
  };

  public async teste(req: Request, res: Response) {
    const homeMatches = await this._leaderService.getAllHomeMatches();
    const awayMatches = await this._leaderService.getAllAwayMatches();
    const sumMatches = homeMatches.map((homeMatch) => this
      .sumMatches(homeMatch, awayMatches.find((m) => m.name === homeMatch.name)))
      .sort((a, b) => b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
        || b.goalsOwn - a.goalsOwn);

    return res.status(200).json(sumMatches);
  }
}
