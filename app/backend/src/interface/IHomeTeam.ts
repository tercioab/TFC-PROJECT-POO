import IMatch from './IMatch';
import ITeam from './ITeam';

export default interface IHomeTeam extends ITeam {
  homeMatches: IMatch[]
}
