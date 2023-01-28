import ICreateMatch from '../interface/ICreateMatch';
import IMatch from '../interface/IMatch';

import matchModel from '../database/models/Match.model';
import teamModel from '../database/models/Team.model';

import TeamService from './teams.service';

export default class MatchService {
  private _matchModel;
  private _teamModel;
  private _teamService;

  constructor() {
    this._matchModel = matchModel;
    this._teamModel = teamModel;
    this._teamService = new TeamService();
  }

  public async allMatches() {
    const matches = await this._matchModel.findAll({
      include: [
        { model: teamModel, as: 'homeTeam', attributes: ['teamName'] },
        { model: teamModel, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return matches;
  }

  public async progressMatch(inProgress: boolean) {
    const matches = await this._matchModel.findAll({
      where: { inProgress },
      include: [
        { model: teamModel, as: 'homeTeam', attributes: ['teamName'] },
        { model: teamModel, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return matches;
  }

  public async createMatch(body: IMatch):Promise<ICreateMatch> {
    const checkTeamsResponse = await this._teamService.checkTeams(body);
    const match = await this._matchModel.create({
      ...body,
      inProgress: true,
    });

    if (checkTeamsResponse !== true) {
      return checkTeamsResponse;
    }

    return { status: 201, match };
  }

  public async finalityMatch(id: string) {
    const match = this._matchModel.findOne({ where: { id } });
    if (!match) {
      return { status: 401, message: 'match not found' };
    }
    await this._matchModel.update(
      { inProgress: false },
      { where: { id } },
    );
    return { status: 200, message: 'Finished' };
  }

  public async updateMatch(homeTeamGoals: number, awayTeamGoals: number, id: string) {
    const result = await this._matchModel.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },

    );
    return result;
  }
}
