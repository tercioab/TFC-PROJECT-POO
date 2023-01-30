import { Request, Response } from 'express';
// import Team from '../database/models/Team.model';
// import IMatch from '../interface/IMatch';
import LeaderboardService from '../services/leaderBoard.service';

export default class LeaderBoardController {
//   private _matches: IMatch[];
  private _leaderService;

  constructor() {
    this._leaderService = new LeaderboardService();
  }

  //   public async calculatePoints() {
  //     const leaderService = await this._leaderService.getAllMatches();
  //     let totalPoints = 0;
  //     leaderService.forEach((match) => {
  //       if (match.homeTeamGoals > match.awayTeamGoals) {
  //         totalPoints += 3;
  //       }
  //       if (match.homeTeamGoals === match.awayTeamGoals) {
  //         totalPoints += 1;
  //       }
  //     });
  //     return totalPoints;
  //   }

//   public async tableTest(req: Request, res: Response) {
//     const result = await this._leaderService.getAllMatches();
//     return res.status(200).json(result);
//   }
}
