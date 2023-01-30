import IMatch from './IMatch';

export default interface IHomeTeam {
  id?: number;
  teamName: string;
  homeTeams: IMatch[]
}
