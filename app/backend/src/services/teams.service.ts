import teamModel from '../database/models/Team.model';
import IMatch from '../interface/IMatch';

export default class TeamService {
  private _teamModel;

  constructor() {
    this._teamModel = teamModel;
  }

  public async all() {
    return this._teamModel.findAll();
  }

  public async byId(id: string | number) {
    const team = await this._teamModel.findOne({ where: { id } });
    return team ? { status: 200, team }
      : { status: 404, message: 'There is no team with such id!' };
  }

  public async checkTeams(body: IMatch) {
    const { homeTeamId, awayTeamId } = body;

    const awayTeam = await this._teamModel.findOne({ where: { id: awayTeamId } });
    const homeTeam = await this._teamModel.findOne({ where: { id: homeTeamId } });

    if (awayTeam?.dataValues.id === homeTeam?.dataValues.id) {
      return { status: 422, message: 'It is not possible to create a match with two equal teams' };
    }
    if (!awayTeam || !homeTeam) {
      return { status: 404, message: 'There is no team with such id!' };
    } return false;
  }
}
