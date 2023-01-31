import IResponseMatch from '../types/IResponseMatch';
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

  public async all(): Promise<matchModel[]> {
    const matches = await this._matchModel.findAll({
      include: [
        { model: this._teamModel, as: 'homeTeam', attributes: ['teamName'] },
        { model: this._teamModel, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return matches;
  }

  public async InProgress(inProgressOrNot: boolean): Promise<matchModel[]> {
    const matches = await this._matchModel.findAll({
      where: { inProgress: inProgressOrNot },
      include: [
        { model: this._teamModel, as: 'homeTeam', attributes: ['teamName'] },
        { model: this._teamModel, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return matches;
  }

  public async create(body: IMatch): Promise<IResponseMatch> {
    const checkTeamsResponseError = await this._teamService.checkTeamsForMatches(body);
    const match = await this._matchModel.create({
      ...body,
      inProgress: true,
    });

    return checkTeamsResponseError !== false ? checkTeamsResponseError : { status: 201, match };
  }

  public async finality(id: string): Promise<IResponseMatch> {
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

  public async update(body: IMatch, id: string) {
    const { homeTeamGoals, awayTeamGoals } = body;
    const result = await this._matchModel.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },

    );
    return result;
  }
}
