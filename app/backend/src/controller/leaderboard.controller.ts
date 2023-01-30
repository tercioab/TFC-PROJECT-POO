// import { Request, Response } from 'express';
// import Team from '../database/models/Team.model';
import IMatch from '../interface/IMatch';

export default class LeaderBoardController {
  private _matches: IMatch[];

  constructor(matches:IMatch[]) {
    this._matches = matches;
  }

  public async calculatePoints() {
    let totalPoints = 0;
    this._matches.forEach((match) => {
      if (match.homeTeamGoals > match.awayTeamGoals) {
        totalPoints += 3;
      }
      if (match.homeTeamGoals === match.awayTeamGoals) {
        totalPoints += 1;
      }
    });
    return totalPoints;
  }
}
