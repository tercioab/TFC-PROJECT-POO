import teamModel from '../database/models/Team.model';
import IMatch from '../interface/IMatch';

export default class TeamService {
  private _teamModel;

  constructor() {
    this._teamModel = teamModel;
  }

  public async allTeams() {
    return this._teamModel.findAll();
  }

  public async teamsById(id: string | number) {
    const team = await this._teamModel.findOne({ where: { id } });
    return team;
  }

  public async checkTeams(body: IMatch) {
    const { homeTeamId, awayTeamId } = body;

    const homeTeam = await this.teamsById(homeTeamId);
    const awayTeam = await this.teamsById(awayTeamId);

    if (awayTeam?.dataValues.id === homeTeam?.dataValues.id) {
      return { status: 422, message: 'It is not possible to create a match with two equal teams' };
    }

    if (!homeTeam || !awayTeam) {
      return { status: 404, message: 'There is no team with such id!' };
    } return true;
  }
}
