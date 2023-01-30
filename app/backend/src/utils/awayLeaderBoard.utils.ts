import IAwayTeam from '../interface/IAwayTeam';
import IMatch from '../interface/IMatch';

export default class AwayLeaderBoard {
  private totalPoints = (teams: IMatch[]) => {
    let totalPoints = 0;
    teams?.forEach(({ awayTeamGoals, homeTeamGoals }) => {
      if (awayTeamGoals > homeTeamGoals) {
        totalPoints += 3;
      }
      if (awayTeamGoals === homeTeamGoals) {
        totalPoints += 1;
      }
    });
    return totalPoints;
  };

  private totalVictories = (teams: IMatch[]) => {
    let totalVictories = 0;
    teams?.forEach(({ awayTeamGoals, homeTeamGoals }) => {
      if (awayTeamGoals > homeTeamGoals) {
        totalVictories += 1;
      }
    });
    return totalVictories;
  };

  private totalLosses = (teams: IMatch[]) => {
    let totalLosses = 0;
    teams?.forEach(({ awayTeamGoals, homeTeamGoals }) => {
      if (awayTeamGoals < homeTeamGoals) {
        totalLosses += 1;
      }
    });
    return totalLosses;
  };

  private totalDraws = (teams: IMatch[]) => {
    let totalDraws = 0;
    teams?.forEach(({ awayTeamGoals, homeTeamGoals }) => {
      if (awayTeamGoals === homeTeamGoals) {
        totalDraws += 1;
      }
    });
    return totalDraws;
  };

  private goalsFavor = (teams: IMatch[]) => teams?.reduce((a, b) => a + b.awayTeamGoals, 0);

  private goalsOwn = (teams: IMatch[]) => teams?.reduce((a, b) => a + b.homeTeamGoals, 0);

  public async leaderBoardtable(serviceLeader: IAwayTeam[]) {
    const table = serviceLeader.map(({ awayMatches, teamName }) => ({
      name: teamName,
      totalPoints: this.totalPoints(awayMatches),
      totalGames: awayMatches.length,
      totalVictories: this.totalVictories(awayMatches),
      totalDraws: this.totalDraws(awayMatches),
      totalLosses: this.totalLosses(awayMatches),
      goalsFavor: this.goalsFavor(awayMatches),
      goalsOwn: this.goalsOwn(awayMatches),
      goalsBalance: this.goalsFavor(awayMatches) - this.goalsOwn(awayMatches),
      efficiency: (Number([(this.totalPoints(awayMatches)) / (awayMatches.length * 3)]) * 100)
        .toFixed(2),

    })).sort((a, b) => b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor
    || b.goalsOwn - a.goalsOwn);

    return table;
  }
}
