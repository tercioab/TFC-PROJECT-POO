import ICreateMatch from '../interface/ICreateMatch';
import IMatch from '../interface/IMatch';

import matchModel from '../database/models/Match.model';
import teamModel from '../database/models/Team.model';

export default class MatchService {
  private _matchModel;
  private _teamModel;

  constructor() {
    this._matchModel = matchModel;
    this._teamModel = teamModel;
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
    const { homeTeamId, awayTeamId } = body;
    const homeTeam = await this._teamModel.findAll({ where: { id: homeTeamId } });
    const awayTeam = await this._teamModel.findAll({ where: { id: awayTeamId } });
    console.log(awayTeam);
    if (!homeTeam.length || !awayTeam.length) {
      return { status: 404, message: 'There is no team with such id!' };
    }
    const match = await this._matchModel.create({
      ...body,
      inProgress: true,
    });
    return { status: 201, match };
  }
}
