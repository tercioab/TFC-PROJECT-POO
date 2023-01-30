import IMatch from './IMatch';

export default interface IHomeTeam {
  id?: number;
  teamName: string;
  homeMatches: IMatch[]
}
