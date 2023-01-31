import IHomeTeam from '../interface/IHomeTeam';
import IMatch from '../interface/IMatch';

export default class HomeLeaderBoard {
  private totalPoints = (teams: IMatch[]) => {
    let totalPoints = 0;
    teams?.forEach(({ homeTeamGoals, awayTeamGoals }) => {
      if (homeTeamGoals > awayTeamGoals) {
        totalPoints += 3;
      }
      if (homeTeamGoals === awayTeamGoals) {
        totalPoints += 1;
      }
    });
    return totalPoints;
  };

  private totalVictories = (teams: IMatch[]) => {
    let totalVictories = 0;
    teams?.forEach(({ homeTeamGoals, awayTeamGoals }) => {
      if (homeTeamGoals > awayTeamGoals) {
        totalVictories += 1;
      }
    });
    return totalVictories;
  };

  private totalLosses = (teams: IMatch[]) => {
    let totalLosses = 0;
    teams?.forEach(({ homeTeamGoals, awayTeamGoals }) => {
      if (homeTeamGoals < awayTeamGoals) {
        totalLosses += 1;
      }
    });
    return totalLosses;
  };

  private totalDraws = (teams: IMatch[]) => {
    let totalDraws = 0;
    teams?.forEach(({ homeTeamGoals, awayTeamGoals }) => {
      if (homeTeamGoals === awayTeamGoals) {
        totalDraws += 1;
      }
    });
    return totalDraws;
  };

  private goalsFavor = (teams: IMatch[]) => teams?.reduce((a, b) => a + b.homeTeamGoals, 0);
  private goalsOwn = (teams: IMatch[]) => teams?.reduce((a, b) => a + b.awayTeamGoals, 0);

  public async leaderBoardtable(serviceLeader: IHomeTeam[]) {
    const table = serviceLeader.map(({ homeMatches, teamName }) => ({
      name: teamName,
      totalPoints: this.totalPoints(homeMatches),
      totalGames: homeMatches.length,
      totalVictories: this.totalVictories(homeMatches),
      totalDraws: this.totalDraws(homeMatches),
      totalLosses: this.totalLosses(homeMatches),
      goalsFavor: this.goalsFavor(homeMatches),
      goalsOwn: this.goalsOwn(homeMatches),
      goalsBalance: this.goalsFavor(homeMatches) - this.goalsOwn(homeMatches),
      efficiency: (Number([(this.totalPoints(homeMatches)) / (homeMatches.length * 3)]) * 100)
        .toFixed(2),

    }));

    return table;
  }
}
