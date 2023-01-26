import teamModel from '../database/models/Team.model';

export default class TeamService {
  private _teamModel;

  constructor() {
    this._teamModel = teamModel;
  }

  public async allTeams() {
    return this._teamModel.findAll();
  }

  public async teamsById(id: string) {
    const team = await this._teamModel.findOne({ where: { id } });
    return team;
  }
}
