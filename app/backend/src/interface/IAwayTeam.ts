import IMatch from './IMatch';

export default interface IAwayTeam {
  id?: number;
  teamName: string;
  awayMatches: IMatch[]
}
