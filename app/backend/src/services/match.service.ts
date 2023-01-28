import matchModel from '../database/models/Match.model';
import teamModel from '../database/models/Team.model';

export default class MatchService {
  private _matchModel;

  constructor() {
    this._matchModel = matchModel;
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
}
