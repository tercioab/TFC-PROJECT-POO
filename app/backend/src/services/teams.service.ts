import teamModel from '../database/models/Team.model';

export default class TeamService {
  private _teamModel;

  constructor() {
    this._teamModel = teamModel;
  }

  public async allTeams() {
    return this._teamModel.findAll();
  }
}
