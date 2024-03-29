import { Request, Response } from 'express';
import TeamService from '../services/teams.service';

export default class TeamMode {
  private _teamService: TeamService;

  constructor() {
    this._teamService = new TeamService();
  }

  async allTeams(req: Request, res: Response) {
    const teams = await this._teamService.allTeams();
    return res.status(200).json(teams);
  }

  async teamsById(req: Request, res: Response) {
    const { id } = req.params;
    const { status, message, team } = await this._teamService.teamsById(id);
    if (message) {
      return res.status(status).json({ message });
    }
    return res.status(status).json(team);
  }
}
