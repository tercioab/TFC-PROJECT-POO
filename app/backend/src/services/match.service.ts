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

  public async allMatches(): Promise<matchModel[]> {
    return this._matchModel.findAll({
      include: [
        { model: this._teamModel, as: 'homeTeam', attributes: ['teamName'] },
        { model: this._teamModel, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
  }

  public async InProgressMatches(inProgressOrNot: boolean): Promise<matchModel[]> {
    return this._matchModel.findAll({
      where: { inProgress: inProgressOrNot },
      include: [
        { model: this._teamModel, as: 'homeTeam', attributes: ['teamName'] },
        { model: this._teamModel, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
  }

  public async createMatch(body: IMatch): Promise<IResponseMatch> {
    const checkTeamsResponseError = await this._teamService.checkTeamsForMatches(body);
    const match = await this._matchModel.create({
      ...body,
      inProgress: true,
    });

    return checkTeamsResponseError !== false ? checkTeamsResponseError : { status: 201, match };
  }

  public async finalityMatch(id: string): Promise<IResponseMatch> {
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

  public async updateMatch(body: IMatch, id: string) {
    const { homeTeamGoals, awayTeamGoals } = body;
    return this._matchModel.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },

    );
  }
}
