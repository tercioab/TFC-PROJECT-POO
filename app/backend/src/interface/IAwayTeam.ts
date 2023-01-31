import IMatch from './IMatch';
import ITeam from './ITeam';

export default interface IAwayTeam extends ITeam {
  awayMatches: IMatch[]
}
